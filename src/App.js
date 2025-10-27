import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import EmployeeSignup from './pages/EmployeeSignup';
import Login from './pages/Login';
import EmployeeExcelUpload from './pages/EmployeeExcelUpload';

function App() {
  console.log('App loaded - REACT_APP_API_BASE_URL:', process.env.REACT_APP_API_BASE_URL);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/employees/create" element={<EmployeeSignup />} />
        <Route path="/employees/upload" element={<EmployeeExcelUpload />} />
      </Routes>
    </Router>
  );
}

export default App;
