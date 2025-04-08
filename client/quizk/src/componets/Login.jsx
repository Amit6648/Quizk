import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../api/auth';
import { useAuth } from '../Hooks/contextforprivate';

export default function Login() {
  const { setIsAuthenticated } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignUp = (e) => {
    e.preventDefault();
    navigate('/register'); // ✅ corrected spelling
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log('Attempting login...');

    try {
      const response = await login(email, password);
      console.log('Login success:', response.data);

      setIsAuthenticated(true); // ✅ update auth context
      navigate('/home'); // ✅ navigate without await
    } catch (err) {
      console.error('Login error:', err.response?.data || err.message);
      alert('Invalid credentials or server error.');
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 text-center px-4">
      <h2 className="text-blue-500 py-6 text-3xl font-bold">Log in</h2>

      <form onSubmit={handleLogin} className="flex flex-col items-center w-80">
        <input
          className="mt-6 w-full py-3 px-4 bg-gray-200 rounded-lg outline-none"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className="mt-4 w-full py-3 px-4 bg-gray-200 rounded-lg outline-none"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <p className="mt-4 text-sm text-gray-600">
          Forgot password?
          <button type="button" className="text-blue-400 ml-1 hover:underline">
            Reset password
          </button>
        </p>

        <button
          className="mt-6 w-full py-3 bg-blue-600 hover:bg-blue-700 transition text-white font-semibold rounded-lg"
          type="submit"
        >
          Login
        </button>
      </form>

      <h3 className="mt-4 text-sm text-gray-700">
        Don't have an account?
        <button onClick={handleSignUp} className="text-blue-400 ml-1 hover:underline">
          Sign up
        </button>
      </h3>

      <footer className="py-10">
        <button className="bg-white border border-gray-300 shadow-sm mt-8 w-60 py-3 rounded-lg hover:bg-gray-100 transition">
          <span className="text-gray-600 font-medium">Continue with Google</span>
        </button>
      </footer>
    </div>
  );
}
