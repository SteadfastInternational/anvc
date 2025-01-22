'use client'
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import TopNavOne from '@/components/Header/TopNav/TopNavOne';
import MenuMarketplace from '@/components/Header/Menu/MenuMarketplace';
import Breadcrumb from '@/components/Breadcrumb/Breadcrumb';
import Footer from '@/components/Footer/Footer';
import { ProductType, Variation } from '@/type/ProductType'; // Import ProductType and Variation
import Product from '@/components/Product/Product';
import HandlePagination from '@/components/Other/HandlePagination';

const SearchResult = () => {
    const [searchKeyword, setSearchKeyword] = useState<string>('');
    const [currentPage, setCurrentPage] = useState(0);
    const productsPerPage = 8;
    const offset = currentPage * productsPerPage;
    const [filteredData, setFilteredData] = useState<ProductType[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const router = useRouter();
    const searchParams = useSearchParams();
    let query = searchParams.get('query') as string;

    if (query === null) {
        query = 'dress';
    }

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const apiUrl = process.env.NEXT_PUBLIC_API_URL; // Get the base API URL from environment variables
                if (!apiUrl) {
                    throw new Error('API URL is not defined in the environment variables.');
                }

                const response = await fetch(`${apiUrl}/products?search=${query}`); // Fetch products based on the search query
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setFilteredData(data); // Assuming the data is an array of products
            } catch (err) {
                const errorMessage = (err as Error).message || 'An unknown error occurred';
                setError(errorMessage);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [query]); // Fetch data whenever the query changes

    // Handle no data found
    if (filteredData.length === 0) {
        const noDataProduct: ProductType = {
            id: 'no-data',
            category: 'no-data',
            type: 'no-data',
            name: 'No products match the selected criteria.',
            tag: 'no-data',
            new: false,
            sale: false,
            rate: 0,
            price: 0,
            watt: 0,
            weight: 0,
            bodyColor: 'no-data',
            availableQuantity: 0,
            quantity: 0,
            quantityPurchase: 0,
            variation: [], // Empty array for variations
            thumbImage: [],
            images: [],
            description: 'No data available',
            action: 'no-data',
            slug: 'no-data',
            activeColor: 'no-data', // Default value
            selectedColor: 'no-data' // Default value
        };
        filteredData.push(noDataProduct);
    }

    // Find page number based on filteredData
    const pageCount = Math.ceil(filteredData.length / productsPerPage);

    // Get product data for current page
    const currentProducts = filteredData.slice(offset, offset + productsPerPage);

    const handlePageChange = (selected: number) => {
        setCurrentPage(selected);
    };

    const handleSearch = (value: string) => {
        router.push(`/search-result?query=${value}`);
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
            <TopNavOne props="style-one bg-black" slogan="ENJOY FREE SHIPPING ON ORDERS OVER ₦100,000" />
            <div id="header" className='relative w-full'>
                <MenuMarketplace SubMenuDepartment={false} />
                <Breadcrumb heading='Search Result' subHeading='Search Result' />
            </div>
            <div className="shop-product breadcrumb1 lg:py-20 md:py-14 py-10">
                <div className ="container">
                    <div className="heading flex flex-col items-center">
                        <div className="heading4 text-center">Found {filteredData.length} results for {String.raw`"`}{query}{String.raw`"`}</div>
                        <div className="input-block lg:w-1/2 sm:w-3/5 w-full md:h-[52px] h-[44px] sm:mt-8 mt-5">
                            <div className='w-full h-full relative'>
                                <input
                                    type="text"
                                    placeholder='Search...'
                                    className='caption1 w-full h-full pl-4 md:pr-[150px] pr-32 rounded-xl border border-line'
                                    value={searchKeyword}
                                    onChange={(e) => setSearchKeyword(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleSearch(searchKeyword)}
                                />
                                <button
                                    className='button-main absolute top-1 bottom-1 right-1 flex items-center justify-center'
                                    onClick={() => handleSearch(searchKeyword)}
                                >
                                    search
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="list-product-block relative md:pt-10 pt-6">
                        <div className="heading6">Product Search: {query}</div>
                        <div className={`list-product hide-product-sold grid lg:grid-cols-4 sm:grid-cols-3 grid-cols-2 sm:gap-[30px] gap-[20px] mt-5`}>
                            {currentProducts.map((item) => (
                                item.id === 'no-data' ? (
                                    <div key={item.id} className="no-data-product">No products match the selected criteria.</div>
                                ) : (
                                    <Product key={item.id} data={item} type='grid' />
                                )
                            ))}
                        </div>

                        {pageCount > 1 && (
                            <div className="list-pagination flex items-center justify-center md:mt-10 mt-7">
                                <HandlePagination pageCount={pageCount} onPageChange={handlePageChange} />
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default SearchResult;