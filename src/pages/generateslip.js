import React, { useState } from 'react';
import api from '../api';
import Button from '../components/ui/button';
import DashboardLayout from '../components/layout/DashboardLayout';

function GenerateSlip() {
  const [message, setMessage] = useState('');

  const handleGenerate = async () => {
    try {
      const res = await api.post('/api/payroll/send', { payPeriod: '2025-10-01' });
      setMessage('Salary slip generation started successfully!');
      console.log(res.data);
    } catch (error) {
      console.error(error);
      setMessage('Error starting salary slip generation.');
    }
  };

  return (
    <DashboardLayout>
      <div className="p-6">
        <h2 className="text-2xl font-semibold mb-4">Generate Salary Slips</h2>
        <Button label="Generate Slip" onClick={handleGenerate} type="primary" />
        {message && <p className="mt-4 text-sm text-gray-700">{message}</p>}
      </div>
    </DashboardLayout>
  );
}

export default GenerateSlip;
