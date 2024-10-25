"use client"; // Keep this line to mark the component as a Client Component

import { useEffect, useState } from 'react';
import localFont from "next/font/local";
import Loading from './loading'; // Import the Loading component
import "./globals.css";
import { metadata } from './metadata'; // Import metadata from the new file


const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});



export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true); // Set loading state

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false); // Hide loading after some time
    },2000); // Adjust this duration as needed

    return () => clearTimeout(timer); // Clean up on unmount
  }, []);

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {loading ? <Loading /> : children} {/* Show Loading component or children based on loading state */}
      </body>
    </html>
  );
}
