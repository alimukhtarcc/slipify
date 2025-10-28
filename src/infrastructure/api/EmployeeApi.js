/**
 * Employee API Service
 * Handles all employee-related API operations including file uploads
 */

import { API_ENDPOINTS } from '../../domain/types';

class EmployeeApi {
  /**
   * Uploads employee data from an Excel file
   * @param {File} file - Excel file to upload
   * @returns {Promise<Object>} API response
   */
  async uploadEmployees(file) {
    const formData = new FormData();
    formData.append('file', file);

    const baseUrl = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080';
    const apiUrl = `${baseUrl}${API_ENDPOINTS.generate_salary}`;

    console.log('Uploading file to:', apiUrl);

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ file: formData }),
      });

      const contentType = response.headers.get('content-type');
      const isJson = contentType && contentType.includes('application/json');

      let data;
      try {
        data = isJson ? await response.json() : await response.text();
      } catch (error) {
        data = null;
      }

      if (response.ok) {
        return {
          success: true,
          data: data,
          message: data?.message || 'File uploaded successfully'
        };
      } else {
        return {
          success: false,
          error: data?.message || data || `HTTP ${response.status}: ${response.statusText}`,
          message: 'File upload failed'
        };
      }
    } catch (error) {
      console.error('Upload error:', error);
      return {
        success: false,
        error: error.message || 'An error occurred while uploading the file',
        message: 'File upload failed'
      };
    }
  }
}

// Export singleton instance
export const employeeApi = new EmployeeApi();
export default employeeApi;

