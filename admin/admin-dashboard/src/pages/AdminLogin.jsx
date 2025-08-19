import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';

export default function AdminLogin() {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     dispatch(signInStart());
  //     const res = await fetch('http://localhost:3000/api/AdminLogin/AdminLogin', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(formData),
  //     });
  //     const data = await res.json();
  //     if (data.success === false) {
  //       dispatch(signInFailure(data.message));
  //       return;
  //     }
  //     if (!data.isAdmin) {
  //       dispatch(signInFailure('You are not authorized to access this page.'));
  //       return;
  //     }
  //     dispatch(signInSuccess(data));
  //     navigate('/');
  //   } catch (error) {
  //     dispatch(signInFailure(error.message));
  //   }
  // };

  const handleSubmit = async (e) => {
      e.preventDefault();
  
      try {
        const response = await axios.post(
          "http://localhost:3000/api/AdminLogin/AdminLogin",
          formData
        );
  
        if (response.data.success) {
          alert("FdSdExpenses submitted successfully");
          handleReset();
        } else {
          alert("Failed to submit FdSdExpenses");
        }
      } catch (error) {
        console.error("Error submitting FdSdExpenses:", error);
        alert("Error occurred while submitting");
      }
    };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center text-gray-800">Admin Login</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              value={formData.email}
              onChange={handleChange}
              type="email"
              required
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              value={formData.password}
              type="password"
              required
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              onChange={handleChange}
            />
          </div>
          <button
            disabled={loading}
            type="submit"
            className="w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {loading ? 'Loading...' : 'Sign in'}
          </button>
        </form>
        {error && <p className="mt-5 text-red-500">{error}</p>}
      </div>
    </div>
  );
}
