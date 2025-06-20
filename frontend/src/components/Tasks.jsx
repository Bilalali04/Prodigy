import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import useFetch from '../hooks/useFetch';
import Loader from './utils/Loader';
import Tooltip from './utils/Tooltip';

const Tasks = () => {
  const authState = useSelector(state => state.authReducer);
  const [tasks, setTasks] = useState([]);
  const [fetchData, { loading }] = useFetch();

  const fetchTasks = useCallback(() => {
    const config = {
      url: "/tasks",
      method: "get",
      headers: { Authorization: authState.token }
    };
    fetchData(config, { showSuccessToast: false }).then(data => setTasks(data.tasks));
  }, [authState.token, fetchData]);

  useEffect(() => {
    if (!authState.isLoggedIn) return;
    fetchTasks();
  }, [authState.isLoggedIn, fetchTasks]);

  const handleDelete = (id) => {
    const config = {
      url: `/tasks/${id}`,
      method: "delete",
      headers: { Authorization: authState.token }
    };
    fetchData(config).then(() => fetchTasks());
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-5xl mx-auto my-10 px-4"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-dark-brown">
          {tasks.length ? `Your list of tasks` : "You don't have any tasks"}
        </h2>
        <Link
          to="/tasks/add"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary-dark transition-colors"
        >
          <i className="fa-solid fa-plus"></i>
          Add task
        </Link>
      </div>

      {loading ? (
        <Loader />
      ) : tasks.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64 text-mocha">
          <p className="mb-4 text-lg">All done!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {tasks.map((task) => (
              <motion.div
                key={task._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                whileHover={{ scale: 1.02 }}
                className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow min-h-[80px] flex flex-col justify-between"
              >
<div className="mb-2">
  <div className="flex items-center mb-1">
    <span className="text-base font-semibold text-gray-800">
      {task.name || "Untitled Task"}
    </span>
    <div className="ml-auto flex items-center gap-3">
      <Tooltip text="Edit task" position="top">
        <Link
          to={`/tasks/${task._id}`}
          className="text-green-600 hover:text-green-700 transition"
        >
          <i className="fa-solid fa-pen-to-square" />
        </Link>
      </Tooltip>

      <Tooltip text="Delete task" position="top">
        <button
          onClick={() => handleDelete(task._id)}
          className="text-red-500 hover:text-red-600 transition"
        >
          <i className="fa-solid fa-trash" />
        </button>
      </Tooltip>
    </div>
  </div>

  <p className="text-sm text-gray-600">{task.description}</p>
</div>

              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </motion.section>
  );
};

export default Tasks;
