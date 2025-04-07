import React from 'react'
import { useState } from 'react';
import { registor } from '../api/auth';
import { Link } from 'react-router-dom';

function Registor() {
    const [name, setname] = useState('');
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('')

    const handleregis = ()=>{
      registor(name,email,password);
    }
  return (
    <>
<div className="flex flex-col items-center min-h-screen bg-gray-100 text-center">
  <h2 className="text-blue-500 py-4 text-2xl font-bold">Registor</h2>

  <form className="flex flex-col items-center w-80">
    <input
      className="mt-6 w-full py-3 bg-gray-200 rounded-lg"
      placeholder="username"
      value={name}
      onChange={e=>setname(e.target.value)}
    />
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
   
    <button onClick={handleregis}
      className="mt-6 w-full py-3 bg-blue-600 text-white rounded-lg"
      type="submit"
    >
      Signup</button>
  </form>

  <h3 className="mt-4">
   have an account?
    <button className="text-blue-400 ml-1"><Link to="/login">Login</Link></button>
  </h3>

  <footer className="py-10">
    <button className="bg-gray-300 mt-8 w-60 py-3 rounded-lg">
      Continue with Google
    </button>
  </footer>
</div>

    
    </>
  )
}

export default Registor