'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import TopNavOne from '@/components/Header/TopNav/TopNavOne';
import MenuMarketplace from '@/components/Header/Menu/MenuMarketplace';
import Breadcrumb from '@/components/Breadcrumb/Breadcrumb';
import Footer from '@/components/Footer/Footer';
import * as Icon from "@phosphor-icons/react/dist/ssr";
import { useRouter } from 'next/navigation'; // Use the App Router's useRouter
import http from '@/utils/http'; // Use the HTTP utility
import localStorageUtil from '@/utils/localStorage'; // Use the localStorage utility

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [isClient, setIsClient] = useState(false); // State to track if the component is client-side
  const router = useRouter(); // Now using the App Router's useRouter

  // Ensure that we only access router logic client-side
  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleLogin = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setLoading(true);

    const payload = { email, password };

    try {
      const response = await http.post('/auth/login', payload);
      const { status, jwt, remember_me, data } = response.data;

      if (status === 'success') {
        alert('Login successful!');
        localStorageUtil.set('jwt', jwt); // Store the JWT token in localStorage
        if (remember_me) {
          localStorageUtil.set('remember_me', 'true');
        }

        

        if (isClient) {
          router.push('/'); // Navigate to the home page
        }
      } else {
        alert('Login failed. Please check your credentials.');
      }
    } catch (error: any) {
      alert(error.response?.data?.message || 'An unexpected error occurred during login.');
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
        <Breadcrumb heading="Login" subHeading="Login" />
      </div>
      <div className="login-block md:py-20 py-10">
        <div className="container">
          <div className="content-main flex gap-y-8 max-md:flex-col">
            <div className="left md:w-1/2 w-full lg:pr-[60px] md:pr-[40px] md:border-r border-line">
              <div className="heading4">Login</div>
              <form className="md:mt-7 mt-4" onSubmit={handleLogin}>
                <div className="email">
                  <input
                    className="border-line px-4 pt-3 pb-3 w-full rounded-lg"
                    id="username"
                    type="email"
                    placeholder="Username or email address *"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="pass mt-5">
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
                <div className="flex items-center justify-between mt-5">
                  <div className="flex items-center">
                    <div className="block-input">
                      <input type="checkbox" name="remember" id="remember" />
                      <Icon.CheckSquare size={20} weight="fill" className="icon-checkbox" />
                    </div>
                    <label htmlFor="remember" className="pl-2 cursor-pointer">Remember me</label>
                  </div>
                  <Link href="/forgot-password" className="font-semibold hover:underline">
                    Forgot Your Password?
                  </Link>
                </div>
                <div className="block-button md:mt-7 mt-4">
                  <button
                    type="submit"
                    className="button-main"
                    disabled={loading}
                  >
                    {loading ? 'Logging in...' : 'Login'}
                  </button>
                </div>
              </form>
            </div>
            <div className="right md:w-1/2 w-full lg:pl-[60px] md:pl-[40px] flex items-center">
              <div className="text-content">
                <div className="heading4">New Customer</div>
                <div className="mt-2 text-secondary">
                  Be part of our growing family of new customers! Join us today and unlock a world of exclusive benefits, offers, and personalized experiences.
                </div>
                <div className="block-button md:mt-7 mt-4">
                  <Link href="/register" className="button-main">Register</Link>
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

export default Login;
