module.exports = {
  // User Roles
  ROLES: {
    ADMIN: 'admin',
    STAFF: 'staff',
  },

  // Advertiser Status
  ADVERTISER_STATUS: {
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    SUSPENDED: 'suspended',
  },

  // Campaign Status
  CAMPAIGN_STATUS: {
    ACTIVE: 'active',
    PAUSED: 'paused',
    COMPLETED: 'completed',
    CANCELLED: 'cancelled',
  },

  // Ad Types
  AD_TYPES: [
    'Banner',
    'Video',
    'Text',
    'Display',
    'Social Media',
    'Email',
  ],

  // Payment Status
  PAYMENT_STATUS: {
    PAID: 'paid',
    PENDING: 'pending',
    FAILED: 'failed',
    OVERDUE: 'overdue',
  },

  // Payment Methods
  PAYMENT_METHODS: [
    'bank_transfer',
    'check',
    'cash',
    'credit_card',
    'online',
  ],

  // Notification Types
  NOTIFICATION_TYPES: {
    RENEWAL_30DAYS: 'renewal_30days',
    RENEWAL_15DAYS: 'renewal_15days',
    RENEWAL_7DAYS: 'renewal_7days',
    RENEWAL_TODAY: 'renewal_today',
    PAYMENT_PENDING: 'payment_pending',
    PAYMENT_OVERDUE: 'payment_overdue',
    CAMPAIGN_ENDING: 'campaign_ending',
    NEW_CAMPAIGN: 'new_campaign',
  },

  // Alert Days
  ALERT_DAYS: {
    THIRTY: 30,
    FIFTEEN: 15,
    SEVEN: 7,
  },

  // Pagination
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 10,
  MAX_LIMIT: 100,

  // Success Messages
  SUCCESS: {
    CREATED: 'Resource created successfully',
    UPDATED: 'Resource updated successfully',
    DELETED: 'Resource deleted successfully',
    FETCHED: 'Data retrieved successfully',
  },

  // Error Messages
  ERRORS: {
    INVALID_CREDENTIALS: 'Invalid email or password',
    EMAIL_EXISTS: 'Email already registered',
    NOT_FOUND: 'Resource not found',
    UNAUTHORIZED: 'Unauthorized access',
    FORBIDDEN: 'Access forbidden',
    VALIDATION_ERROR: 'Validation error',
    SERVER_ERROR: 'Internal server error',
    DUPLICATE_RECORD: 'Duplicate record found',
  },
};
