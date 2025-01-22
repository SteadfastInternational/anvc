'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import TopNavOne from '@/components/Header/TopNav/TopNavOne';
import MenuMarketplace from '@/components/Header/Menu/MenuMarketplace';
import Breadcrumb from '@/components/Breadcrumb/Breadcrumb';
import Footer from '@/components/Footer/Footer';
import http from '@/utils/http'; // HTTP utility for API calls
import { AxiosError } from 'axios'; // Import AxiosError for typing

// Define the expected response structure for the forgot password API call
interface ForgotPasswordResponse {
  message: string;
}

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(''); // Clear previous messages

    try {
      // API request
      const response = await http.post('/auth/forgot-password', { email });
      
      // Ensure TypeScript understands the response type
      const data = response.data as ForgotPasswordResponse;
      
      // Access the message property
      setMessage(data.message || 'Password reset email sent successfully.');
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        // If the error is an instance of AxiosError, handle it accordingly
        const errorMessage = error.response?.data?.message || 'Failed to send reset email. Please try again.';
        setMessage(errorMessage);
      } else {
        // If the error is not an AxiosError, handle it as a general unknown error
        setMessage('An unexpected error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <TopNavOne
        props="style-one bg-black"
        slogan="ENJOY FREE SHIPPING ON ORDERS OVER ₦100,000"
      />
      <div id="header" className="relative w-full">
        <MenuMarketplace SubMenuDepartment={false} />
        <Breadcrumb heading="Forgot Password" subHeading="Reset your password" />
      </div>
      <div className="forgot-pass md:py-20 py-10">
        <div className="container">
          <div className="content-main flex gap-y-8 max-md:flex-col">
            <div className="left md:w-1/2 w-full lg:pr-[60px] md:pr-[40px] md:border-r border-line">
              <div className="heading4">Reset your password</div>
              <div className="body1 mt-2">
                We will send you an email to reset your password.
              </div>
              {message && (
                <div
                  className={`mt-4 text-sm ${message.includes('Failed') ? 'text-red-500' : 'text-green-500'}`}
                >
                  {message}
                </div>
              )}
              <form className="md:mt-7 mt-4" onSubmit={handleForgotPassword}>
                <div className="email">
                  <input
                    className="border-line px-4 pt-3 pb-3 w-full rounded-lg"
                    id="email"
                    type="email"
                    placeholder="Enter your email address *"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="block-button md:mt-7 mt-4">
                  <button
                    type="submit"
                    className="button-main"
                    disabled={loading}
                  >
                    {loading ? 'Submitting...' : 'Submit'}
                  </button>
                </div>
              </form>
            </div>
            <div className="right md:w-1/2 w-full lg:pl-[60px] md:pl-[40px] flex items-center">
              <div className="text-content">
                <div className="heading4">New Customer</div>
                <div className="mt-2 text-secondary">
                  Be part of our growing family of new customers! Join us today and unlock a
                  world of exclusive benefits, offers, and personalized experiences.
                </div>
                <div className="block-button md:mt-7 mt-4">
                  <Link href="/register" className="button-main">
                    Register
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ForgotPassword;
