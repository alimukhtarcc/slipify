/**
 * Employee Service
 * Application layer service that handles employee business logic
 */

import { employeeApi } from '../../infrastructure/api/EmployeeApi';
import ExelToJson from '../../services/ExelToJson';

class EmployeeService {
  /**
   * Uploads employee data from an Excel file
   * @param {File} file - Excel file containing employee data
   * @returns {Promise<Object>} Service response
   */
  async uploadEmployees(file) {
    try {
      // Validate file exists
      if (!file) {
        return {
          success: false,
          error: 'No file selected',
          message: 'Please select a file to upload'
        };
      }

      // Validate file type
      const validExtensions = ['.xlsx', '.xls', '.csv'];
      const fileExtension = '.' + file.name.split('.').pop().toLowerCase();
      
      if (!validExtensions.includes(fileExtension)) {
        return {
          success: false,
          error: 'Invalid file type',
          message: 'Please select a valid Excel file (.xlsx, .xls, or .csv)'
        };
      }

      // Validate file size (max 10MB)
      const maxFileSize = 10 * 1024 * 1024; // 10MB in bytes
      if (file.size > maxFileSize) {
        return {
          success: false,
          error: 'File too large',
          message: 'File size must be less than 10MB'
        };
      }

      // Convert file to normalized JSON payload
      const parser = new ExelToJson(file);
      const records = await parser.parseFile();

      if (!Array.isArray(records) || records.length === 0) {
        return {
          success: false,
          error: 'No valid rows found in file',
          message: 'The selected file does not contain any valid employee records'
        };
      }

      // Call API to upload normalized JSON
      const apiResponse = await employeeApi.uploadEmployees(records);
      
      return apiResponse;
    } catch (error) {
      return {
        success: false,
        error: error.message || 'An unexpected error occurred',
        message: 'Failed to upload employee data'
      };
    }
  }
}

// Export singleton instance
export const employeeService = new EmployeeService();
export default employeeService;

