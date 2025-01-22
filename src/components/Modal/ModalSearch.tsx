'use client'

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import * as Icon from "@phosphor-icons/react/dist/ssr";
import { ProductType } from '@/type/ProductType';
import { useModalSearchContext } from '@/context/ModalSearchContext';
import Product from '../Product/Product';

const ModalSearch = () => {
    const { isModalOpen, closeModalSearch } = useModalSearchContext();
    const [searchKeyword, setSearchKeyword] = useState('');
    const [productData, setProductData] = useState<ProductType[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

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

    const handleSearch = (value: string) => {
        router.push(`/search-result?query=${value}`);
        closeModalSearch();
        setSearchKeyword('');
    };

    if (loading) {
        return <div>Loading...</div>; // You can customize this loading state
    }

    if (error) {
        return <div>Error: {error}</div>; // Handle error state
    }

    return (
        <>
            <div className={`modal-search-block`} onClick={closeModalSearch}>
                <div
                    className={`modal-search-main md:p-10 p-6 rounded-[32px] ${isModalOpen ? 'open' : ''}`}
                    onClick={(e) => { e.stopPropagation() }}
                >
                    <div className="form-search relative">
                        <Icon.MagnifyingGlass
                            className='absolute heading5 right-6 top-1/2 -translate-y-1/2 cursor-pointer'
                            onClick={() => {
                                handleSearch(searchKeyword);
                            }}
                        />
                        <input
                            type="text"
                            placeholder='Searching...'
                            className='text-button-lg h-14 rounded-2xl border border-line w-full pl-6 pr-12'
                            value={searchKeyword}
                            onChange={(e) => setSearchKeyword(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSearch(searchKeyword)}
                        />
                    </div>
                    <div className="keyword mt-8">
                        <div className="heading5">Feature keywords Today</div>
                        <div className="list-keyword flex items-center flex-wrap gap-3 mt-4">
                            <div
                                className="item px-4 py-1.5 border border-line rounded-full cursor-pointer duration-300 hover:bg-black hover:text-white"
                                onClick={() => handleSearch('pop-surface-light')}
                            >
                                pop-surface-light
                            </div>
                            <div
                                className="item px-4 py-1.5 border border-line rounded-full cursor-pointer duration-300 hover:bg-black hover:text-white"
                                onClick={() => handleSearch('chandelier')}
                            >
                                Chandelier
                            </div>
                            <div
                                className="item px-4 py-1.5 border border-line rounded-full cursor-pointer duration-300 hover:bg-black hover:text-white"
                                onClick={() => handleSearch('outdoor-light')}
                            >
                                outdoor-light Light
                            </div>
                            <div
                                className="item px-4 py-1.5 border border-line rounded-full cursor-pointer duration-300 hover:bg-black hover:text-white"
                                onClick={() => handleSearch('solar-light')}
                            >
                                solar-light Light
                            </div>
                        </div>
                    </div>
                    <div className="list-recent mt-8">
                        <div className="heading6">Recently viewed products</div>
                        <div className="list-product pb-5 hide-product-sold grid xl:grid-cols-4 sm:grid-cols-2 gap-7 mt-4">
                            {Array.isArray(productData) && productData.slice(0, 4).map((product) => (
                                <Product key={product.id} data={product} type='grid' />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ModalSearch;