/**
 * Domain types and interfaces
 * Defines the shape of data structures used throughout the application
 */

/**
 * User creation request payload
 * @typedef {Object} CreateUserRequest
 * @property {string} email
 * @property {string} firstName
 * @property {string} lastName
 * @property {string} password
 */

/**
 * API response wrapper
 * @typedef {Object} ApiResponse
 * @property {boolean} success
 * @property {*} data
 * @property {string} message
 * @property {number} statusCode
 */

/**
 * Form validation result
 * @typedef {Object} ValidationResult
 * @property {boolean} isValid
 * @property {string[]} errors
 */

/**
 * Application state for forms
 * @typedef {Object} FormState
 * @property {boolean} isLoading
 * @property {string} error
 * @property {string} success
 */

/**
 * User form data
 * @typedef {Object} UserFormData
 * @property {string} email
 * @property {string} firstName
 * @property {string} lastName
 * @property {string} password
 * @property {string} confirmPassword
 */

export const API_ENDPOINTS = {
  USER_CREATE: '/user/create'
};

export const FORM_FIELDS = {
  EMAIL: 'email',
  FIRST_NAME: 'firstName',
  LAST_NAME: 'lastName',
  PASSWORD: 'password',
  CONFIRM_PASSWORD: 'confirmPassword'
};

export const ALERT_TYPES = {
  ERROR: 'error',
  SUCCESS: 'success',
  WARNING: 'warning',
  INFO: 'info'
};
