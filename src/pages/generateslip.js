import React, { useState } from 'react';
import api from '../api';
import Button from '../components/ui/button';
import DashboardLayout from '../components/layout/DashboardLayout';

function GenerateSlip() {
  const [message, setMessage] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  const handleGenerate = async () => {
    try {
      const res = await api.post('/api/salary/send-all-slips', { payPeriod: '2025-10-01' });
      setMessage('✅ Salary slips generated and emails sent successfully!');
      setShowPopup(true);
      console.log(res.data);
    } catch (error) {
      console.error(error);
      setMessage('❌ Error while generating salary slips.');
      setShowPopup(true);
    }
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <DashboardLayout>
      <div className="p-6">
        <h2 className="text-2xl font-semibold mb-4">Generate Salary Slips</h2>
        <Button label="Generate Slip" onClick={handleGenerate} type="primary" />

        {/* Popup Modal */}
        {showPopup && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-2xl shadow-lg p-6 w-[350px] text-center">
              <h3 className="text-lg font-semibold mb-2">Notification</h3>
              <p className="text-gray-700 mb-4">{message}</p>
              <button
                onClick={closePopup}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                OK
              </button>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

export default GenerateSlip;

