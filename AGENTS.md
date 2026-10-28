<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Architecture rules

- AI features call the Lovable AI Gateway from server-only modules under `src/lib/ai/` (`*.server.ts` for providers/prompts, `*.functions.ts` for `createServerFn` wrappers); the key stays server-side and the model id lives in one place (`project-brief.server.ts`) so future AI features follow the same split.
