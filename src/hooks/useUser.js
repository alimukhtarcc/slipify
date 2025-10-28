/**
 * Custom hook for user operations
 * Handles user-related API calls and state management
 */

import { useState, useCallback } from 'react';
import { userService } from '../application/services/UserService';
import { ALERT_TYPES } from '../domain/types';

const useUser = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [alertType, setAlertType] = useState(ALERT_TYPES.INFO);

  /**
   * Clears all messages
   */
  const clearMessages = useCallback(() => {
    setError('');
    setSuccess('');
  }, []);

  /**
   * Sets error message
   * @param {string} message - Error message
   */
  const setErrorMessage = useCallback((message) => {
    setError(message);
    setSuccess('');
    setAlertType(ALERT_TYPES.ERROR);
  }, []);

  /**
   * Sets success message
   * @param {string} message - Success message
   */
  const setSuccessMessage = useCallback((message) => {
    setSuccess(message);
    setError('');
    setAlertType(ALERT_TYPES.SUCCESS);
  }, []);

  /**
   * Creates a new user
   * @param {Object} userData - User data
   * @returns {Promise<Object>} Result
   */
  const createUser = useCallback(async (userData) => {
    setIsLoading(true);
    clearMessages();

    try {
      const result = await userService.createUser(userData);
      
      if (result.success) {
        setSuccessMessage(result.message);
        return { success: true, data: result.data };
      } else {
        setErrorMessage(result.error || result.message);
        return { 
          success: false, 
          error: result.error,
          validationErrors: result.validationErrors 
        };
      }
    } catch (err) {
      const errorMessage = err.message || 'An unexpected error occurred';
      setErrorMessage(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  }, [clearMessages, setErrorMessage, setSuccessMessage]);

  /**
   * Gets user by ID
   * @param {string} userId - User ID
   * @returns {Promise<Object>} Result
   */
  const getUserById = useCallback(async (userId) => {
    setIsLoading(true);
    clearMessages();

    try {
      const result = await userService.getUserById(userId);
      
      if (result.success) {
        return { success: true, data: result.data };
      } else {
        setErrorMessage(result.error || result.message);
        return { success: false, error: result.error };
      }
    } catch (err) {
      const errorMessage = err.message || 'An unexpected error occurred';
      setErrorMessage(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  }, [clearMessages, setErrorMessage]);

  /**
   * Updates user
   * @param {string} userId - User ID
   * @param {Object} userData - User data
   * @returns {Promise<Object>} Result
   */
  const updateUser = useCallback(async (userId, userData) => {
    setIsLoading(true);
    clearMessages();

    try {
      const result = await userService.updateUser(userId, userData);
      
      if (result.success) {
        setSuccessMessage(result.message);
        return { success: true, data: result.data };
      } else {
        setErrorMessage(result.error || result.message);
        return { 
          success: false, 
          error: result.error,
          validationErrors: result.validationErrors 
        };
      }
    } catch (err) {
      const errorMessage = err.message || 'An unexpected error occurred';
      setErrorMessage(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  }, [clearMessages, setErrorMessage, setSuccessMessage]);

  /**
   * Deletes user
   * @param {string} userId - User ID
   * @returns {Promise<Object>} Result
   */
  const deleteUser = useCallback(async (userId) => {
    setIsLoading(true);
    clearMessages();

    try {
      const result = await userService.deleteUser(userId);
      
      if (result.success) {
        setSuccessMessage(result.message);
        return { success: true, data: result.data };
      } else {
        setErrorMessage(result.error || result.message);
        return { success: false, error: result.error };
      }
    } catch (err) {
      const errorMessage = err.message || 'An unexpected error occurred';
      setErrorMessage(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  }, [clearMessages, setErrorMessage, setSuccessMessage]);

  return {
    isLoading,
    error,
    success,
    alertType,
    clearMessages,
    setErrorMessage,
    setSuccessMessage,
    createUser,
    getUserById,
    updateUser,
    deleteUser
  };
};

export default useUser;
