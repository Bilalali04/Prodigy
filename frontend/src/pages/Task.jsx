import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Textarea } from '../components/utils/Input';
import Loader from '../components/utils/Loader';
import useFetch from '../hooks/useFetch';
import MainLayout from '../layouts/MainLayout';
import validateManyFields from '../validations';
import { motion, AnimatePresence } from 'framer-motion';

const Task = () => {
  const authState = useSelector(state => state.authReducer);
  const navigate = useNavigate();
  const [fetchData, { loading }] = useFetch();
  const { taskId } = useParams();

  const mode = taskId === undefined ? "add" : "update";
  const [task, setTask] = useState(null);
  const [formData, setFormData] = useState({ name: "", description: "" });
  const [formErrors, setFormErrors] = useState({});
  const [inviteMode, setInviteMode] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteError, setInviteError] = useState("");

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.toLowerCase());

  const handleInvite = async () => {
    if (!validateEmail(inviteEmail)) {
      setInviteError("Please enter a valid email address");
      return;
    }
  
    setInviteError("");
  
    try {
      const config = {
        url: `/tasks/${taskId}/invite`,
        method: "post",
        headers: { Authorization: authState.token },
        data: { email: inviteEmail },
      };
  
      const result = await fetchData(config);
      if (result.success) {
        // Optional: show toast or confirmation
        console.log("Invitation sent to", inviteEmail);
        // Refresh task to reflect new invited user
        const refreshed = await fetchData({
          url: `/tasks/${taskId}`,
          method: "get",
          headers: { Authorization: authState.token },
        });
        setTask(refreshed.task);
      }
    } catch (err) {
      console.error("Failed to invite user:", err);
      setInviteError("Failed to send invite. Try again.");
    }
  
    setInviteMode(false);
    setInviteEmail("");
  };
  

  const handleCancelInvite = () => {
    setInviteMode(false);
    setInviteEmail("");
    setInviteError("");
  };

  useEffect(() => {
    document.title = mode === "add" ? "Add Task" : "Update Task";
  }, [mode]);

  useEffect(() => {
    if (mode === "update") {
      const config = { url: `/tasks/${taskId}`, method: "get", headers: { Authorization: authState.token } };
      fetchData(config, { showSuccessToast: false }).then((data) => {
        setTask(data.task);
        setFormData({ name: data.task.name || "", description: data.task.description });
      });
    }
  }, [mode, authState, taskId, fetchData]);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    const errors = validateManyFields("task", formData);
    setFormErrors({});

    if (errors.length > 0) {
      setFormErrors(errors.reduce((total, ob) => ({ ...total, [ob.field]: ob.err }), {}));
      return;
    }

    const config = {
      url: mode === "add" ? "/tasks" : `/tasks/${taskId}`,
      method: mode === "add" ? "post" : "put",
      data: formData,
      headers: { Authorization: authState.token }
    };

    fetchData(config).then(() => navigate("/"));
  };

  const fieldError = (field) => (
    <p className={`mt-1 text-red-500 text-sm transition-opacity duration-200 ${formErrors[field] ? "opacity-100" : "opacity-0"}`}>
      <i className='mr-2 fa-solid fa-circle-exclamation'></i>
      {formErrors[field]}
    </p>
  );

  return (
    <MainLayout>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="m-auto my-16 max-w-3xl bg-white p-8 border shadow-xl rounded-2xl"
      >
        {loading ? (
          <Loader />
        ) : (
          <>
            <motion.h2
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-2xl font-semibold text-left text-dark-brown mb-6"
            >
              {mode === "add" ? "Create a new task" : "Edit a task"}
            </motion.h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                  Task Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  placeholder="Enter a task title..."
                  onChange={handleChange}
                  className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
                {fieldError("name")}
              </div>

              <div>
                <label htmlFor="description" className="block text-gray-700 font-medium mb-2">
                  Task Description
                </label>
                <Textarea
                  name="description"
                  id="description"
                  value={formData.description}
                  placeholder="Write description here..."
                  onChange={handleChange}
                  className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
                {fieldError("description")}
              </div>

              <div className="flex flex-col sm:flex-row sm:justify-between gap-4 mt-8">
                <button
                  type="submit"
                  className="bg-primary hover:bg-primary-dark text-white py-2 px-5 rounded-md font-medium transition-colors"
                >
                  {mode === "add" ? "Add task" : "Update task"}
                </button>
                <button
                  type="button"
                  onClick={() => navigate("/")}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 px-5 rounded-md font-medium transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>

            <div className="border-t mt-10 pt-6">
              <div className="flex justify-between items-center">
                <h3 className="text-2xl font-semibold text-left text-dark-brown mb-6">Collaborate with others</h3>
              </div>

              {!inviteMode ? (
                <div className="mt-4">
                  <button
                    type="button"
                    className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-5 rounded-md transition-all"
                    onClick={() => setInviteMode(true)}
                  >
                    Invite a friend
                  </button>
                </div>
              ) : (
                <AnimatePresence>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="mt-4 space-y-4"
                  >
                    <input
                      type="email"
                      className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                      placeholder="friend@example.com"
                      value={inviteEmail}
                      onChange={(e) => setInviteEmail(e.target.value)}
                    />
                    {inviteError && <p className="text-sm text-red-500">{inviteError}</p>}
                    <div className="flex gap-3">
                      <button
                        type="button"
                        onClick={handleInvite}
                        className="bg-green-500 hover:bg-green-600 text-white py-2 px-5 rounded-md"
                      >
                        Send invite
                      </button>
                      <button
                        type="button"
                        onClick={handleCancelInvite}
                        className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-5 rounded-md"
                      >
                        Cancel
                      </button>
                    </div>
                  </motion.div>
                </AnimatePresence>
              )}
            </div>
          </>
        )}
      </motion.div>
    </MainLayout>
  );
};

export default Task;
