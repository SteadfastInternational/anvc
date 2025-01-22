'use client'

import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import * as Icon from "@phosphor-icons/react/dist/ssr";
import { ProductType } from '@/type/ProductType';
import { useModalQuickviewContext } from '@/context/ModalQuickviewContext';
import Image from 'next/image';

const ModalNewsletter = () => {
    const [open, setOpen] = useState<boolean>(false);
    const router = useRouter();
    const { openQuickview } = useModalQuickviewContext();
    const [productData, setProductData] = useState<ProductType[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const apiUrl = process.env.NEXT_PUBLIC_API_URL; // Get the base API URL from environment variables
                if (!apiUrl) {
                    throw new Error('API URL is not defined in the environment variables.');
                }

                // Fetch products from the API
                const response = await fetch(`${apiUrl}/products`); // Adjust the endpoint as needed
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json(); // Get the raw data
               

                // Check if the data is an array
                if (Array.isArray(data)) {
                    setProductData(data); // Set productData if it's an array
                } else {
                    throw new Error('Fetched data is not an array');
                }
            } catch (err) {
                const errorMessage = (err as Error).message || 'An unknown error occurred';
                setError(errorMessage);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []); // Fetch data when the component mounts

    useEffect(() => {
        const timer = setTimeout(() => {
            setOpen(true);
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    const handleDetailProduct = (productId: string) => {
        // Redirect to shop with category selected
        router.push(`/product/default?id=${productId}`);
    };

    // Ensure each product has a watt value and a weight value
    const updatedProductData = productData.map(item => ({
        ...item,
        watt: item.watt || 0,  // Fallback to 0 if watt is missing
        weight: item.weight || 0, // Fallback to 0 if weight is missing
    }));

    if (loading) {
        return <div>Loading...</div>; // You can customize this loading state
    }

    if (error) {
        return <div>Error: {error}</div>; // Handle error state
    }

    return (
        <div className="modal-newsletter" onClick={() => setOpen(false)}>
            <div className="container h-full flex items-center justify-center w-full">
                <div
                    className={`modal-newsletter-main ${open ? 'open' : ''}`}
                    onClick={(e) => { e.stopPropagation() }}
                >
                    <div className="main-content flex rounded-[20px] overflow-hidden w-full">
                        <div
                            className="left lg:w-1/2 sm:w-2/5 max-sm:hidden bg-green flex flex-col items-center justify-center gap-5 py-14">
                            <div className="text-xs font-semibold uppercase text-center">Special Offer</div>
                            <div
                                className="lg:text-[70px] text-4xl lg:leading-[78px] leading-[42px] font-bold uppercase text-center">
                                Black<br />Fridays</div>
                            <div className="text-button-uppercase text-center">New customers save <span
                                className="text-red">30%</span>
                                with the code</div>
                            <div className="text-button-uppercase text-red bg-white py-2 px-4 rounded-lg">GET20off</div>
                            <div className="button-main w-fit bg-black text-white hover:bg-white uppercase">Copy coupon code
                            </div>
                        </div>
                        <div className="right lg:w-1/2 sm:w-3/5 w-full bg-white sm:pt-10 sm:pl-10 max-sm:p-6 relative">
                            <div
                                className="close-newsletter-btn w-10 h-10 flex items-center justify-center border border-line rounded-full absolute right-5 top-5 cursor-pointer" onClick={() => setOpen(false)}>
                                <Icon.X weight='bold' className='text-xl' />
                            </div>
                            <div className="heading5 pb-5">You May Also Like</div>
                            <div className="list flex flex-col gap-5 overflow-x-auto sm:pr-6">
                                {updatedProductData.slice(11, 16).map((item, index) => (
                                    <div
                                        className='product-item item pb-5 flex items-center justify-between gap-3 border-b border-line'
                                        key={index}
                                    >
                                        <div
                                            className="infor flex items-center gap-5 cursor-pointer"
                                            onClick={() => handleDetailProduct(item.id)}
                                        >
                                            <div className="bg-img flex-shrink-0">
                                                <Image width={5000} height={5000} src={item.thumbImage[0]} alt={item.name}
                                                    className='w-[100px] aspect-square flex-shrink-0 rounded-lg' />
                                            </div>
                                            <div className=''>
                                                <div className="name text-button">{item.name}</div>
                                                <div className="flex items-center gap-2 mt-2">
                                                    <div className="product-price text-title">₦{item.price}.00</div>
                                                    <div className="product-origin-price text-title text-secondary2">
                                                        {/* You can add original price here if available */}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <button
                                            className="quick-view-btn button-main sm:py-3 py-2 sm:px-5 px-4 bg-black hover:bg-green text-white rounded-full whitespace-nowrap"
                                            onClick={() => openQuickview(item)}
                                        >
                                            QUICK VIEW
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ModalNewsletter;