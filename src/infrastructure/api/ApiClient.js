/**
 * API Client
 * Handles HTTP requests with error handling, retries, and timeout
 */

import { getApiUrl, getApiConfig } from '../config/api';

class ApiClient {
  constructor() {
    this.config = getApiConfig();
  }

  /**
   * Makes an HTTP request with retry logic
   * @param {string} endpoint - API endpoint
   * @param {Object} options - Fetch options
   * @returns {Promise<Object>} API response
   */
  async request(endpoint, options = {}) {
    const url = getApiUrl(endpoint);
    console.log('API Request URL:', url);
    console.log('API Request Options:', options);
    
    const requestOptions = {
      timeout: this.config.TIMEOUT,
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      }
    };

    let lastError;
    
    for (let attempt = 1; attempt <= this.config.RETRY_ATTEMPTS; attempt++) {
      try {
        const response = await this.makeRequest(url, requestOptions);
        return await this.handleResponse(response);
      } catch (error) {
        lastError = error;
        
        if (attempt < this.config.RETRY_ATTEMPTS) {
          await this.delay(this.config.RETRY_DELAY * attempt);
        }
      }
    }

    throw lastError;
  }

  /**
   * Makes the actual HTTP request with timeout
   * @param {string} url 
   * @param {Object} options 
   * @returns {Promise<Response>}
   */
  async makeRequest(url, options) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), options.timeout);

    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal
      });
      clearTimeout(timeoutId);
      return response;
    } catch (error) {
      clearTimeout(timeoutId);
      if (error.name === 'AbortError') {
        throw new Error('Request timeout');
      }
      // Handle CORS errors specifically
      if (error.message.includes('CORS') || error.message.includes('cross-origin')) {
        throw new Error(`CORS Error: ${error.message}. Please check your backend CORS configuration.`);
      }
      throw error;
    }
  }

  /**
   * Handles API response and extracts data
   * @param {Response} response 
   * @returns {Promise<Object>}
   */
  async handleResponse(response) {
    const contentType = response.headers.get('content-type');
    const isJson = contentType && contentType.includes('application/json');
    
    let data;
    try {
      data = isJson ? await response.json() : await response.text();
    } catch (error) {
      data = null;
    }

    if (!response.ok) {
      const errorMessage = data?.message || data || `HTTP ${response.status}: ${response.statusText}`;
      throw new Error(errorMessage);
    }

    return {
      success: true,
      data,
      statusCode: response.status,
      message: data?.message || 'Request successful'
    };
  }

  /**
   * Utility method to delay execution
   * @param {number} ms 
   * @returns {Promise<void>}
   */
  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * GET request
   * @param {string} endpoint 
   * @param {Object} options 
   * @returns {Promise<Object>}
   */
  async get(endpoint, options = {}) {
    return this.request(endpoint, { ...options, method: 'GET' });
  }

  /**
   * POST request
   * @param {string} endpoint 
   * @param {Object} data 
   * @param {Object} options 
   * @returns {Promise<Object>}
   */
  async post(endpoint, data, options = {}) {
    return this.request(endpoint, {
      ...options,
      method: 'POST',
      body: JSON.stringify(data)
    });
  }

  /**
   * PUT request
   * @param {string} endpoint 
   * @param {Object} data 
   * @param {Object} options 
   * @returns {Promise<Object>}
   */
  async put(endpoint, data, options = {}) {
    return this.request(endpoint, {
      ...options,
      method: 'PUT',
      body: JSON.stringify(data)
    });
  }

  /**
   * DELETE request
   * @param {string} endpoint 
   * @param {Object} options 
   * @returns {Promise<Object>}
   */
  async delete(endpoint, options = {}) {
    return this.request(endpoint, { ...options, method: 'DELETE' });
  }
}

// Export singleton instance
export const apiClient = new ApiClient();
export default apiClient;
