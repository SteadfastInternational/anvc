'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import TopNavOne from '@/components/Header/TopNav/TopNavOne';
import MenuMarketplace from '@/components/Header/Menu/MenuMarketplace';
import Breadcrumb from '@/components/Breadcrumb/Breadcrumb';
import Footer from '@/components/Footer/Footer';
import * as Icon from "@phosphor-icons/react/dist/ssr";
import { useRouter } from 'next/navigation';  // Use this instead of 'next/router'
import http from '@/utils/http'; // Use the HTTP utility
import localStorageUtil from '@/utils/localStorage'; // Use the localStorage utility

const Register = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [isClient, setIsClient] = useState(false); // State to track if the component is client-side
  const router = useRouter(); // Now using the App Router's useRouter

  // Ensure that we only access router logic client-side
  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleRegister = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setLoading(true);

    // Check if password and confirm password match (front-end validation only)
    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      setLoading(false);
      return;
    }

    // Prepare payload with only required fields
    const payload = { firstName, lastName, email, password };

    try {
      // Send the registration request to the backend
      const response = await http.post('/auth/signup', payload);
      
      // Log the response from the backend
  

      alert('Registration successful!');
      localStorageUtil.set('token', response.data.token);  // Store token if necessary

      // Redirect to the homepage after successful registration
      if (isClient) {
        router.push('/'); // Perform navigation only on the client-side
      }
    } catch (error: any) {
      alert(error.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!isClient) {
    return null; // Render nothing on the server-side to avoid SSR errors
  }

  return (
    <>
      <TopNavOne props="style-one bg-black" slogan="ENJOY FREE SHIPPING ON ORDERS OVER ₦100,000" />
      <div id="header" className="relative w-full">
        <MenuMarketplace SubMenuDepartment={false} />
        <Breadcrumb heading="Create An Account" subHeading="Create An Account" />
      </div>
      <div className="register-block md:py-20 py-10">
        <div className="container">
          <div className="content-main flex gap-y-8 max-md:flex-col">
            <div className="left md:w-1/2 w-full lg:pr-[60px] md:pr-[40px] md:border-r border-line">
              <div className="heading4">Register</div>
              <form className="md:mt-7 mt-4" onSubmit={handleRegister}>
                <div className="first-name">
                  <input
                    className="border-line px-4 pt-3 pb-3 w-full rounded-lg"
                    id="firstName"
                    type="text"
                    placeholder="First Name *"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  />
                </div>
                <div className="last-name mt-5">
                  <input
                    className="border-line px-4 pt-3 pb-3 w-full rounded-lg"
                    id="lastName"
                    type="text"
                    placeholder="Last Name *"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                  />
                </div>
                <div className="email mt-5">
                  <input
                    className="border-line px-4 pt-3 pb-3 w-full rounded-lg"
                    id="email"
                    type="email"
                    placeholder="Email Address *"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="password mt-5">
                  <input
                    className="border-line px-4 pt-3 pb-3 w-full rounded-lg"
                    id="password"
                    type="password"
                    placeholder="Password *"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="confirm-password mt-5">
                  <input
                    className="border-line px-4 pt-3 pb-3 w-full rounded-lg"
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirm Password *"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="flex items-center mt-5">
                  <div className="block-input">
                    <input
                      type="checkbox"
                      name="agree"
                      id="agree"
                    />
                    <Icon.CheckSquare size={20} weight="fill" className="icon-checkbox" />
                  </div>
                  <label htmlFor="agree" className="pl-2 cursor-pointer text-secondary2">I agree to the
                    <Link href="#!" className="text-black hover:underline pl-1">Terms of Use</Link>
                  </label>
                </div>
                <div className="block-button md:mt-7 mt-4">
                  <button
                    type="submit"
                    className="button-main"
                    disabled={loading}
                  >
                    {loading ? 'Registering...' : 'Register'}
                  </button>
                </div>
              </form>
            </div>
            <div className="right md:w-1/2 w-full lg:pl-[60px] md:pl-[40px] flex items-center">
              <div className="text-content">
                <div className="heading4">Already have an account?</div>
                <div className="mt-2 text-secondary">Welcome back. Sign in to access your personalized experience, saved preferences, and more. We re thrilled to have you with us again!</div>
                <div className="block-button md:mt-7 mt-4">
                  <Link href="/login" className="button-main">Login</Link>
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

export default Register;
