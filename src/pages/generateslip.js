import React, { useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import Button from '../components/Button';

function GenerateSlip() {
  const [running, setRunning] = useState(false);
  const [message, setMessage] = useState(null);

  const handleClick = async () => {
    setRunning(true);
    setMessage(null);

    try {
      // TODO: call your backend API to trigger generation & sending.
      // Example:
      // await fetch('/api/payroll/send', { method: 'POST' });

      // simulate
      await new Promise(res => setTimeout(res, 1200));
      setMessage({ type: 'success', text: 'Salary slips generation started. Check audit logs for details.' });
    } catch (err) {
      setMessage({ type: 'error', text: 'Failed to start generation. See console for details.' });
      console.error(err);
    } finally {
      setRunning(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        {/* Intro card */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-2xl font-semibold mb-2">Distribute salary slips</h2>
          <p className="text-neutral-600">
            Use the button below to generate and send salary slips to all employees for the selected pay period.
            Make sure the payroll data and employee emails are correct.
          </p>
        </div>

        {/* Action card */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h3 className="text-lg font-medium">Generate & Send</h3>
            <p className="text-sm text-neutral-600">Click to generate PDF slips and send via email immediately.</p>
          </div>

          <div className="flex items-center gap-3">
            <Button
              label={running ? 'Processing...' : 'Generate Slip'}
              onClick={handleClick}
              type="primary"
            />
            <button
              className="text-sm underline text-neutral-600"
              onClick={() => alert('Open preview (implement)')}
            >
              Preview sample slip
            </button>
          </div>
        </div>

        {/* Formalities / Notes */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h4 className="font-semibold mb-2">Important — Formalities</h4>
          <ol className="list-decimal pl-5 text-neutral-600">
            <li>Ensure payroll month is selected correctly in the admin settings.</li>
            <li>Check that employee email addresses are verified before sending.</li>
            <li>For testing, send to a small test group first.</li>
            <li>Review audit logs if any failures occur and retry manually from the Audit page.</li>
          </ol>

          {message && (
            <div className={`mt-4 p-3 rounded ${message.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
              {message.text}
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}

export default GenerateSlip;
