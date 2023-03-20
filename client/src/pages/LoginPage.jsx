import {useState, useContext} from 'react';
import { Link, redirect, Navigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../context/UserContext';

const LoginPage = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);

  const userContext = useContext(UserContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    try{
      const response = await axios.post('/login', {
        email,
        password
      });
      userContext.setUser(response.data);
      alert('Login successful!');
      setRedirect(true);
    }catch(err){
      console.log(err);
      alert('Login failed!');
    }
  }

  if (redirect) {
    return <Navigate to="/" />;
  }

  return (
    <div className="mt-4 grow flex justify-around items-center">
      <div className="mb-48">
        <h1 className="text-4xl text-center mb-4">Login</h1>
        <form onSubmit={handleLogin} className="max-w-md mx-auto">
          <input
            type="email"
            name="email"
            id="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button className="bg-primary p-3 mt-2 rounded-full w-full text-white">
            Login
          </button>
        </form>
        <div className="text-center mt-1 text-gray-600">
          Don't have an account yet?{" "}
          <Link to="/register" className="underline text-black">
            Register here
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LoginPage