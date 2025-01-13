'use client';

import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';

const Home = () => (
  <div>
    <Navbar />
    <div className="flex flex-col items-center justify-center min-h-screen">
      <motion.h1
        className="text-4xl font-bold"
        animate={{
          y: [0, -80, 0],
          opacity: [0.8, 1, 0.8],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        Welcome to Influencer Campaigns
      </motion.h1>
    </div>
  </div>
);

export default Home;
