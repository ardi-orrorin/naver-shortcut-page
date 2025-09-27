# Repository Guidelines

## Project Structure & Module Organization
Source lives in `src/` with Next.js App Router routes under `src/app`. Shared UI sits in `src/app/_components`, global styles load from `src/app/globals.css`, and reusable helpers belong in `src/utils` (for example `jsToBase64.ts`). Static assets belong in `public/`; reference them with `/asset-name` paths. Configuration files such as `next.config.ts`, `tsconfig.json`, and `eslint.config.mjs` anchor framework, TypeScript, and lint settings.

## Build, Test, and Development Commands
Use `npm install` once to sync dependencies. `npm run dev` boots the turbopack-powered Next.js dev server on `localhost:3000`. `npm run build` performs a production build, while `npm run start` serves the compiled output. `npm run lint` runs ESLint with the `next/core-web-vitals` preset; run it before opening a PR.

## Coding Style & Naming Conventions
The project uses TypeScript with `strict` checks and the `@/*` path alias, so prefer absolute imports like `import foo from "@/utils/foo"`. Components and hooks should be PascalCase (`Shutcut`, `RootLayout`), while utility functions stay camelCase. Keep two-space indentation and include Tailwind classes directly in JSX for styling. Always type props and function returns explicitly, mirroring the patterns in `src/app/page.tsx` and `src/utils/jsToBase64.ts`.

## Testing Guidelines
A dedicated test runner is not yet configured. When adding coverage, co-locate tests beside the code or within `src/__tests__`, and ensure they can run via an npm script (e.g., `npm run test`). Until an automated suite lands, rely on manual smoke-tests of critical flows and treat lint as a required gate.

## Commit & Pull Request Guidelines
Follow concise, imperative commit messages (`remove public icon`, `init`) and group related changes together. Each pull request should explain the problem, the solution, and any follow-up work. Attach screenshots or clips for UI changes and call out configuration updates. Confirm `npm run build` and `npm run lint` succeed locally before requesting review.
