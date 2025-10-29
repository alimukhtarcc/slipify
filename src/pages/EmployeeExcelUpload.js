import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';

import Button from '../components/Button';
import PageLayout from '../components/layout/PageLayout';
import Card from '../components/layout/Card';
import Header from '../components/layout/Header';
import Alert from '../components/ui/Alert';

import { ALERT_TYPES } from '../domain/types';
import { employeeService } from '../services';

// ✅ Utility: Valid Excel extensions
const VALID_EXTENSIONS = ['.xlsx', '.xls', '.csv'];

function EmployeeExcelUpload() {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState({ message: '', type: ALERT_TYPES.INFO });

  // ---- Helper Functions ----
  const clearAlert = () => setAlert({ message: '', type: ALERT_TYPES.INFO });

  const showAlert = (message, type = ALERT_TYPES.INFO) => {
    setAlert({ message, type });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const extension = '.' + file.name.split('.').pop().toLowerCase();
    if (VALID_EXTENSIONS.includes(extension)) {
      setSelectedFile(file);
      clearAlert();
    } else {
      showAlert('❌ Please select a valid Excel file (.xlsx, .xls, or .csv)', ALERT_TYPES.ERROR);
      setSelectedFile(null);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      showAlert('⚠️ Please select a file to upload', ALERT_TYPES.ERROR);
      return;
    }

    clearAlert();
    setIsLoading(true);

    try {
      const result = await employeeService.uploadEmployees(selectedFile);

      if (result.success) {
        showAlert(result.message || '✅ File uploaded successfully!', ALERT_TYPES.SUCCESS);
        console.log('Upload response:', result.data);
        setSelectedFile(null);
      } else {
        showAlert(result.error || result.message || '❌ Failed to upload file', ALERT_TYPES.ERROR);
      }
    } catch (err) {
      showAlert(err.message || '❌ An error occurred during upload', ALERT_TYPES.ERROR);
      console.error('Upload error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    navigate('/login');
  };

  // ---- UI Render ----
  return (
    <PageLayout>
      <Card className="w-4/5 max-w-3xl shadow-lg transition-all duration-300 hover:shadow-xl">
        <div className="flex justify-between items-center mb-6">
          <Header
            logo={logo}
            title=" Upload Employee Data"
            subtitle="Slipify HR Portal"
            description="Easily upload and manage your employee records with one click."
            additionalDescription="Select an Excel file (.xlsx, .xls, or .csv) to import employee information."
          />
          <button
            onClick={handleLogout}
            className="text-red-600 hover:text-red-800 font-semibold transition-all"
          >
            Logout
          </button>
        </div>

        <div className="space-y-6">
          {/* Alerts */}
          {alert.message && (
            <Alert
              type={alert.type}
              message={alert.message}
              onClose={clearAlert}
            />
          )}

          {/* File Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Excel File
            </label>
            <div className="flex gap-4">
              <input
                type="file"
                accept=".xlsx,.xls,.csv"
                onChange={handleFileChange}
                className="block w-full text-sm text-gray-700
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-lg file:border-0
                  file:text-sm file:font-semibold
                  file:bg-blue-50 file:text-blue-700
                  hover:file:bg-blue-100
                  cursor-pointer"
                disabled={isLoading}
              />
            </div>
            {selectedFile && (
              <p className="mt-2 text-sm text-green-600 font-medium">
                ✅ Selected: {selectedFile.name}
              </p>
            )}
          </div>

          {/* Upload Button */}
          <div className="flex gap-4">
            <Button
              label={
                isLoading ? (
                  <span className="flex items-center gap-2">
                    <svg
                      className="animate-spin h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                      ></path>
                    </svg>
                    Uploading...
                  </span>
                ) : (
                  'Upload File'
                )
              }
              onClick={handleUpload}
              type="primary"
              disabled={isLoading || !selectedFile}
            />
          </div>

          {/* Format Guide */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 transition-all hover:bg-blue-100">
            <h3 className="font-semibold text-blue-900 mb-2">📘 Expected Excel Format:</h3>
            <ul className="text-sm text-blue-800 space-y-1 list-disc ml-4">
              <li>employeeId</li>
              <li>employeeName</li>
              <li>designation</li>
              <li>emailId</li>
              <li>accountNumber</li>
              <li>salary</li>
            </ul>
            <p className="mt-2 text-xs text-blue-700">• First row should contain headers.</p>
          </div>
        </div>
      </Card>
    </PageLayout>
  );
}

export default EmployeeExcelUpload;
