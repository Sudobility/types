# @sudobility/types

Comprehensive TypeScript type definitions and utilities for Web3 email applications across the 0xmail ecosystem. Zero runtime dependencies, ESM-only, tree-shakeable.

## Installation

This package is published to **GitHub Packages**, not the public npm registry. Consumers need an `.npmrc` that routes the `@sudobility` scope to GitHub Packages with a read token:

```
@sudobility:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GH_PACKAGES_READ_TOKEN}
```

Then:

```bash
bun install @sudobility/types   # or: npm install / pnpm add
```

No peer dependencies and no runtime dependencies.

> ESM-only. The package sets `"type": "module"` and ships only ESM output; there is no CommonJS build. Consume it from an ESM context (or a bundler).

## Usage

### Core Utility Types

```typescript
import { Optional, Result, ValidationResult, BaseResponse, PaginatedResponse } from '@sudobility/types';

const maybeUser: Optional<User> = null;  // T | undefined | null

function doWork(): Result<Data> {
  if (ok) return { success: true, data: result };
  return { success: false, error: { type: 'ValidationError', message: '...' } };
}
```

### Blockchain Types

```typescript
import { isEvmAddress, isSolanaAddress, formatWalletAddress, ChainType } from '@sudobility/types';

isEvmAddress('0x742d35Cc6634C0532925a3b8D2C36B7f12345678');  // true
isSolanaAddress('9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWWM');  // true
formatWalletAddress('0x742d35Cc6634C0532925a3b8D2C36B7f12345678');  // "0x742d...5678"
```

### Enums

Key enums: `AuthStatus`, `Chain` (60+ chains), `ChainType`, `ConnectionState`, `Theme`, `EmailAction`, `RequestStatus`, `WalletType`, `EntityType`, `EntityRole`, and more. Enums are emitted as runtime values (imported with `import { ... }`, not `import type`).

### Import Paths

```typescript
import { ... } from '@sudobility/types';            // Full library (barrel)
import { ... } from '@sudobility/types/enums';       // Business enums only
import { ... } from '@sudobility/types/blockchain';  // Blockchain types only
```

## Development

```bash
bun install            # Install dev dependencies
bun run build          # Build ESM output to dist/ (tsc + ESM import-path fixup)
bun run dev            # Watch-mode typecheck
bun run test:unit      # Run tests (Vitest) — NOT `bun test`, which uses Bun's own runner
bun run test:watch     # Tests in watch mode
bun run typecheck      # TypeScript check (no emit)
bun run lint           # ESLint (flat config)
bun run format         # Prettier
bun run verify         # Full pipeline: typecheck + lint + test:unit + build
```

## Key Exports

- **Types**: `Optional<T>`, `Result<T,E>`, `ValidationResult<T>`, `BaseResponse<T>`, `PaginatedResponse<T>`, `UnifiedError`
- **Enums**: `AuthStatus`, `Chain`, `ChainType`, `ConnectionState`, `Theme`, `EmailAction`, `WalletType`, `EntityType`, `EntityRole`, and more
- **Validators**: `isEvmAddress`, `isSolanaAddress`, `isENSName`, `isSNSName`, `Web3UsernameValidator`, `validateAddress`, `validateAmount`, runtime type guards
- **Formatters**: `formatWalletAddress`, `formatUSDC`, `formatEmailDate`, `formatRelativeTime`, `formatBytes`, `truncate`, `capitalize`, and more
- **Async Helpers**: `safeAsync`, `withLoadingState`, `safeParallel`, `withTimeout`, `withCache`, `debounceAsync`
- **Infrastructure interfaces**: `NetworkClient`, `AnalyticsService`, `UINavigationService`

The complete public surface is the barrel in [`src/index.ts`](src/index.ts).

## License

BUSL-1.1
