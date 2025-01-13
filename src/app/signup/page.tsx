'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signUp } from '@/src/utils/api';
import { toast } from 'react-hot-toast';

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await signUp(name, email, password);
      if (data.success === true) {
        toast.success('Signed up successfuly!! ');

        setTimeout(() => {
          router.push('/login');
        }, 3000);

      } else {
        const errorMessage = data.message;
        toast.error(errorMessage || 'Sign Up failed');
      }
    } catch (error) {
      console.error('Sign Up failed', error);
    }
  };

  return (

    <form onSubmit={handleSignUp} className="container mx-auto text-center p-20">
      <h1 className=" text-4xl font-bold mb-4">Sign Up</h1>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className=" bg-[#d3e2ff] focus:outline-none shadow-lg p-2 mb-4 w-full text-black"
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className=" bg-[#d3e2ff] focus:outline-none shadow-lg p-2 mb-4 w-full text-black"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className=" bg-[#d3e2ff] focus:outline-none shadow-lg p-2 mb-4 w-full text-black"
      />
      <button type="submit" className=" shadow-lg p-2 bg-[#2B71F0] text-white w-full hover: active:bg-[#7ca8f9] hover:bg-[#0246c3]">
        Sign Up
      </button>

    </form>
  );
};

export default SignUp;
