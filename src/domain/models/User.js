/**
 * User domain model
 * Contains business logic and validation for user entities
 */
export class User {
  constructor({ email, firstName, lastName, password, id = null, createdAt = null }) {
    this.id = id;
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.password = password;
    this.createdAt = createdAt;
  }

  /**
   * Validates user data according to business rules
   * @returns {Object} Validation result with isValid and errors
   */
  validate() {
    const errors = [];

    if (!this.email || !this.isValidEmail(this.email)) {
      errors.push('Please provide a valid email address');
    }

    if (!this.firstName || this.firstName.trim().length < 2) {
      errors.push('First name must be at least 2 characters long');
    }

    if (!this.lastName || this.lastName.trim().length < 2) {
      errors.push('Last name must be at least 2 characters long');
    }

    if (!this.password || this.password.length < 6) {
      errors.push('Password must be at least 6 characters long');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  /**
   * Validates password confirmation
   * @param {string} confirmPassword 
   * @returns {Object} Validation result
   */
  validatePasswordConfirmation(confirmPassword) {
    if (this.password !== confirmPassword) {
      return {
        isValid: false,
        error: 'Passwords do not match'
      };
    }
    return { isValid: true };
  }

  /**
   * Basic email validation
   * @param {string} email 
   * @returns {boolean}
   */
  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  /**
   * Returns user data for API submission (excludes password)
   * @returns {Object}
   */
  toApiPayload() {
    return {
      email: this.email,
      firstName: this.firstName,
      lastName: this.lastName,
      password: this.password
    };
  }

  /**
   * Returns user display name
   * @returns {string}
   */
  getDisplayName() {
    return `${this.firstName} ${this.lastName}`.trim();
  }
}
