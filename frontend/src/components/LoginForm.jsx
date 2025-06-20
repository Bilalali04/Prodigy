import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { postLoginData } from '../redux/actions/authActions';
import validateManyFields from '../validations';
import Input from './utils/Input';
import Loader from './utils/Loader';

const LoginForm = ({ redirectUrl }) => {
  const [formErrors, setFormErrors] = useState({});
  const [formData, setFormData] = useState({ email: "", password: "" });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, isLoggedIn } = useSelector(state => state.authReducer);

  useEffect(() => {
    if (isLoggedIn) navigate(redirectUrl || "/");
  }, [isLoggedIn, navigate, redirectUrl]);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setFormErrors(prev => ({ ...prev, [e.target.name]: "" })); // Clear field error on change
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateManyFields("login", formData);
    if (errors.length > 0) {
      const errObj = errors.reduce((acc, { field, err }) => ({ ...acc, [field]: err }), {});
      setFormErrors(errObj);
      return;
    }
    dispatch(postLoginData(formData.email, formData.password));
  };

  const renderError = (field) =>
    formErrors[field] && (
      <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
        <i className="fa-solid fa-circle-exclamation"></i> {formErrors[field]}
      </p>
    );

  return (
    <div className="flex items-center justify-center min-h-screen bg-platinum px-4">
      <form
        className="w-full max-w-md px-4"
        onSubmit={handleSubmit}
      >
        {loading ? (
          <Loader />
        ) : (
          <>
            <h2 className="text-2xl font-semibold text-center mb-6 text-dark-brown">
              Log in to your Prodigy account
            </h2>

            <div className="mb-5">
              <label htmlFor="email" className="block text-sm font-medium-light text-mocha mb-1">
                Email 
              </label>
              <Input
                type="text"
                id="email"
                name="email"
                value={formData.email}
                placeholder="you@email.com"
                onChange={handleChange}
              />
              {renderError("email")}
            </div>

            <div className="mb-6">
              <label htmlFor="password" className="block text-sm font-medium-light text-mocha mb-1">
                Password 
              </label>
              <Input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                placeholder="••••••"
                onChange={handleChange}
              />
              {renderError("password")}
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2 px-4 text-white font-semibold rounded-md transition ${
                loading
                  ? 'bg-mocha cursor-not-allowed'
                  : 'bg-mocha hover:bg-dark-brown'
              }`}
            >
              Log in
            </button>

            <p className="mt-6 text-center text-sm text-mocha">
              Don’t have an account?{' '}
              <Link to="/signup" className="text-dark-brown hover:underline">
                Sign up here
              </Link>
            </p>
          </>
        )}
      </form>
    </div>
  );
};

export default LoginForm;
