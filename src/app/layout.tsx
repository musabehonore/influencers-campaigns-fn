import './globals.css';
import Navbar from '../components/Navbar';
import { Work_Sans } from 'next/font/google';
import { Toaster } from 'react-hot-toast';

const workSans = Work_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '600', '700'],
  variable: '--font-work-sans',
});

export const metadata = {
  title: 'Influencer Campaigns',
  description: 'Manage and explore campaigns with beautiful design',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={workSans.variable}>
      <body>
      <Toaster position="top-right" reverseOrder={false} />
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
