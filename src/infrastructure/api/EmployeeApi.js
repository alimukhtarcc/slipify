/**
 * Employee API Service
 * Handles all employee-related API operations including file uploads
 */

import { API_ENDPOINTS } from '../../domain/types';

class EmployeeApi {
  /**
   * Uploads employee data as JSON array (already parsed from Excel/CSV)
   * @param {Array<Object>} employees - Normalized employee objects
   * @returns {Promise<Object>} API response
   */
  async uploadEmployees(employees) {
    const baseUrl = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080';
    const apiUrl = `${baseUrl}${API_ENDPOINTS.generate_salary}`;

    console.log('Posting employee JSON to:', apiUrl);

    try {
      const postOne = async (payload) => {
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });

        const contentType = response.headers.get('content-type');
        const isJson = contentType && contentType.includes('application/json');
        const data = isJson ? await response.json() : await response.text();

        if (!response.ok) {
          throw new Error(typeof data === 'string' ? data : (data?.message || `HTTP ${response.status}: ${response.statusText}`));
        }
        return data;
      };

      if (Array.isArray(employees)) {
        const results = await Promise.allSettled(employees.map((e) => postOne(e)));
        const successes = results.filter((r) => r.status === 'fulfilled').length;
        const failures = results.filter((r) => r.status === 'rejected');
        return {
          success: failures.length === 0,
          data: {
            successes,
            failures: failures.map((f) => f.reason?.message || String(f.reason))
          },
          message: failures.length === 0 ? 'All records uploaded successfully' : `Uploaded ${successes} record(s) with ${failures.length} failure(s)`
        };
      } else {
        const data = await postOne(employees);
        return {
          success: true,
          data,
          message: 'Record uploaded successfully'
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

