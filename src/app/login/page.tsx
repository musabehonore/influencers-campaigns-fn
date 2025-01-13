'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { login } from '@/src/utils/api';
import { toast } from 'react-hot-toast';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await login(email, password);
      if (data.success === true) {
        localStorage.setItem('token', data.data.token);
        localStorage.setItem('role', data.data.role);
        toast.success('Login successful!! ');

        setTimeout(() => {
          router.push('/');
        }, 3000);

      } else {
        const errorMessage = data.message;
        toast.error(errorMessage || 'Login failed');
      }
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  return (

    <form onSubmit={handleLogin} className="container mx-auto text-center p-20">
      <h1 className=" text-4xl font-bold mb-4">Login</h1>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className=" bg-[#d3e2ff] w-full focus:outline-none shadow-lg p-2 mb-4  text-black"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className=" bg-[#d3e2ff] focus:outline-none shadow-lg p-2 mb-4 w-full text-black"
      />
      <button type="submit" className=" shadow-lg p-2 bg-[#2B71F0] text-white w-full hover: active:bg-[#7ca8f9] hover:bg-[#0246c3]">
        Login
      </button>

    </form>
  );
};

export default Login;
