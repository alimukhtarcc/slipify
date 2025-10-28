import './App.css';
import logo from './assets/logo.png';
import LogIn from './login';       

function LogIn() {
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
                        Please log in to continue
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
                                placeholder="example@gmail>com"
                                className="w-full bg-neutral-100 rounded-md block min-w-0 grow p-2 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                            />
                        </div>
                        <div className='w-full'>
                            <label htmlFor="password" className="block text-sm/6 font-medium text-neutral-500">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                placeholder="Enter your password"
                                className="w-full bg-neutral-100 rounded-md block min-w-0 grow p-2 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                            />
                        </div>  
                        <button
                            type="submit"
                         className="mt-4 w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                            />
                        <button className='bg-primary-400 p-2 rounded-md text-white'>Log In</button>
          </form>
        </div>
      </div>