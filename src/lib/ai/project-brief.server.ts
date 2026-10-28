// Server-only module: holds the gateway provider, prompt and model call.
// Never import this file from client-reachable code.
import { createOpenAI } from "@ai-sdk/openai";
import { Output, streamText } from "ai";
import { z } from "zod";

import { createLovableAiGatewayRunIdFetch } from "./run-id.ts";

const GATEWAY_URL = "https://ai.gateway.lovable.dev/v1";
const MODEL = "openai/gpt-6-astra";

export const briefSchema = z.object({
  goals: z
    .string()
    .describe("One or two sentences on what the project sets out to achieve and why it matters."),
  technicalDecisions: z
    .array(z.string())
    .describe("2-4 short bullets on the notable technical choices, tools and approaches."),
  impact: z
    .string()
    .describe("One or two sentences on who benefits and the real-world difference it makes."),
});

export type ProjectBrief = z.infer<typeof briefSchema>;

export type ProjectInput = {
  title: string;
  status: string;
  problem: string;
  description: string;
  tech: string[];
};

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function callGateway(project: ProjectInput, apiKey: string): Promise<ProjectBrief> {
  const runIdFetch = createLovableAiGatewayRunIdFetch(undefined);
  const provider = createOpenAI({
    baseURL: GATEWAY_URL,
    apiKey,
    headers: { "Lovable-API-Key": apiKey, "X-Lovable-AIG-SDK": "vercel-ai-sdk" },
    fetch: runIdFetch.fetch,
  });

  const result = streamText({
    model: provider.responses(MODEL),
    system:
      "You write concise, credible recruiter briefs about a student's software projects. " +
      "Base everything strictly on the project information provided — never invent metrics, " +
      "users, or achievements. Write in plain, professional English.",
    messages: [
      {
        role: "user",
        content:
          `Summarize this project for a recruiter.\n\n` +
          `Title: ${project.title}\n` +
          `Status: ${project.status}\n` +
          `Problem it addresses: ${project.problem}\n` +
          `Description: ${project.description}\n` +
          `Technologies: ${project.tech.join(", ")}`,
      },
    ],
    output: Output.object({ schema: briefSchema }),
    providerOptions: {
      openai: {
        store: false,
        forceReasoning: true,
        reasoningEffort: "low",
        reasoningSummary: "auto",
        include: ["reasoning.encrypted_content"],
      },
    },
  });

  // Final-only feature: consume the stream server-side and return the object.
  return await result.output;
}

function safeMessage(error: unknown): string {
  const status =
    error != null && typeof error === "object" && "statusCode" in error
      ? Number((error as { statusCode?: unknown }).statusCode)
      : undefined;
  const raw = error instanceof Error ? error.message : "";
  if (status === 401) return "The AI service is not configured correctly. Please try again later.";
  if (status === 402) return raw || "AI credits are exhausted. Please try again later.";
  if (status === 403) return raw || "The AI service denied this request.";
  if (status === 429) return "The AI service is busy right now. Please try again in a moment.";
  if (status !== undefined && status >= 500) return "The AI service had a temporary problem. Please try again.";
  return "Could not generate the brief. Please try again.";
}

export async function summarizeProjectBrief(project: ProjectInput): Promise<ProjectBrief> {
  const apiKey = process.env["LOVABLE_API_KEY"];
  if (!apiKey) {
    throw new Error("The AI service is not configured correctly. Please try again later.");
  }

  // One bounded retry for transient 429/5xx failures, with backoff.
  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      return await callGateway(project, apiKey);
    } catch (error) {
      const status =
        error != null && typeof error === "object" && "statusCode" in error
          ? Number((error as { statusCode?: unknown }).statusCode)
          : undefined;
      const transient = status === 429 || (status !== undefined && status >= 500);
      if (attempt === 0 && transient) {
        await sleep(1500);
        continue;
      }
      console.error("Project brief generation failed:", error);
      throw new Error(safeMessage(error));
    }
  }
  throw new Error("Could not generate the brief. Please try again.");
}
