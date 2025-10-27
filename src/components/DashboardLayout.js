import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png'; // adjust path if needed

const DashboardLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-neutral-100 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-6 hidden md:block">
        <div className="flex items-center gap-3 mb-8">
          <img src={logo} alt="Slipify Logo" className="w-10 h-10 object-contain" />
          <div>
            <h2 className="text-xl font-semibold">Slipify</h2>
            <p className="text-sm text-neutral-500">Payslip Management</p>
          </div>
        </div>

        <nav className="flex flex-col gap-2">
          <Link to="/generate-slip" className="px-3 py-2 rounded-md hover:bg-neutral-100">Generate Slip</Link>
          <a href="#" className="px-3 py-2 rounded-md hover:bg-neutral-100">Schedule</a>
          <a href="#" className="px-3 py-2 rounded-md hover:bg-neutral-100">Audit Logs</a>
          <a href="#" className="px-3 py-2 rounded-md hover:bg-neutral-100">Employees</a>
          <a href="#" className="px-3 py-2 rounded-md hover:bg-neutral-100">Settings</a>
        </nav>

        <div className="mt-6 text-xs text-neutral-500">
          <p className="mb-2">Formalities</p>
          <ul className="list-disc pl-5">
            <li>Do not share salary PDFs publicly.</li>
            <li>Verify employee emails before sending.</li>
            <li>Keep schedule timezone consistent.</li>
          </ul>
        </div>
      </aside>

      {/* Main area */}
      <div className="flex-1">
        {/* Topbar */}
        <header className="bg-white shadow-sm px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={logo} alt="Slipify" className="w-8 h-8 object-contain" />
            <h1 className="text-lg font-semibold">Slipify Dashboard</h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-neutral-600">Admin</span>
            <button
              onClick={() => { /* provide real logout */ }}
              className="px-3 py-1 border rounded-md text-sm"
            >
              Logout
            </button>
          </div>
        </header>

        {/* Content */}
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
