/**
 * User Service
 * Application layer service that handles user business logic
 * Acts as a bridge between the domain layer and infrastructure layer
 */

import { User } from '../../domain/models/User';
import { userApi } from '../../infrastructure/api/UserApi';

class UserService {
  /**
   * Creates a new user with validation
   * @param {Object} userData - Raw user data
   * @returns {Promise<Object>} Service response
   */
  async createUser(userData) {
    try {
      // Create user domain model
      const user = new User(userData);
      
      // Validate user data
      const validation = user.validate();
      if (!validation.isValid) {
        return {
          success: false,
          error: 'Validation failed',
          validationErrors: validation.errors
        };
      }

      // Validate password confirmation if provided
      if (userData.confirmPassword) {
        const passwordValidation = user.validatePasswordConfirmation(userData.confirmPassword);
        if (!passwordValidation.isValid) {
          return {
            success: false,
            error: 'Password validation failed',
            validationErrors: [passwordValidation.error]
          };
        }
      }

      // Call API to create user
      const apiResponse = await userApi.createUser(user.toApiPayload());
      
      if (apiResponse.success) {
        return {
          success: true,
          data: apiResponse.data,
          message: 'User created successfully'
        };
      } else {
        return {
          success: false,
          error: apiResponse.error,
          message: 'Failed to create user'
        };
      }
    } catch (error) {
      return {
        success: false,
        error: error.message || 'An unexpected error occurred',
        message: 'User creation failed'
      };
    }
  }

  /**
   * Gets user by ID
   * @param {string} userId 
   * @returns {Promise<Object>} Service response
   */
  async getUserById(userId) {
    try {
      if (!userId) {
        return {
          success: false,
          error: 'User ID is required',
          message: 'Invalid user ID'
        };
      }

      const apiResponse = await userApi.getUserById(userId);
      
      if (apiResponse.success) {
        return {
          success: true,
          data: apiResponse.data,
          message: 'User retrieved successfully'
        };
      } else {
        return {
          success: false,
          error: apiResponse.error,
          message: 'Failed to retrieve user'
        };
      }
    } catch (error) {
      return {
        success: false,
        error: error.message || 'An unexpected error occurred',
        message: 'User retrieval failed'
      };
    }
  }

  /**
   * Updates user data
   * @param {string} userId 
   * @param {Object} userData 
   * @returns {Promise<Object>} Service response
   */
  async updateUser(userId, userData) {
    try {
      if (!userId) {
        return {
          success: false,
          error: 'User ID is required',
          message: 'Invalid user ID'
        };
      }

      // Create user domain model for validation
      const user = new User(userData);
      const validation = user.validate();
      
      if (!validation.isValid) {
        return {
          success: false,
          error: 'Validation failed',
          validationErrors: validation.errors
        };
      }

      const apiResponse = await userApi.updateUser(userId, user.toApiPayload());
      
      if (apiResponse.success) {
        return {
          success: true,
          data: apiResponse.data,
          message: 'User updated successfully'
        };
      } else {
        return {
          success: false,
          error: apiResponse.error,
          message: 'Failed to update user'
        };
      }
    } catch (error) {
      return {
        success: false,
        error: error.message || 'An unexpected error occurred',
        message: 'User update failed'
      };
    }
  }

  /**
   * Deletes user
   * @param {string} userId 
   * @returns {Promise<Object>} Service response
   */
  async deleteUser(userId) {
    try {
      if (!userId) {
        return {
          success: false,
          error: 'User ID is required',
          message: 'Invalid user ID'
        };
      }

      const apiResponse = await userApi.deleteUser(userId);
      
      if (apiResponse.success) {
        return {
          success: true,
          data: apiResponse.data,
          message: 'User deleted successfully'
        };
      } else {
        return {
          success: false,
          error: apiResponse.error,
          message: 'Failed to delete user'
        };
      }
    } catch (error) {
      return {
        success: false,
        error: error.message || 'An unexpected error occurred',
        message: 'User deletion failed'
      };
    }
  }
}

// Export singleton instance
export const userService = new UserService();
export default userService;
