import logo from '../assets/logo.png';
import Button from '../components/Button';
import PageLayout from '../components/layout/PageLayout';
import Card from '../components/layout/Card';
import Header from '../components/layout/Header';
import Alert from '../components/ui/Alert';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ALERT_TYPES } from '../domain/types';
import { employeeService } from '../services';

function EmployeeExcelUpload() {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [alertType, setAlertType] = useState(ALERT_TYPES.INFO);

  const clearMessages = () => {
    setError('');
    setSuccess('');
  };

  const setErrorMessage = (message) => {
    setError(message);
    setSuccess('');
    setAlertType(ALERT_TYPES.ERROR);
  };

  const setSuccessMessage = (message) => {
    setSuccess(message);
    setError('');
    setAlertType(ALERT_TYPES.SUCCESS);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check if file is an Excel file
      const validExtensions = ['.xlsx', '.xls', '.csv'];
      const fileExtension = '.' + file.name.split('.').pop().toLowerCase();
      
      if (validExtensions.includes(fileExtension)) {
        setSelectedFile(file);
        clearMessages();
      } else {
        setErrorMessage('Please select a valid Excel file (.xlsx, .xls, or .csv)');
        setSelectedFile(null);
      }
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setErrorMessage('Please select a file to upload');
      return;
    }

    clearMessages();
    setIsLoading(true);

    try {
      const result = await employeeService.uploadEmployees(selectedFile);
      
      if (result.success) {
        setSuccessMessage(result.message || 'File uploaded successfully!');
        console.log('Upload response:', result.data);
        // Optionally reset the file input after successful upload
        setSelectedFile(null);
      } else {
        setErrorMessage(result.error || result.message || 'Failed to upload file');
      }
    } catch (err) {
      setErrorMessage(err.message || 'An error occurred while uploading the file');
      console.error('Upload error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    // In a real app, you would clear authentication state here
    navigate('/login');
  };

  return (
    <PageLayout>
      <Card className="w-4/5 max-w-3xl">
        <div className="flex justify-between items-center mb-6">
          <Header
            logo={logo}
            title="Upload Employee Data"
            subtitle="Slipify"
            description="Upload Excel file with employee information"
            additionalDescription="Select an Excel file (.xlsx, .xls, or .csv) to upload employee data"
          />
          <button
            onClick={handleLogout}
            className="text-red-600 hover:text-red-800 font-semibold"
          >
            Logout
          </button>
        </div>

        <div className="space-y-6">
          {/* Error and Success Messages */}
          {(error || success) && (
            <Alert
              type={alertType}
              message={error || success}
              onClose={clearMessages}
            />
          )}

          {/* File Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Excel File
            </label>
            <div className="flex gap-4">
              <input
                type="file"
                accept=".xlsx,.xls,.csv"
                onChange={handleFileChange}
                className="block w-full text-sm text-gray-500
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
              <p className="mt-2 text-sm text-green-600">
                Selected file: {selectedFile.name}
              </p>
            )}
          </div>

          {/* Upload Button */}
          <div className="flex gap-4">
            <Button 
              label={isLoading ? "Uploading..." : "Upload File"} 
              onClick={handleUpload} 
              type="primary"
              disabled={isLoading || !selectedFile}
            />
          </div>

          {/* File Format Info */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-semibold text-blue-900 mb-2">Expected Excel Format:</h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Columns: Employee ID, First Name, Last Name, Email, Department, Position</li>
              <li>• First row should be headers</li>
              <li>• Supported formats: .xlsx, .xls, .csv</li>
            </ul>
          </div>
        </div>
      </Card>
    </PageLayout>
  );
}

export default EmployeeExcelUpload;

