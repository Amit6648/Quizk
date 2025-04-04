import React from 'react'

export default function Login() {
  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 text-center">
    <h2 className="text-blue-500 py-4 text-2xl font-bold">Log in</h2>
  
    <form className="flex flex-col items-center w-80">
      <input
        className="mt-6 w-full py-3 bg-gray-200 rounded-lg"
        type="email"
        placeholder="Email"
      />
      <input
        className="mt-4 w-full py-3 bg-gray-200 rounded-lg"
        type="password"
        placeholder="Password"
      />
      <p className="mt-4">
        Forgot password?
        <button className="text-blue-400 ml-1">Reset password</button>
      </p>
      <button
        className="mt-6 w-full py-3 bg-blue-600 text-white rounded-lg"
        type="submit"
      >
        Login
      </button>
    </form>
  
    <h3 className="mt-4">
      Don't have an account?
      <button className="text-blue-400 ml-1">Sign up</button>
    </h3>
  
    <footer className="py-10">
      <button className="bg-gray-300 mt-8 w-60 py-3 rounded-lg">
        Continue with Google
      </button>
    </footer>
  </div>
  
  )
}
