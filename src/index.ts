/**
 * @sudobility/types - Common TypeScript types for Web3 email projects
 *
 * This package contains all shared TypeScript definitions used across
 * Web3 email applications including business logic types, blockchain
 * types, configuration interfaces, infrastructure types, and utility functions.
 *
 * @license BUSL-1.1
 */

// ============================================================================
// TYPES - Common
// ============================================================================

export type {
  Optional,
  WalletData,
  FolderBase,
  MessageBase,
  BaseResponse,
  PaginationOptions,
  PaginationInfo,
  PaginatedResponse,
  UnifiedError,
  Result,
  ValidationResult,
} from './types/common.js';

// ============================================================================
// TYPES - Business
// ============================================================================

// Enums
export {
  AuthStatus,
  Chain,
  ChainType,
  ConnectionState,
  ConnectionType,
  Currency,
  EmailAction,
  EmailAddressType,
  EmailComposeType,
  EmailSortCriteria,
  EmailValidationState,
  ErrorType,
  FeatureFlag,
  FontSize,
  InfoType,
  MediumView,
  MobileView,
  NotificationType,
  PlatformType,
  RequestStatus,
  SortOrder,
  SubscriptionAction,
  Theme,
  UserStatus,
} from './types/business/enums.js';

// Wallet status
export type { WalletStatus } from './types/business/wallet-status.js';
export {
  getWalletConnectionState,
  isWalletConnected,
  isWalletVerified,
} from './types/business/wallet-status.js';

// ============================================================================
// TYPES - Blockchain
// ============================================================================

export type {
  ChainConfig,
  ClaimableRevenue,
  ClientConfig,
  DeploymentAddresses,
  FeeStructure,
  Message,
  MessageFilter,
  MessageRecipient,
  OperationError,
  PreparedMessage,
  RpcConfig,
  SendMessageOptions,
  TransactionResult,
} from './types/blockchain/common.js';

export {
  MessageType,
  PROTOCOL_CONSTANTS,
  TransactionStatus,
  isEvmAddress,
  isEvmRecipient,
  isSolanaAddress,
  isSolanaRecipient,
} from './types/blockchain/common.js';

export {
  validateAddress,
  validateAmount,
  validateDomain,
  validateMessage,
} from './types/blockchain/validation.js';

// ============================================================================
// TYPES - Config
// ============================================================================

export type {
  EnvProvider,
  EnvironmentVariables,
} from './types/config/environment.js';
export { StorageType } from './types/config/environment.js';

export type { AppConfig, FirebaseConfig } from './types/config/app-config.js';

// ============================================================================
// TYPES - Infrastructure
// ============================================================================

// Analytics
export type {
  AnalyticsConfig,
  AnalyticsEventProperties,
  AnalyticsService,
  EmailAnalyticsService,
} from './types/infrastructure/analytics.js';
export {
  AnalyticsEvent,
  AnalyticsEventBuilder,
} from './types/infrastructure/analytics.js';

// API
export type {
  ApiResponse,
  ChainMetadata,
  ChainStatisticsEntity,
  DelegationEntity,
  EventLogEntity,
  GraphQLResult,
  MailEntity,
  MultiChainId,
  PreparedMailEntity,
  SignatureProtectedRequest,
  StatisticsEntity,
  SupportedChainId,
  UserChainId,
  UserStatisticsEntity,
} from './types/infrastructure/api.js';
export {
  ContractType,
  ProcessedEventName,
} from './types/infrastructure/api.js';

// Network
export type {
  NetworkClient,
  NetworkRequestOptions,
  NetworkResponse,
} from './types/infrastructure/network.js';
export { NetworkError } from './types/infrastructure/network.js';

// Navigation
export type {
  UILocationHook,
  UINavigationConfig,
  UINavigationHook,
  UINavigationOptions,
  UINavigationService,
  UINavigationState,
} from './types/infrastructure/navigation.js';

// Wallet
export { WalletType } from './types/infrastructure/wallet.js';

// Firebase User
export type { UserInfoResponse } from './types/infrastructure/firebase-user.js';

// ============================================================================
// TYPES - Subscription
// ============================================================================

// Rate Limits
export type {
  RateLimits,
  RateLimitTier,
  RateLimitResets,
  RateLimitsConfigData,
  RateLimitUsage,
  RateLimitsConfigResponse,
  RateLimitHistoryEntry,
  RateLimitHistoryData,
  RateLimitHistoryResponse,
} from './types/subscription/rate-limits.js';
export { RateLimitPeriodType } from './types/subscription/rate-limits.js';

// Periods
export type { SubscriptionPeriod } from './types/subscription/period.js';
export { PERIOD_RANKS, ALL_PERIODS } from './types/subscription/period.js';

// Entitlements
export { NONE_ENTITLEMENT } from './types/subscription/entitlements.js';

// Platform
export { SubscriptionPlatform } from './types/subscription/platform.js';

// Backend subscription result (API contract)
export type { BackendSubscriptionResult } from './types/subscription/backend-subscription.js';

// ============================================================================
// TYPES - Consumables
// ============================================================================

export type {
  ConsumableSource,
  ConsumablePurchaseRequest,
  ConsumableUseRequest,
  ConsumableBalanceResponse,
  ConsumableUseResponse,
  ConsumablePurchaseRecord,
  ConsumableUsageRecord,
} from './types/consumables/index.js';

// ============================================================================
// TYPES - Entity
// ============================================================================

