/**
 * Common utility types used throughout the application.
 *
 * Provides foundational types like {@link Optional}, {@link Result},
 * {@link ValidationResult}, and API response structures used across
 * every package in the ecosystem.
 *
 * @since 1.0.0
 */

import { ChainType } from './business/enums.js';

/**
 * Utility type for values that can be T, undefined, or null.
 * Use instead of manual `T | null | undefined` unions for consistency.
 *
 * @template T - The base type
 * @since 1.0.0
 *
 * @example
 * ```typescript
 * interface User {
 *   name: string;
 *   bio?: Optional<string>;
 * }
 * ```
 */
export type Optional<T> = T | undefined | null;

/**
 * Base wallet data structure containing address and chain type.
 * Used across all wallet-related interfaces to ensure consistency.
 *
 * @since 1.0.0
 *
 * @example
 * ```typescript
 * const wallet: WalletData = {
 *   walletAddress: '0x742d35Cc6634C0532925a3b8D2C36B7f1234567',
 *   chainType: ChainType.EVM,
 * };
 * ```
 */
export interface WalletData {
  /** Wallet address (EVM 0x format or Solana Base58) */
  walletAddress: string;
  /** Chain type classification (EVM or Solana) */
  chainType: ChainType;
}

/**
 * Base folder data structure containing common folder properties.
 * Used across all folder/mailbox-related interfaces to ensure consistency.
 *
 * @since 1.0.0
 */
export interface FolderBase {
  /** Folder name */
  name: string;
  /** Total message count */
  count: number;
  /** Unread message count */
  unreadCount: number;
}

/**
 * Base message structure containing core message fields.
 * Used across all message/email-related interfaces to ensure consistency.
 *
 * @since 1.0.0
 */
export interface MessageBase {
  /** Message sender */
  from: string;
  /** Message recipient */
  to: string;
  /** Message subject line */
  subject: string;
  /** Message body content */
  body: string;
}

/**
 * Base response structure for all API operations.
 * Unified response interface for consistency across the entire application.
 *
 * @template T - The response data type (defaults to `unknown`)
 * @since 1.0.0
 *
 * @example
 * ```typescript
 * const response: BaseResponse<User> = {
 *   success: true,
 *   data: { name: 'Alice' },
 *   timestamp: new Date().toISOString(),
 * };
 * ```
 */
export interface BaseResponse<T = unknown> {
  /** Operation success status */
  success: boolean;
  /** Response data */
  data?: Optional<T>;
  /** Error message if operation failed */
  error?: Optional<string>;
  /** Response timestamp */
  timestamp: string;
}

/**
 * Unified pagination options for querying.
 * Supports both offset-based and cursor-based pagination.
 *
 * @since 1.0.0
 *
 * @example
 * ```typescript
 * const opts: PaginationOptions = {
 *   limit: 20,
 *   cursor: 'abc123',
 *   sortOrder: 'desc',
 * };
 * ```
 */
export interface PaginationOptions {
  /** Number of items per page */
  limit: number;
  /** Offset from start (for offset-based pagination) */
  offset?: Optional<number>;
  /** Cursor for cursor-based pagination */
  cursor?: Optional<string>;
  /** Sort order */
  sortOrder?: Optional<'asc' | 'desc'>;
}

/**
 * Unified pagination metadata for responses.
 *
 * @since 1.0.0
 */
export interface PaginationInfo {
  /** Whether there are more items after current page */
  hasNextPage: boolean;
  /** Whether there are items before current page */
  hasPreviousPage?: Optional<boolean>;
  /** Cursor to fetch next page */
  nextCursor?: Optional<string>;
  /** Cursor to fetch previous page */
  previousCursor?: Optional<string>;
  /** Total count of items (if available) */
  totalCount?: Optional<number>;
  /** Current page size */
  pageSize: number;
}

/**
 * Paginated response structure extending {@link BaseResponse} with
 * pagination metadata.
 *
 * @template T - The item type in the paginated list
 * @since 1.0.0
 *
 * @example
 * ```typescript
 * const page: PaginatedResponse<User> = {
 *   success: true,
 *   data: [{ name: 'Alice' }],
 *   timestamp: new Date().toISOString(),
 *   pagination: { hasNextPage: true, pageSize: 20 },
 * };
 * ```
 */
export interface PaginatedResponse<T> extends BaseResponse<T[]> {
  /** Pagination metadata */
  pagination: PaginationInfo;
}

