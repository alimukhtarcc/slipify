import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import GenerateSlip from "./pages/generateslip";
import LoginPage from "./pages/loginpage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/generate-slip" element={<GenerateSlip />} />
      </Routes>
    </Router>
  );
}

export default App;