// Core entity types
export {
  EntityType,
  EntityRole,
  InvitationStatus,
} from './types/entity/entity.js';

export type {
  Entity,
  EntityWithRole,
  EntityMember,
  EntityInvitation,
} from './types/entity/entity.js';

// Permissions
export type { EntityPermissions } from './types/entity/permissions.js';
export {
  OWNER_PERMISSIONS,
  MANAGER_PERMISSIONS,
  MEMBER_PERMISSIONS,
  getPermissionsForRole,
  hasPermission,
} from './types/entity/permissions.js';

// Requests
export type {
  CreateEntityRequest,
  UpdateEntityRequest,
  UpdateMemberRoleRequest,
  InviteMemberRequest,
  AcceptInvitationRequest,
  DeclineInvitationRequest,
} from './types/entity/requests.js';

// Responses
export type {
  EntityResponse,
  EntityWithRoleListResponse,
  EntityWithRoleResponse,
  EntityMemberResponse,
  EntityMemberListResponse,
  EntityInvitationResponse,
  EntityInvitationListResponse,
  SlugAvailabilityData,
  SlugAvailabilityResponse,
} from './types/entity/responses.js';

// ============================================================================
// UTILS - Validation
// ============================================================================

export type { AddressValidationResult } from './utils/validation/web3-username-validator.js';
export { Web3UsernameValidator } from './utils/validation/web3-username-validator.js';

export type { ValidationResult as TypeValidationResult } from './utils/validation/type-validation.js';
export {
  createAssertion,
  createValidator,
  hasRequiredProperties,
  isApiResponse,
  isArray,
  isBoolean,
  isEmail,
  isErrorResponse,
  isNullish,
  isNumber,
  isObject,
  isString,
  isSuccessResponse,
  isUrl,
  isValidDate,
  optional,
  parseJson,
  validateArray,
} from './utils/validation/type-validation.js';

// ============================================================================
// UTILS - Blockchain
// ============================================================================

export type { ParsedEmailAddress } from './utils/blockchain/address.js';
export {
  AddressType,
  formatWalletAddress,
  getAddressType,
  getChainDisplayName,
  isENSName,
  isSNSName,
  isValidSignature,
  isValidWalletAddress,
  parseEmailAddress,
} from './utils/blockchain/address.js';

export type {
  MultiChainIdGenerator,
  UserChainIdGenerator,
} from './utils/blockchain/event-helpers.js';
export {
  createChainStatsId,
  createDelegationId,
  createMultiChainId,
  createUserMultiChainId,
  formatBigInt,
  isTestNet,
  isZeroAddress,
  normalizeAddress,
  validateEventArgs,
} from './utils/blockchain/event-helpers.js';

// ============================================================================
// UTILS - Auth
// ============================================================================

export {
  canAccessProtectedFeatures,
  extractNonceFromMessage,
  generateAuthMessage,
  generateNonce,
  getAuthStatusText,
  isAuthExpired,
  isAuthStatusConnected,
  isValidNonce,
} from './utils/auth/auth.js';

export {
  parseAdminEmails,
  isAdminEmail,
  createAdminChecker,
} from './utils/auth/admin-emails.js';

// ============================================================================
// UTILS - Formatting
// ============================================================================

// Currency
export {
  CLAIM_PERIOD_DAYS,
  USDC_DECIMALS,
  formatUSDC,
  parseUSDC,
} from './utils/formatting/currency.js';

// Date
export {
  addDays,
  addHours,
  formatEmailDate,
  formatRelativeTime,
  formatTimestamp,
  isDateInRange,
  parseDate,
} from './utils/formatting/date.js';

// String
export {
  capitalize,
  escapeHtml,
  formatBytes,
  formatNumber,
  getInitials,
  isBlank,
  isNotBlank,
  normalizeWhitespace,
  pluralize,
  randomString,
  stripHtml,
  toCamelCase,
  toKebabCase,
  toSnakeCase,
  toTitleCase,
  truncate,
} from './utils/formatting/string.js';

// ============================================================================
// UTILS - Constants
// ============================================================================

export {
  API_TIMEOUT,
  API_RETRY_ATTEMPTS,
  API_RETRY_DELAY,
  AUTH_STATUS,
  CHAIN_TYPE,
  STORAGE_KEYS,
  EMAIL_CONFIG,
  SUBSCRIPTION_TIERS,
  TIME_FORMAT,
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
  ROUTES,
  CONTACT_INFO,
  WALLET_NAMES,
  NETWORK_IDS,
  ANIMATION,
  Z_INDEX,
} from './utils/constants/application.js';

export { STATUS_VALUES } from './utils/constants/status-values.js';
export type { StatusValue } from './utils/constants/status-values.js';

// ============================================================================
// UTILS - Logging
// ============================================================================

export {
  LogLevel,
  type LogEntry,
  logger,
  authLogger,
  apiLogger,
  contractLogger,
  ensLogger,
  storageLogger,
} from './utils/logging/logger.js';

// ============================================================================
// UTILS - URL
// ============================================================================

export {
  createURLSearchParams,
  createSearchParams,
  searchParamsToString,
  parseSearchParams,
  type URLSearchParamsLike,
} from './utils/url/url-params.js';

// ============================================================================
// UTILS - Async Helpers
// ============================================================================

export {
  safeAsync,
  withLoadingState,
  safeParallel,
  withTimeout,
  withCache,
  clearExpiredCache,
  debounceAsync,
  type AsyncResult,
} from './utils/async-helpers.js';
