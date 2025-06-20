import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import validateManyFields from '../validations';
import Input from './utils/Input';
import Loader from './utils/Loader';

const SignupForm = () => {
  const [formErrors, setFormErrors] = useState({});
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const [fetchData, { loading }] = useFetch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateManyFields('signup', formData);
    setFormErrors({});

    if (errors.length > 0) {
      setFormErrors(errors.reduce((total, ob) => ({ ...total, [ob.field]: ob.err }), {}));
      return;
    }

    const config = { url: '/auth/signup', method: 'post', data: formData };
    fetchData(config).then(() => {
      navigate('/login');
    });
  };

  const fieldError = (field) => (
    <p className={`mt-1 text-sm text-red-500 flex items-center gap-2 ${formErrors[field] ? 'block' : 'hidden'}`}>
      <i className='fa-solid fa-circle-exclamation'></i>
      {formErrors[field]}
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
            <h2 className="text-2xl font-semibold text-center text-dark-brown mb-6">
              Create your Prodigy account
            </h2>

            <div className="mb-5">
              <label
                htmlFor="name"
                className="block text-sm font-medium-light text-mocha mb-1"
              >
                Username
              </label>
              <Input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                placeholder="jimmy123"
                onChange={handleChange}
              />
              {fieldError('name')}
            </div>

            <div className="mb-5">
              <label
                htmlFor="email"
                className="block text-sm font-medium-light text-mocha mb-1"
              >
                Email
              </label>
              <Input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                placeholder="you@email.com"
                onChange={handleChange}
              />
              {fieldError('email')}
            </div>

            <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-sm font-medium-light text-mocha mb-1"
              >
                Password
              </label>
              <Input
                type="password"
                name="password"
                id="password"
                value={formData.password}
                placeholder="••••••"
                onChange={handleChange}
              />
              {fieldError('password')}
            </div>

            <button
              type="submit"
              className="w-full py-2 px-4 text-white font-semibold bg-mocha hover:bg-dark-brown transition-colors duration-200 rounded-lg shadow-sm"
            >
              Sign up
            </button>

            <p className="text-sm text-center mt-6 text-mocha">
              Already have an account?{' '}
              <Link to="/login" className="text-dark-brown hover:underline">
                Log in here
              </Link>
            </p>
          </>
        )}
      </form>
    </div>
  );
};

export default SignupForm;
