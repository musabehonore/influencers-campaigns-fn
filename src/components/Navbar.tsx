'use client';

import Link from 'next/link';

const Navbar = () => (
  <nav className=" z-10 bg-gradient-to-r from-[#a6c4fb] to-[#ffffff] fixed top-0 w-full p-4 flex justify-between shadow-md">
    <Link href="/">
      <div className="font-bold text-sm">Influencer Campaigns</div>
    </Link>
    <div className="flex flex-row">
      <Link href="/campaigns" className="mx-2 active:text-blue-400 whitespace-nowrap">Campaigns</Link>
      <div>
        <Link href="/login" className="mx-2 active:text-blue-400 whitespace-nowrap">Login</Link>
        <Link href="/signup" className="mx-2 active:text-blue-400 whitespace-nowrap">Sign Up</Link>
      </div>
    </div>
  </nav>
);

export default Navbar;
