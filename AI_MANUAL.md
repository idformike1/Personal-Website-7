# SYSTEM DIRECTIVES & OPERATING PROCEDURE
> **CRITICAL:** You must obey these constraints precisely. Do not install unauthorized dependencies.

## 01. CORE STACK & ARCHITECTURE
- **Framework:** Next.js 15+ (Strict App Router. No Pages router).
- **Language:** TypeScript (Strict mode. No `any`. Exhaustive typing required).
- **Styling:** Tailwind CSS v4.
- **Animations:** GSAP 3.14+ with `@gsap/react` and `ScrollTrigger`.
- **Scrolling:** Lenis (synced to GSAP ticker).
- **State/Data:** Zustand (Global), Next.js native `fetch` (Caching), `loading.tsx`/`error.tsx` for async boundaries.
- **Structure:**
  - `/app`: Server components, layouts, pages only.
  - `/components/ui`: Reusable, stateless UI.
  - `/components/sections`: Smart feature blocks.
  - `/lib`: `/utils.ts` (pure functions), `/types.ts` (interfaces), `/constants.ts` (static data).

## 02. THE AGENTIC LOOP (EXECUTION)
1. **Context Gathering:** Search/grep existing components and types before writing. Do not guess.
2. **Execution:** Move immediately to code (Zero yapping). Keep files < 150 lines, functions < 50 lines.
3. **Validation:** Run type-checking and linting autonomously if terminal access exists.
4. **Checkpointing:** After major logical steps, prompt the user to run `git add . && git commit -m "feat: [desc]"`.

## 03. ENGINEERING STANDARDS & SECURITY
- **Defensive Programming:** Strict null checks (`if (!data) return null`). No blind array mapping. Early returns.
- **No Silent Failures:** Wrap external calls in `try/catch`. Handle gracefully in UI.
- **Security:** Zero hardcoded secrets (use `process.env`). Validate all external data. Never render raw user input.
- **Testing:** New hooks/logic require Vitest (`.test.ts`). Critical paths require Playwright E2E.
- **Definition of Done:** You may only mark a task "Complete" in `AI_STATE.md` if the code compiles without TS/Lint errors.
