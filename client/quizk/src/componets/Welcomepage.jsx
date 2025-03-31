
import { BrowserRouter as Router, Routes, Link, Route } from 'react-router-dom'
export default function Welcomepage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center">
      <h1 className='text-4xl font-bold'>Welcome to</h1>
      <h1 className='text-6xl font-extrabold'>Quiz Arena</h1>
      <button className='mt-6 w-80 py-3 bg-blue-600 text-white rounded-lg'>Continue with Google</button>
      <div>
        <button className="mt-3 w-80 py-3 border border-gray-600 text-gray-500 rounded-lg text-lg">  <Link to="/registor">Sigup with Email</Link></button>
        <p className='text-gray-500'>
          Have an account? 
          <Link to="/login" className='text-blue-400 font-bold ml-1'>Login</Link>

        </p>
      </div>
    </div>
  );
}