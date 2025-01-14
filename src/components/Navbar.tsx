'use client';

import Link from 'next/link';

const Navbar = () => (
  <nav className=" bg-gradient-to-r from-[#a6c4fb] to-[#ffffff] fixed top-0 w-full p-4 flex justify-between shadow-md">
    <div className="font-bold text-sm">Influencer Campaigns</div>
    <div>
      <Link href="/login" className="mx-2 active:text-blue-400 ">Login</Link>
      <Link href="/signup" className="mx-2 active:text-blue-400">Sign Up</Link>
      <Link href="/campaigns" className="mx-2 active:text-blue-400">Campaigns</Link>
    </div>
  </nav>
);

export default Navbar;
