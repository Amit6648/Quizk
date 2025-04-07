import React from 'react'
import { useState } from 'react';
import { login } from '../api/auth';
import { useNavigate } from 'react-router-dom';
import { detail } from '../api/auth';
import { useAuth } from '../Hooks/contextforprivate';
export default function Login() {


  const { setIsAuthenticated } = useAuth();
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("")
  const navigate = useNavigate();

  const handleSignUp = (e) => {
  e.preventDefault()
    navigate('/registor'); // ✅ Navigate to /registor on button click
  }



  const handlelogin = async (e) => {
    e.preventDefault(); // very important
    console.log("Attempting login...");
     // 👈 check if this shows
  
    try {
      const response = await login(email, password); // <-- axios call
      console.log("Login success:", response.data);

      await navigate('/navbar')
      console.log("kkkk")
      
    } catch (err) {
      console.error("Login error:", err.response?.data || err.message);
    }
  };
  
  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 text-center">
    <h2 className="text-blue-500 py-4 text-2xl font-bold">Log in</h2>
  
    <form className="flex flex-col items-center w-80">
      <input
        className="mt-6 w-full py-3 bg-gray-200 rounded-lg"
        type="email"
        placeholder="Email"
        value={email}
        onChange={e=>setemail(e.target.value)}
      />
      <input
        className="mt-4 w-full py-3 bg-gray-200 rounded-lg"
        type="password"
        placeholder="Password"
        value={password}
        onChange={e=>setpassword(e.target.value)}
      />
      <p className="mt-4">
        Forgot password?
        <button className="text-blue-400 ml-1">Reset password</button>
      </p>
      <button onClick={handlelogin}
        className="mt-6 w-full py-3 bg-blue-600 text-white rounded-lg"
        type="submit"
      >
        Login
      </button>
    </form>
  
    <h3 className="mt-4">
      Don't have an account?
      <button onClick={handleSignUp} className="text-blue-400 ml-1">Sign up</button>
    </h3>
  
    <footer className="py-10">
      <button className="bg-gray-300 mt-8 w-60 py-3 rounded-lg">
        Continue with Google
      </button>
    </footer>
  </div>
  
  )
}
