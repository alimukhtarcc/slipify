/**
 * Simple API Client - Fallback to original fetch approach
 * This maintains the original fetch behavior for compatibility
 */

const SimpleApiClient = {
  /**
   * Makes a simple POST request (mimics original behavior)
   * @param {string} endpoint - API endpoint
   * @param {Object} data - Request data
   * @returns {Promise<Object>} API response
   */
  async post(endpoint, data) {
    const baseUrl = process.env.REACT_APP_API_BASE_URL;
    // Remove leading slash from endpoint if it exists
    const cleanEndpoint = endpoint.startsWith('/') ? endpoint.substring(1) : endpoint;
    // Ensure baseUrl ends with / and endpoint doesn't start with /
    const normalizedBaseUrl = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
    const apiUrl = `${normalizedBaseUrl}${cleanEndpoint}`;
    
    console.log('Simple API Request URL:', apiUrl);
    console.log('Simple API Request Data:', data);
    
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        const responseData = await response.json();
        return {
          success: true,
          data: responseData,
          message: 'Request successful'
        };
      } else {
        const errorData = await response.json();
        return {
          success: false,
          error: errorData.message || 'Failed to create account',
          message: 'Request failed'
        };
      }
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Network error. Please try again.',
        message: 'Request failed'
      };
    }
  }
};

export default SimpleApiClient;
