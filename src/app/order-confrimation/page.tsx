'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import TopNavOne from '@/components/Header/TopNav/TopNavOne';
import MenuMarketplace from '@/components/Header/Menu/MenuMarketplace';
import Breadcrumb from '@/components/Breadcrumb/Breadcrumb';
import Footer from '@/components/Footer/Footer';
import * as Icon from "@phosphor-icons/react";

const OrderConfirmation = () => {
    return (
        <>
            <TopNavOne props="style-one bg-black" slogan="Thank you for your order!" />
            <div id="header" className='relative w-full'>
                <MenuMarketplace SubMenuDepartment={false} />
                <Breadcrumb heading='Order Confirmation' subHeading='Thank you for your order!' />
            </div>
            <div className="order-confirmation-block md:py-20 py-10">
                <div className="container text-center">
                    <Icon.CheckCircle className="text-green-500 mx-auto mb-4" size={48} />
                    <h1 className="text-2xl font-bold mb-4">Order Confirmed!</h1>
                    <p className="text-lg mb-6">Thank you for your purchase. Your order is being processed.</p>
                    <Link href="/" className="button-main">
                        Continue Shopping
                    </Link>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default OrderConfirmation;