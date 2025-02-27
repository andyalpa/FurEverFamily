import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate('/');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <form onSubmit={handleSignup} className="p-4 max-w-md mx-auto">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className="mb-4 p-2 border rounded w-full dark:bg-gray-700 dark:text-white"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        className="mb-4 p-2 border rounded w-full dark:bg-gray-700 dark:text-white"
      />
      <button type="submit" className="p-2 bg-green-500 text-white rounded w-full dark:bg-green-700">
        Sign Up
      </button>
    </form>
  );
}

export default Signup;