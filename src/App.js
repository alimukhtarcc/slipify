import './App.css';
import logo from './assets/logo.png';
import Button from './components/Button';

function App() {
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
          <form className='flex flex-col mt-6 gap-6'>
            {/* Email */}
            <div className='w-full'>
              <label htmlFor="Email" className="block text-sm/6 font-medium text-neutral-500">
                Email
              </label>
              <input
                id="Email"
                name="Email"
                type="text"
                placeholder="example@gmail.com"
                className="w-full bg-neutral-100 rounded-md block min-w-0 grow p-2 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
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
                  placeholder="Hassan"
                  className="w-full bg-neutral-100 rounded-md block min-w-0 grow p-2 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
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
                  placeholder="Abdullah"
                  className="w-full bg-neutral-100 rounded-md block min-w-0 grow p-2 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
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
                  placeholder="*********"
                  className="w-full bg-neutral-100 rounded-md block min-w-0 grow p-2 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
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
                  placeholder="*********"
                  className="w-full bg-neutral-100 rounded-md block min-w-0 grow p-2 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                />
              </div>
            </div>
            <Button label="Create Account" onclick={()=>alert("Hello")} type='secondary'/>    
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
