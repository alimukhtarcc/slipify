/**
 * API Configuration
 * Centralized configuration for API endpoints and settings
 */

const API_CONFIG = {
  BASE_URL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:3000/api',
  TIMEOUT: 10000, // 10 seconds
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000 // 1 second
};

export const getApiConfig = () => API_CONFIG;

export const getApiUrl = (endpoint) => {
  const baseUrl = API_CONFIG.BASE_URL;
  // Remove leading slash from endpoint if it exists
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint.substring(1) : endpoint;
  // Ensure baseUrl ends with / and endpoint doesn't start with /
  const normalizedBaseUrl = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
  return `${normalizedBaseUrl}${cleanEndpoint}`;
};

export default API_CONFIG;
