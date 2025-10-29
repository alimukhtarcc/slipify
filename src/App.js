import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import EmployeeSignup from './pages/EmployeeSignup';
import SignUP from './pages/signup';      // Make sure you have this file
import GenerateSlip from './pages/generateslip'; // Make sure you have this file

function App() {
    console.log('App loaded - REACT_APP_API_BASE_URL:', process.env.REACT_APP_API_BASE_URL);

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navigate to="/employees/create" replace />} />
                <Route path="/employees/create" element={<EmployeeSignup />} />
                <Route path="/signup" element={<SignUP />} />
                <Route path="/generate-slip" element={<GenerateSlip />} />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </Router>
    );
}

export default App;
