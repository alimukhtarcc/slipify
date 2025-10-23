import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import EmployeeSignup from './pages/EmployeeSignup';

function App() {
  console.log('App loaded - REACT_APP_API_BASE_URL:', process.env.REACT_APP_API_BASE_URL);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/employees/create" replace />} />
        <Route path="/employees/create" element={<EmployeeSignup />} />
      </Routes>
    </Router>
  );
}

export default App;
