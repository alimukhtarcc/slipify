/**
 * Custom hook for user form management
 * Combines form state with user operations
 */

import { useCallback } from 'react';
import useForm from './useForm';
import useUser from './useUser';
import { FORM_FIELDS } from '../domain/types';

const useUserForm = (initialValues = {}) => {
  const form = useForm(initialValues);
  const user = useUser();

  /**
   * Handles form submission
   * @param {Event} event - Form submit event
   */
  const handleSubmit = useCallback(async (event) => {
    event.preventDefault();
    
    // Clear previous messages
    user.clearMessages();
    
    // Validate form
    if (!form.isValid()) {
      // Set errors for empty required fields
      const requiredFields = [FORM_FIELDS.EMAIL, FORM_FIELDS.FIRST_NAME, FORM_FIELDS.LAST_NAME, FORM_FIELDS.PASSWORD];
      const newErrors = {};
      
      requiredFields.forEach(field => {
        if (!form.values[field]) {
          newErrors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
        }
      });
      
      if (form.values[FORM_FIELDS.PASSWORD] && form.values[FORM_FIELDS.CONFIRM_PASSWORD] && 
          form.values[FORM_FIELDS.PASSWORD] !== form.values[FORM_FIELDS.CONFIRM_PASSWORD]) {
        newErrors[FORM_FIELDS.CONFIRM_PASSWORD] = 'Passwords do not match';
      }
      
      form.setMultipleErrors(newErrors);
      return;
    }

    // Create user
    const result = await user.createUser(form.values);
    
    if (result.success) {
      // Reset form on success
      form.reset();
    } else if (result.validationErrors) {
      // Set validation errors
      const newErrors = {};
      result.validationErrors.forEach(error => {
        // Try to match error to field
        if (error.includes('email')) {
          newErrors[FORM_FIELDS.EMAIL] = error;
        } else if (error.includes('first name') || error.includes('firstName')) {
          newErrors[FORM_FIELDS.FIRST_NAME] = error;
        } else if (error.includes('last name') || error.includes('lastName')) {
          newErrors[FORM_FIELDS.LAST_NAME] = error;
        } else if (error.includes('password')) {
          newErrors[FORM_FIELDS.PASSWORD] = error;
        }
      });
      form.setMultipleErrors(newErrors);
    }
  }, [form, user]);

  return {
    ...form,
    ...user,
    handleSubmit
  };
};

export default useUserForm;
