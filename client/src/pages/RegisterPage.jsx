import React from 'react'
import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import axios from 'axios';

const RegisterPage = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);
    // const [confirmPassword, setConfirmPassword] = useState('');

    const registerUser = async (e) => {
        e.preventDefault();
        try{
            await axios.post('/register', {
                name,
                email,
                password
            });
            alert('Registration successful. Please login to continue.')
            setRedirect(true);
        }catch(e){
            alert('Registration failed. Please try again');
        }
    }

    if(redirect){
        return <Navigate to='/login' />
    }
  return (
    <div className="mt-4 grow flex justify-around items-center">
      <div className="mb-48">
        <h1 className="text-4xl text-center mb-4">Register</h1>
        <form onSubmit={registerUser} className="max-w-md mx-auto">
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            name="email"
            id="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {/* <input
            type="password"
            name="confirm_password"
            id="confirm_password"
            placeholder="confirm_password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          /> */}
          <button className="bg-primary p-3 mt-2 rounded-full w-full text-white">
            Register
          </button>
        </form>
        <div className="text-center mt-1 text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="underline text-black">
            Login here
          </Link>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage