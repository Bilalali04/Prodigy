import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../redux/actions/authActions';

const Navbar = () => {
  const { isLoggedIn } = useSelector(state => state.authReducer);
  const dispatch = useDispatch();
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);

  const toggleNavbar = () => setIsNavbarOpen(!isNavbarOpen);
  const handleLogoutClick = () => {
    dispatch(logout());
    setIsNavbarOpen(false);
  };

  return (
    <>
      <header className='sticky top-0 z-50 bg-platinum shadow-sm px-4 md:px-8 py-3 flex items-center justify-between'>
        <Link to="/" className='text-4xl font-bold tracking-wide text-dark-brown hover:text-taupe transition'>
          P.
        </Link>

        {/* Desktop Nav */}
        <nav className='hidden md:flex items-center gap-6 text-sm font-medium'>
          {isLoggedIn ? (
            <>
              <Link
                to='/tasks/add'
              >
                
              </Link>
              <button
                onClick={handleLogoutClick}
                className='text-xl font-semibold text-mocha hover:text-taupe transition'
              >
                Log out
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className='text-xl font-semibold text-mocha hover:text-taupe transition'
            >
              Log in
            </Link>
          )}
        </nav>

        {/* Mobile Menu Toggle */}
        <button className='md:hidden text-2xl text-dark-brown' onClick={toggleNavbar}>
          <i className="fa-solid fa-bars"></i>
        </button>

        {/* Mobile Sidebar */}
        <div className={`fixed inset-0 z-40 transition-transform duration-300 ${isNavbarOpen ? 'translate-x-0' : 'translate-x-full'} md:hidden`}>
          {/* Backdrop */}
          <div
            className='absolute inset-0 bg-black bg-opacity-50'
            onClick={toggleNavbar}
          ></div>

          {/* Sidebar Content */}
          <div className='absolute top-0 right-0 w-72 h-full bg-white shadow-lg px-6 py-6 flex flex-col'>
            <div className='flex justify-between items-center mb-6'>
              <h2 className='text-xl font-bold text-dark-brown'>Menu</h2>
              <button onClick={toggleNavbar}>
                <i className="fa-solid fa-xmark text-xl text-gray-600"></i>
              </button>
            </div>
            <nav className='flex flex-col gap-4 text-sm font-medium'>
              {isLoggedIn ? (
                <>
                  <Link
                    to='/tasks/add'
                    className='bg-dark-brown text-white px-4 py-2 rounded-lg text-center hover:bg-dark-brown transition'
                    onClick={toggleNavbar}
                  >
                    <i className="fa-solid fa-plus mr-1"></i> Add Task
                  </Link>
                  <button
                    onClick={handleLogoutClick}
                    className='text-left px-4 py-2 text-gray-700 hover:text-dark-brown transition'
                  >
                    Log out
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  className='text-dark-brown hover:underline text-center'
                  onClick={toggleNavbar}
                >
                  Log in
                </Link>
              )}
            </nav>
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;
