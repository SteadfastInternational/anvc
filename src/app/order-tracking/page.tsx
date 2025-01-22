'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import TopNavOne from '@/components/Header/TopNav/TopNavOne'
import MenuMarketplace from '@/components/Header/Menu/MenuMarketplace'
import Breadcrumb from '@/components/Breadcrumb/Breadcrumb'
import Footer from '@/components/Footer/Footer'
import * as Icon from "@phosphor-icons/react/dist/ssr";


const OrderTracking = () => {

    return (
        <>
            <TopNavOne props="style-one bg-black" slogan="ENJOY FREE SHIPPING ON ORDERS OVER ₦100,000" />
            <div id="header" className='relative w-full'>
                 <MenuMarketplace SubMenuDepartment={false} />
                <Breadcrumb heading='Order Tracking' subHeading='Order Tracking' />
            </div>
            <div className="order-tracking md:py-20 py-10">
                <div className="container">
                    <div className="content-main flex gap-y-8 max-md:flex-col">
                        <div className="left md:w-1/2 w-full lg:pr-[60px] md:pr-[40px] md:border-r border-line">
                            <div className="heading4">Order Tracking</div>
                            <div className="mt-2">To track your order please enter your Order ID in the box below and press the {String.raw`"`}Track{String.raw`"`} button. This was given to you on your receipt and in the confirmation email you should have received.</div>
                            <form className="md:mt-7 mt-4">
                                <div className="email ">
                                    <input className="border-line px-4 pt-3 pb-3 w-full rounded-lg" id="username" type="email" placeholder="Order ID *" required />
                                </div>
                                <div className="billing mt-5">
                                    <input className="border-line px-4 pt-3 pb-3 w-full rounded-lg" id="billing" type="email" placeholder="Billing or Shipping Email *" required />
                                </div>
                                <div className="block-button md:mt-7 mt-4">
                                    <button className="button-main">Track Order</button>
                                </div>
                            </form>
                        </div>
                        <div className="right md:w-1/2 w-full lg:pl-[60px] md:pl-[40px] flex items-center">
                            <div className="text-content">
                                <div className="heading4">Already have an account?</div>
                                <div className="mt-2 text-secondary">Welcome back. Sign in to access your personalized experience, saved preferences, and more. We{String.raw`'re`} thrilled to have you with us again!</div>
                                <div className="block-button md:mt-7 mt-4">
                                    <Link href={'/login'} className="button-main">Login</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default OrderTracking