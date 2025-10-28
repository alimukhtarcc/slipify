/**
 * Custom hook for form management
 * Handles form state, validation, and submission
 */

import { useState, useCallback } from 'react';

const useForm = (initialValues = {}, options = {}) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Future validation options (currently not implemented)
  // const {
  //   validateOnChange = true,
  //   validateOnBlur = true,
  //   validateOnSubmit = true
  // } = options;

  /**
   * Updates form field value
   * @param {string} name - Field name
   * @param {*} value - Field value
   */
  const setValue = useCallback((name, value) => {
    setValues(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  }, [errors]);

  /**
   * Handles input change events
   * @param {Event} event - Input change event
   */
  const handleChange = useCallback((event) => {
    const { name, value, type, checked } = event.target;
    const fieldValue = type === 'checkbox' ? checked : value;
    
    setValue(name, fieldValue);
  }, [setValue]);

  /**
   * Handles input blur events
   * @param {Event} event - Input blur event
   */
  const handleBlur = useCallback((event) => {
    const { name } = event.target;
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));
  }, []);

  /**
   * Sets field error
   * @param {string} name - Field name
   * @param {string} error - Error message
   */
  const setError = useCallback((name, error) => {
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  }, []);

  /**
   * Sets multiple field errors
   * @param {Object} errorsObj - Object with field errors
   */
  const setMultipleErrors = useCallback((errorsObj) => {
    setErrors(prev => ({
      ...prev,
      ...errorsObj
    }));
  }, []);

  /**
   * Clears all form errors
   */
  const clearErrors = useCallback(() => {
    setErrors({});
  }, []);

  /**
   * Resets form to initial values
   */
  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
    setIsSubmitting(false);
  }, [initialValues]);

  /**
   * Sets form as submitting
   * @param {boolean} submitting - Submitting state
   */
  const setSubmitting = useCallback((submitting) => {
    setIsSubmitting(submitting);
  }, []);

  /**
   * Gets field error
   * @param {string} name - Field name
   * @returns {string|null} Field error
   */
  const getFieldError = useCallback((name) => {
    return errors[name] || null;
  }, [errors]);

  /**
   * Checks if field has been touched
   * @param {string} name - Field name
   * @returns {boolean} Touched state
   */
  const isFieldTouched = useCallback((name) => {
    return touched[name] || false;
  }, [touched]);

  /**
   * Checks if form has errors
   * @returns {boolean} Has errors
   */
  const hasErrors = useCallback(() => {
    return Object.values(errors).some(error => error !== null);
  }, [errors]);

  /**
   * Checks if form is valid
   * @returns {boolean} Is valid
   */
  const isValid = useCallback(() => {
    return !hasErrors() && Object.values(values).every(value => 
      value !== null && value !== undefined && value !== ''
    );
  }, [hasErrors, values]);

  return {
    values,
    errors,
    touched,
    isSubmitting,
    setValue,
    handleChange,
    handleBlur,
    setError,
    setMultipleErrors,
    clearErrors,
    reset,
    setSubmitting,
    getFieldError,
    isFieldTouched,
    hasErrors,
    isValid
  };
};

export default useForm;
