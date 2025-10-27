import logo from '../assets/logo.png';
import Button from '../components/Button';
import PageLayout from '../components/layout/PageLayout';
import Card from '../components/layout/Card';
import Header from '../components/layout/Header';
import Form from '../components/ui/Form';
import FormField from '../components/ui/FormField';
import Alert from '../components/ui/Alert';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ALERT_TYPES } from '../domain/types';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    clearMessages();

    // Basic validation
    if (!email || !password) {
      setErrorMessage('Email and password are required');
      return;
    }

    setIsLoading(true);

    try {
      // In a real app, you would call an authentication API here
      // For now, simulate a successful login after a short delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulate successful login
      setSuccessMessage('Login successful! Redirecting...');
      
      // Redirect to upload page after 1 second
      setTimeout(() => {
        navigate('/employees/upload');
      }, 1000);
    } catch (err) {
      setErrorMessage(err.message || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageLayout>
      <Card className="w-2/6">
        <Header
          logo={logo}
          title="Slipify"
          subtitle="Welcome to"
          description="Payslip Management System"
          additionalDescription="Enter your credentials to continue"
        />

        <Form onSubmit={handleSubmit} className="mt-6">
          {/* Error and Success Messages */}
          {(error || success) && (
            <Alert
              type={alertType}
              message={error || success}
              onClose={clearMessages}
            />
          )}

          {/* Email */}
          <FormField
            id="email"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="example@gmail.com"
            label="Email"
            required
          />

          {/* Password */}
          <FormField
            id="password"
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="*********"
            label="Password"
            required
          />

          <Button 
            label={isLoading ? "Logging in..." : "Login"} 
            onClick={handleSubmit} 
            type="secondary"
            disabled={isLoading}
          />    
        </Form>
      </Card>
    </PageLayout>
  );
}

export default Login;

