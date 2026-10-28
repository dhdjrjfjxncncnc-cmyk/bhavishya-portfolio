import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { projects } from "@/data/portfolio";

const inputSchema = z.object({
  title: z.string().trim().min(1).max(200),
});

export const getProjectBrief = createServerFn({ method: "POST" })
  .inputValidator((input: { title: string }) => inputSchema.parse(input))
  .handler(async ({ data }) => {
    // Only summarize projects that actually exist in the portfolio data —
    // the client sends a title, never free-form content.
    const project = projects.find((p) => p.title === data.title);
    if (!project) {
      throw new Error("Unknown project.");
    }
    const { summarizeProjectBrief } = await import("./project-brief.server");
    const brief = await summarizeProjectBrief({
      title: project.title,
      status: project.status,
      problem: project.problem,
      description: project.description,
      tech: project.tech,
    });
    return { title: project.title, brief };
  });
