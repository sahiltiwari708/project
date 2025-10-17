import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/axios';

function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    role: 'user',
    education: '',
    photo: null
  });
  const [photoPreview, setPhotoPreview] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        photo: file
      }));

      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (!formData.photo) {
        setError('Please select a profile photo');
        setLoading(false);
        return;
      }

      // Create a new FormData instance
      const formDataToSend = new FormData();
      
      // Log the attempt
      console.log('Starting registration process...');
      
      // Add all text fields
      formDataToSend.append('name', formData.name.trim());
      formDataToSend.append('email', formData.email.trim());
      formDataToSend.append('phone', formData.phone.trim());
      formDataToSend.append('password', formData.password);
      formDataToSend.append('role', formData.role);
      formDataToSend.append('education', formData.education.trim());
      
      // Add the photo file
      formDataToSend.append('photo', formData.photo);
      
      // Log the request details
      console.log('Sending registration request with fields:', {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        education: formData.education,
        role: formData.role,
        photo: formData.photo.name
      });

      console.log('Sending registration data...');
      
      // Log the request attempt
      console.log('Attempting to connect to backend...');
      
      // Log the form data for debugging
      console.log('Sending form data:', {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        education: formData.education,
        role: formData.role,
        photo: formData.photo ? formData.photo.name : 'No photo'
      });

      try {
        // First verify the backend is running
        const healthCheck = await fetch('http://localhost:4001/api/users/register', {
          method: 'OPTIONS'
        });
        console.log('Backend health check status:', healthCheck.status);
        
        // Make the actual registration request
        const response = await api.post('/api/users/register', formDataToSend);
        console.log('Registration response:', response.data);
        
        alert(response.data.message || 'User registered successfully!');
        navigate('/login');
      } catch (err) {
        console.error('Detailed error:', err);
        throw err; // Re-throw to be caught by outer catch block
      }
      
      alert('User registered successfully!');
      navigate('/login');
    } catch (err) {
      console.error('Registration error:', err);
      
      if (err.code === 'ECONNREFUSED' || err.message === 'Network Error') {
        setError('Cannot connect to server. Please make sure the backend server is running on port 4001.');
        console.log('Backend connection failed. Please run: cd Backend && npm start');
      } else if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError('Registration failed. Please try again.');
      }
      
      // Log the complete error details for debugging
      console.error('Complete error details:', {
        message: err.message,
        response: err.response?.data,
        status: err.response?.status,
        code: err.code
      });
      
      // Log form data for debugging
      console.log('Form Data Contents:');
      for (let pair of formDataToSend.entries()) {
        console.log(pair[0] + ': ' + (pair[0] === 'photo' ? 'File' : pair[1]));
      }
      
      // Log backend status
      try {
        const checkServer = await fetch('http://localhost:4001/');
        console.log('Backend server status:', checkServer.status);
      } catch (checkErr) {
        console.log('Backend server check failed:', checkErr.message);
      }
    } finally {
      setLoading(false);
    };
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white shadow-md rounded-lg p-8">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold">
            Echo<span className="text-blue-500">Blog</span>
          </h1>
          <h2 className="text-xl font-semibold mt-4">Create your account</h2>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <div>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Full Name"
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email Address"
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone Number"
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <input
              type="text"
              name="education"
              value={formData.education}
              onChange={handleChange}
              placeholder="Education"
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Profile Photo
            </label>
            <input
              type="file"
              name="photo"
              onChange={handlePhotoChange}
              accept="image/*"
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
            {photoPreview && (
              <div className="mt-2">
                <img
                  src={photoPreview}
                  alt="Preview"
                  className="w-20 h-20 object-cover rounded-full"
                />
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;