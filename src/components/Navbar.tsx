'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

const Navbar = () => {
  const router = useRouter();
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    setLoggedIn(isLoggedIn);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setLoggedIn(false);
    toast.success('Logged out successfuly ');
    setTimeout(() => {
      router.push('/');
    }, 3000);
  };

  return (
    <nav className="z-10 bg-gradient-to-r from-[#a6c4fb] to-[#ffffff] fixed top-0 w-full p-4 flex justify-between shadow-md">
      <Link href="/">
        <div className="font-bold text-sm">Influencer Campaigns</div>
      </Link>
      <div className="flex flex-row">
        <Link href="/campaigns" className="mx-2 active:text-blue-400 whitespace-nowrap">
          Campaigns
        </Link>
        {loggedIn ? (
          <button
            onClick={handleLogout}
            className="mx-2 active:text-red-600 text-red-700 whitespace-nowrap"
          >
            Logout
          </button>
        ) : (
          <div>
            <Link href="/login" className="mx-2 active:text-blue-400 whitespace-nowrap">
              Login
            </Link>
            <Link href="/signup" className="mx-2 active:text-blue-400 whitespace-nowrap">
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
