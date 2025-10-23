import { useState } from 'react';
import logo from '../assets/logo.png';
import Button from '../components/Button';

function EmployeeSignup() {
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    // Basic validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    if (!formData.email || !formData.firstName || !formData.lastName || !formData.password) {
      setError('Please fill in all fields');
      setIsLoading(false);
      return;
    }

    try {
      console.log('Environment variable REACT_APP_API_BASE_URL:', process.env.REACT_APP_API_BASE_URL);
      console.log('All environment variables:', process.env);
      const baseUrl = process.env.REACT_APP_API_BASE_URL;
      const apiUrl = `${baseUrl}user/create`;
      console.log('Making API call to:', apiUrl);
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          firstName: formData.firstName,
          lastName: formData.lastName,
          password: formData.password
        })
      });

      if (response.ok) {
        setSuccess('Account created successfully!');
        setFormData({
          email: '',
          firstName: '',
          lastName: '',
          password: '',
          confirmPassword: ''
        });
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Failed to create account');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className='bg-neutral-100 min-h-screen flex flex-col justify-center items-center'>
      <div className='bg-white w-2/6 rounded-xl p-8 shadow-sm'>
        <div className='flex justify-center items-center gap-2'>
          <img src={logo} alt="Logo" />
          <h1 className='text-3xl'>
            Slipify
          </h1>
        </div>
        <div className='text-center'>
          <p className='text-xl mt-3'>
            Welcome to
          </p>
          <p className='text-xl mt-3 font-medium'>
            Payslip Management System
          </p>
          <p className='mt-3'>
            Enter your information below to continue
          </p>
        </div>

        {/* form */}
        <div>
          <form onSubmit={handleSubmit} className='flex flex-col mt-6 gap-6'>
            {/* Error and Success Messages */}
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                {error}
              </div>
            )}
            {success && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
                {success}
              </div>
            )}

            {/* Email */}
            <div className='w-full'>
              <label htmlFor="email" className="block text-sm/6 font-medium text-neutral-500">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="example@gmail.com"
                className="w-full bg-neutral-100 rounded-md block min-w-0 grow p-2 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                required
              />
            </div>

            {/* First & Last name */}
            <div className='flex gap-6'>

              <div className='w-full'>
                <label htmlFor="firstName" className="block text-sm/6 font-medium text-neutral-500">
                  First Name
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  placeholder="Hassan"
                  className="w-full bg-neutral-100 rounded-md block min-w-0 grow p-2 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                  required
                />
              </div>

              <div className='w-full'>
                <label htmlFor="lastName" className="block text-sm/6 font-medium text-neutral-500">
                  Last Name
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  placeholder="Abdullah"
                  className="w-full bg-neutral-100 rounded-md block min-w-0 grow p-2 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                  required
                />
              </div>
            </div>

            {/* Password fields */}
            <div className='flex gap-6'>

              <div className='w-full'>
                <label htmlFor="password" className="block text-sm/6 font-medium text-neutral-500">
                  Create Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="*********"
                  className="w-full bg-neutral-100 rounded-md block min-w-0 grow p-2 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                  required
                />
              </div>

              <div className='w-full'>
                <label htmlFor="confirmPassword" className="block text-sm/6 font-medium text-neutral-500">
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="*********"
                  className="w-full bg-neutral-100 rounded-md block min-w-0 grow p-2 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                  required
                />
              </div>
            </div>
            <Button 
              label={isLoading ? "Creating Account..." : "Create Account"} 
              onClick={handleSubmit} 
              type='secondary'
              disabled={isLoading}
            />    
          </form>
        </div>
      </div>
    </div>
  );
}

export default EmployeeSignup;
