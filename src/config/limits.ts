export const LIMITS = {
  auth: {
    // Access token lifetime in seconds.
    // 訪問令牌有效期（秒）。
    accessTokenTtlSeconds: 7200,
    // Refresh token lifetime in milliseconds.
    // 重新整理令牌有效期（毫秒）。
    refreshTokenTtlMs: 30 * 24 * 60 * 60 * 1000,
    // Grace window for previous refresh token after rotation (ms).
    // 重新整理令牌輪換後的舊令牌寬限視窗（毫秒）。
    refreshTokenOverlapGraceMs: 60 * 1000,
    // Refresh token random byte length.
    // 重新整理令牌隨機位元組長度。
    refreshTokenRandomBytes: 32,
    // Attachment download token lifetime in seconds.
    // 附件下載令牌有效期（秒）。
    fileDownloadTokenTtlSeconds: 300,
    // Send access token lifetime in seconds.
    // Send 訪問令牌有效期（秒）。
    sendAccessTokenTtlSeconds: 300,
    // Minimum required JWT secret length.
    // JWT 金鑰最小長度要求。
    jwtSecretMinLength: 32,
    // Default PBKDF2 iterations for account creation/prelogin fallback.
    // 帳戶建立與預先登入回退使用的預設 PBKDF2 迭代次數。
    defaultKdfIterations: 600000,
    // clientSecret length
    // clientSecret 長度
    clientSecretLength: 30,
  },
  rateLimit: {
    // Max failed login attempts before temporary lock.
    // 觸發臨時鎖定前允許的最大登入失敗次數。
    loginMaxAttempts: 10,
    // Login lock duration in minutes.
    // 登入鎖定時長（分鐘）。
    loginLockoutMinutes: 2,
    // Authenticated API request budget per user per minute (all reads & writes combined).
    // 認證 API 每使用者每分鐘請求配額（讀寫合計）。
    apiRequestsPerMinute: 200,
    // Public (unauthenticated) request budget per IP per minute.
    // 公開（未認證）介面每 IP 每分鐘請求配額。
    publicRequestsPerMinute: 60,
    // Public read-only request budget per IP per minute.
    // 公開只讀介面每 IP 每分鐘請求配額。
    publicReadRequestsPerMinute: 120,
    // Sensitive public/auth request budget per IP per minute.
    // 敏感公開/認證介面每 IP 每分鐘請求配額。
    sensitivePublicRequestsPerMinute: 30,
    // Password hint lookup budget per IP per minute.
    // 密碼提示查詢介面每 IP 每分鐘請求配額。
    passwordHintRequestsPerMinute: 1,
    // Password hint lookup budget per IP per hour.
    // 密碼提示查詢介面每 IP 每小時請求配額。
    passwordHintRequestsPerHour: 3,
    // Register endpoint budget per IP per minute.
    // 註冊介面每 IP 每分鐘請求配額。
    registerRequestsPerMinute: 5,
    // Refresh-token grant budget per IP per minute.
    // refresh_token 授權每 IP 每分鐘請求配額。
    refreshTokenRequestsPerMinute: 30,
    // Fixed window size for API rate limiting in seconds.
    // API 限流固定視窗大小（秒）。
    apiWindowSeconds: 60,
    // Probability to run low-frequency cleanup on request path.
    // 在請求路徑中觸發低頻清理的機率。
    cleanupProbability: 0.05,
    // Minimum interval between login-attempt cleanup runs.
    // 登入嘗試表清理的最小間隔。
    loginIpCleanupIntervalMs: 10 * 60 * 1000,
    // Retention window for login IP records.
    // 登入 IP 記錄保留時長。
    loginIpRetentionMs: 30 * 24 * 60 * 60 * 1000,
  },
  cleanup: {
    // Minimum interval between refresh-token cleanup runs.
    // refresh_token 表清理最小間隔。
    refreshTokenCleanupIntervalMs: 30 * 60 * 1000,
    // Minimum interval between used attachment token cleanup runs.
    // 已使用附件令牌表清理最小間隔。
    attachmentTokenCleanupIntervalMs: 10 * 60 * 1000,
    // Probability to trigger cleanup during requests.
    // 請求過程中觸發清理的機率。
    cleanupProbability: 0.05,
  },
  attachment: {
    // Max attachment upload size in bytes.
    // 附件上傳大小上限（位元組）。
    maxFileSizeBytes: 100 * 1024 * 1024,
  },
  send: {
    // Max file size allowed for Send file uploads.
    // Send 檔案上傳大小上限。
    maxFileSizeBytes: 100 * 1024 * 1024,
    // Max days allowed between now and deletion date.
    // 允許的最遠刪除日期（距當前天數）。
    maxDeletionDays: 31,
  },
  pagination: {
    // Default page size when client does not specify pageSize.
    // 客戶端未傳 pageSize 時的預設分頁大小。
    defaultPageSize: 100,
    // Hard maximum page size accepted by server.
    // 伺服端允許的最大分頁大小。
    maxPageSize: 500,
  },
  cors: {
    // Browser preflight cache max age in seconds.
    // 瀏覽器預檢請求快取時長（秒）。
    preflightMaxAgeSeconds: 86400,
  },
  cache: {
    // Icon proxy cache TTL in seconds.
    // 圖示代理快取時長（秒）。
    iconTtlSeconds: 604800,
    // In-memory /api/sync response cache TTL (milliseconds).
    // /api/sync 記憶體快取有效期（毫秒）。
    syncResponseTtlMs: 30 * 1000,
    // Max size of a single cached /api/sync body in bytes.
    // 單個 /api/sync 快取響應允許的最大位元組數。
    syncResponseMaxBodyBytes: 512 * 1024,
    // Max total in-memory bytes used by /api/sync cache per isolate.
    // 每個 isolate 中 /api/sync 快取允許佔用的最大總位元組數。
    syncResponseMaxTotalBytes: 2 * 1024 * 1024,
    // Max in-memory /api/sync cache entries per isolate.
    // 每個 isolate 的 /api/sync 最大快取條目數。
    syncResponseMaxEntries: 64,
  },
  performance: {
    // Max IDs per SQL batch when moving ciphers in bulk.
    // 批次移動密碼項時每批 SQL 的最大 ID 數量。
    bulkMoveChunkSize: 200,
    // Max total items (folders + ciphers) allowed in a single import.
    // 單次匯入允許的最大條目數（資料夾 + 密碼項合計）。
    importItemLimit: 5000,
    // Small fixed concurrency for blob/attachment batch cleanup work.
    // 附件 / blob 批次清理時的保守併發數。
    attachmentDeleteConcurrency: 4,
  },
  request: {
    // Hard body size limit for JSON API endpoints (bytes). File upload paths are exempt.
    // JSON 介面請求 body 大小上限（位元組），檔案上傳介面除外。
    maxBodyBytes: 25 * 1024 * 1024,
  },
  compatibility: {
    // Single source of truth for /config.version and /api/version.
    // /config.version 與 /api/version 的統一版本號來源。
    bitwardenServerVersion: '2026.1.0',
  },
} as const;
