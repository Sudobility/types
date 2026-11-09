# @sudobility/types — AI Development Guide

> **Git policy — never auto-commit or auto-push.** Leave work in the working tree.
> Run `git commit`, `git push`, or `gh pr create` **only when the user explicitly asks in that
> turn**. Approval for an earlier change does not carry forward, and finishing a task is not
> permission to commit it. Stay on the current branch; do not create feature branches.

## What this is

`@sudobility/types` is the foundational, **zero-runtime-dependency** TypeScript types + utilities
library shared across the 0xmail / Sudobility Web3-email ecosystem. It provides type definitions,
interfaces, enums, runtime type guards, validators, formatters, and pure utility functions.

- Package: `@sudobility/types` (current version in `package.json`; do not hardcode it elsewhere)
- License: BUSL-1.1
- Package manager: **Bun** (`bun.lock`)
- Module format: **ESM-only** — `"type": "module"`, no CommonJS build

## Stack & build

- TypeScript `~5.9`, `strict` mode. Source `tsconfig.json` has `noEmit: true`.
- Build uses `tsconfig.esm.json` (extends base) to emit to `dist/`, then a post-build fixup.
- Vitest `~4` for tests, ESLint `~9` (flat config), Prettier.

### Commands (verified in `package.json`)

```bash
bun install
bun run build        # tsc -p tsconfig.esm.json  THEN  node scripts/fix-esm-imports.mjs
bun run dev          # tsc --watch (typecheck only; base config is noEmit)
bun run test:unit    # vitest run   <-- canonical test command
bun run test:watch   # vitest --watch
bun run typecheck    # tsc --noEmit
bun run lint         # eslint src --ext .ts   (lint:fix to autofix)
bun run format       # prettier --write
bun run verify       # typecheck + lint + test:unit + build  (run before publish)
```

- **`bun test` is wrong** — it invokes Bun's built-in test runner, not Vitest. Always use
  `bun run test:unit`.
- `scripts/fix-esm-imports.mjs` is mandatory after `tsc`: `tsc` runs with
  `moduleResolution: "bundler"` and emits extensionless/directory relative imports; this script
  rewrites them to explicit `.js` paths so Node's native ESM loader can resolve the package. All
  `src/*.ts` relative imports are written `from './x.js'` (`.js` extension) to match.

## Architecture

- `src/index.ts` — the single barrel; **the authoritative public API**. Every export must be added
  here. Use `export type { ... }` for pure types/interfaces, `export { ... }` for enums and runtime
  values (enums must be emitted, not type-only).
- `src/types/<domain>/` — `business`, `blockchain`, `config`, `consumables`, `entity`,
  `infrastructure`, `subscription`, plus top-level `common.ts` (core `Optional`/`Result`/
  `BaseResponse`/`PaginatedResponse`/`UnifiedError`).
- `src/utils/<domain>/` — pure functions only (no side effects), except `logging/logger.ts`.
  Domains: `async-helpers.ts`, `auth`, `blockchain`, `constants`, `formatting`, `logging`, `url`,
  `validation`.
- `test/` mirrors `src/` paths; some unit tests also live beside source (`*.test.ts`).

### Subpath exports (`package.json` `exports`)

- `@sudobility/types` → barrel (`.`)
- `@sudobility/types/enums` → `src/types/business/enums.ts`
- `@sudobility/types/blockchain` → `src/types/blockchain/index.ts`
- `@sudobility/types/api` → **stale/dangling**: points at `dist/types/api/indexer-responses.js`,
  but `src/types/api/` does not exist. Do not document it as working; fix or remove before relying
  on it.

## Conventions

- **`Optional<T>`** (`= T | undefined | null`) instead of manual nullable unions, everywhere.
- **`Result<T, E>`** / `ValidationResult<T>` discriminated unions for fallible operations instead of
  throwing. API response types extend `BaseResponse<T>`.
- Entity/RBAC system in `src/types/entity/` is split by concern: enums + core interfaces in
  `entity.ts`, permission constants/helpers in `permissions.ts`, request shapes in `requests.ts`,
  response shapes in `responses.ts`.
- Add JSDoc (`@example`) to new public symbols. Add tests for new validators/formatters covering
  edge cases. Run `bun run verify` before considering a change done.

## Gotchas

- ESM-only; relative imports in source **must** carry `.js` extensions (consumed by the build fixup).
- Published to **GitHub Packages** (`.npmrc`: `@sudobility:registry=https://npm.pkg.github.com`),
  not public npm. Install/CI need a read token (`GH_PACKAGES_READ_TOKEN`). CI/publish runs via the
  reusable `johnqh/workflows` unified-cicd workflow with `publish-target: github`.
- Zero runtime dependencies is a hard invariant — do not add `dependencies`, only `devDependencies`.
- `.ai/` holds auxiliary AI context + analysis scripts (`bun run ai:docs`); not part of the build.