/**
 * Unified error structure for all operations.
 * Provides typed error categories, human-readable messages,
 * and optional suggested actions for the user.
 *
 * @since 1.0.0
 *
 * @example
 * ```typescript
 * const error: UnifiedError = {
 *   type: 'ValidationError',
 *   message: 'Invalid email address',
 *   details: { field: 'email' },
 *   suggestedAction: 'Please enter a valid email.',
 * };
 * ```
 */
export interface UnifiedError {
  /** Error type/code */
  type:
    | 'ValidationError'
    | 'InsufficientFunds'
    | 'Unauthorized'
    | 'ContractError'
    | 'NetworkError'
    | 'OperationError';
  /** Error code (optional, for more specific categorization) */
  code?: Optional<string>;
  /** Human-readable error message */
  message: string;
  /** Additional error details */
  details?: Optional<{
    field?: Optional<string>;
    expectedValue?: Optional<unknown>;
    actualValue?: Optional<unknown>;
    txHash?: Optional<string>;
    [key: string]: unknown;
  }>;
  /** Suggested user action */
  suggestedAction?: Optional<string>;
}

/**
 * Discriminated union for operations that can succeed or fail.
 * Prefer this over throwing exceptions for recoverable errors.
 *
 * @template T - Success result type
 * @template E - Error type (defaults to {@link UnifiedError})
 * @since 1.0.0
 *
 * @example
 * ```typescript
 * function divide(a: number, b: number): Result<number> {
 *   if (b === 0) {
 *     return {
 *       success: false,
 *       error: { type: 'ValidationError', message: 'Division by zero' },
 *     };
 *   }
 *   return { success: true, data: a / b };
 * }
 * ```
 */
export type Result<T, E = UnifiedError> =
  { success: true; data: T } | { success: false; error: E };

/**
 * Unified validation result pattern.
 * Used by validators and {@link createValidator} to return typed results.
 *
 * @template T - The validated data type
 * @since 1.0.0
 *
 * @example
 * ```typescript
 * function validateAge(value: unknown): ValidationResult<number> {
 *   if (typeof value === 'number' && value >= 0) {
 *     return { isValid: true, data: value };
 *   }
 *   return { isValid: false, error: 'Age must be a non-negative number' };
 * }
 * ```
 */
export type ValidationResult<T = unknown> =
  | { isValid: true; data: T }
  | { isValid: false; error: string; data?: Optional<never> };

/**
 * Response for a service's root metadata endpoint (`GET /`).
 *
 * @since 1.11.0
 */
export interface ApiInfoResponse {
  /** Service name. */
  name: string;
  /** Service version. */
  version: string;
  /** Short status word, e.g. `"healthy"`. */
  status: string;
}

/**
 * Response for a service health check endpoint (`GET /health`).
 *
 * @since 1.11.0
 */
export interface HealthResponse {
  /** Health status word, e.g. `"ok"`. */
  status: string;
  /** Service version. */
  version: string;
  /**
   * Optional additional health detail as a plain string-keyed map; values may
   * be anything. Each API defines its own structure for what it puts here
   * (e.g. dependency status, indexed counts, composed sub-services) while
   * still returning the standard `{ status, version }` envelope.
   *
   * @since 1.12.0
   */
  detail?: Record<string, unknown>;
}

/** Alias for {@link HealthResponse}. */
export type HealthCheckData = HealthResponse;

/**
 * Construct a successful {@link BaseResponse} envelope.
 *
 * @since 1.11.0
 */
export function successResponse<T>(data: T): BaseResponse<T> {
  return { success: true, data, timestamp: new Date().toISOString() };
}

/**
 * Construct an error {@link BaseResponse} envelope.
 *
 * @since 1.11.0
 */
export function errorResponse(error: string): BaseResponse<never> {
  return { success: false, error, timestamp: new Date().toISOString() };
}

/**
 * Construct a {@link PaginatedResponse} from an offset/limit window.
 *
 * `hasNextPage` is derived from `offset + items.length < totalCount`, so it is
 * correct even when the last page is short. `pageSize` reports the requested
 * `limit`, not `items.length`.
 *
 * @since 1.12.0
 */
export function paginatedResponse<T>(
  items: T[],
  window: { limit: number; offset: number; totalCount: number }
): PaginatedResponse<T> {
  return {
    success: true,
    data: items,
    timestamp: new Date().toISOString(),
    pagination: {
      hasNextPage: window.offset + items.length < window.totalCount,
      hasPreviousPage: window.offset > 0,
      pageSize: window.limit,
      totalCount: window.totalCount,
    },
  };
}
