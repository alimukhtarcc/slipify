/**
 * User API Service
 * Handles all user-related API operations
 */

import { apiClient } from './ApiClient';
import SimpleApiClient from './SimpleApiClient';
import { API_ENDPOINTS } from '../../domain/types';

class UserApi {
  /**
   * Creates a new user
   * @param {Object} userData - User data for creation
   * @returns {Promise<Object>} API response
   */
  async createUser(userData) {
    try {
      // Try the new API client first
      const response = await apiClient.post(API_ENDPOINTS.USER_CREATE, userData);
      return {
        success: true,
        data: response.data,
        message: 'User created successfully'
      };
    } catch (error) {
      console.log('New API client failed, trying simple client:', error.message);
      
      // Fallback to simple client (original behavior)
      try {
        const response = await SimpleApiClient.post(API_ENDPOINTS.USER_CREATE, userData);
        return response;
      } catch (fallbackError) {
        return {
          success: false,
          error: fallbackError.message || 'Failed to create user',
          message: 'User creation failed'
        };
      }
    }
  }

  /**
   * Gets user by ID
   * @param {string} userId 
   * @returns {Promise<Object>} API response
   */
  async getUserById(userId) {
    try {
      const response = await apiClient.get(`${API_ENDPOINTS.USER_CREATE}/${userId}`);
      return {
        success: true,
        data: response.data,
        message: 'User retrieved successfully'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Failed to retrieve user',
        message: 'User retrieval failed'
      };
    }
  }

  /**
   * Updates user data
   * @param {string} userId 
   * @param {Object} userData 
   * @returns {Promise<Object>} API response
   */
  async updateUser(userId, userData) {
    try {
      const response = await apiClient.put(`${API_ENDPOINTS.USER_CREATE}/${userId}`, userData);
      return {
        success: true,
        data: response.data,
        message: 'User updated successfully'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Failed to update user',
        message: 'User update failed'
      };
    }
  }

  /**
   * Deletes user
   * @param {string} userId 
   * @returns {Promise<Object>} API response
   */
  async deleteUser(userId) {
    try {
      const response = await apiClient.delete(`${API_ENDPOINTS.USER_CREATE}/${userId}`);
      return {
        success: true,
        data: response.data,
        message: 'User deleted successfully'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Failed to delete user',
        message: 'User deletion failed'
      };
    }
  }
}

// Export singleton instance
export const userApi = new UserApi();
export default userApi;
