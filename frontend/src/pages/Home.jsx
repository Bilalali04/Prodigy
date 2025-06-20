import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Tasks from '../components/Tasks';
import MainLayout from '../layouts/MainLayout';
import { motion } from 'framer-motion';

const Home = () => {
  const { isLoggedIn, user } = useSelector(state => state.authReducer);

  useEffect(() => {
    document.title = isLoggedIn ? `${user.name}'s tasks` : 'Task Manager';
  }, [isLoggedIn, user]);

  return (
    <MainLayout>
      {!isLoggedIn ? (
        <section className="relative bg-platinum text-dark-brown min-h-screen flex flex-col items-center justify-center text-center px-4">
          <motion.div
            className="absolute top-6 right-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            <Link
              to="/signup"
              className="inline-block bg-dark-brown text-platinum font-semibold tracking-wide px-6 py-3 rounded-xl shadow-lg hover:bg-opacity-80 transition duration-300"
            >
              Join Prodigy
            </Link>
          </motion.div>

          <motion.div
            className="text-left w-full max-w-xl"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="md:text-6xl font-bold leading-tight">
              Prodigy
            </h1>
            <h1 className="md:text-6xl font-bold leading-tight">
              Stay organized.
            </h1>
            <h1 className="md:text-6xl font-bold leading-tight mb-6">
              Boost productivity.
            </h1>
            <motion.p
              className="text-lg text-mocha font-light max-w-xl mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              A minimalist task manager to help simplify your daily life.
            </motion.p>
          </motion.div>

        </section>
      ) : (
        <section className="p-6 md:p-10">
          <motion.h1
            className="text-3xl font-bold mb-6 text-dark-brown text-center"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            Hello, {user.name}!
          </motion.h1>
          <Tasks />
        </section>
      )}
    </MainLayout>
  );
};

export default Home;
