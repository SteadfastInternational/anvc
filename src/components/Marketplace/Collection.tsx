import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Collection = () => {
    return (
        // This div will be hidden on mobile screens and visible on medium screens and above
        <div className="collection-block md:pt-[60px] pt-10 hidden md:block">
            <div className="container">
                <div className="heading flex items-center justify-between gap-5 flex-wrap">
                    <div className="heading3">Our Collections</div>
                    <Link href='/shop/breadcrumb-img' className='text-button pb-0.5 border-b-2 border-black'>View All</Link>
                </div>
                <div className="list grid xl:grid-cols-4 sm:grid-cols-2 sm:gap-[30px] gap-[20px] md:mt-10 mt-6">
                    {/* Collection Item 1 */}
                    <div className="item flex gap-3 px-5 py-6 border border-line rounded-2xl">
                        <Link href='/shop/breadcrumb-img?type=chandelier' className='img-product w-[100px] h-[100px] flex-shrink-0'>
                            <Image width={5000} height={5000} src='/images/collection/marketplace1.png' className='w-full h-full object-cover' alt='img' />
                        </Link>
                        <div className="text-content w-full">
                            <div className="heading6 pb-4">Chandelier</div>
                            <ul>
                                <li>
                                    <Link href="shop/breadcrumb-img?category=nordic-chandeliers" className="has-line-before caption1 text-secondary hover:text-black">Nordic Chandeliers</Link>
                                </li>
                                <li className="mt-1">
                                    <Link href="shop/breadcrumb-img?category=crystal-chandeliers" className="has-line-before caption1 text-secondary hover:text-black">Crystal Chandeliers</Link>
                                </li>
                                <li className="mt-1">
                                    <Link href="shop/breadcrumb-img?category=fan-chandeliers" className="has-line-before caption1 text-secondary hover:text-black">Chandelier with Fan</Link>
                                </li>
                            </ul>
                            <Link href='/shop/breadcrumb-img?type=chandelier' className='flex items-center gap-1.5 mt-4'>
                                <span className="text-button">All Chandeliers</span>
                                <i className="ph-bold ph-caret-double-right text-sm"></i>
                            </Link>
                        </div>
                    </div>
                    {/* Collection Item 2 */}
                    <div className="item flex gap-3 px-5 py-6 border border-line rounded-2xl">
                        <Link href='/shop/breadcrumb-img?type=pop-surface' className='img-product w-[100px] h-[100px] flex-shrink-0'>
                            <Image width={5000} height={5000} src='/images/collection/marketplace2.png' className='w-full h-full object-cover' alt='img' />
                        </Link>
                        <div className="text-content w-full">
                            <div className="heading6 pb-4">Surface Light</div>
                            <ul>
                                <li>
                                    <Link href="shop/breadcrumb-img?category=pop-spotlight" className="has-line-before caption1 text-secondary hover:text-black">Pop spotlight</Link>
                                </li>
                                <li className="mt-1">
                                    <Link href="shop/breadcrumb-img?category=rope-light" className="has-line-before caption1 text-secondary hover:text-black">Rope-Light</Link>
                                </li>
                                <li className="mt-1">
                                    <Link href="shop/breadcrumb-img?category=cantelever" className="has-line-before caption1 text-secondary hover:text-black">Cantelever</Link>
                                </li>
                               
                            </ul>
                            <Link href='/shop/breadcrumb-img?type=pop-surface' className='flex items-center gap-1.5 mt-4'>
                                <span className="text-button">All Surface Lights</span>
                                <i className="ph-bold ph-caret-double-right text-sm"></i>
                            </Link>
                        </div>
                    </div>
                    {/* Collection Item 3 */}
                    <div className="item flex gap-3 px-5 py-6 border border-line rounded-2xl">
                        <Link href='/shop/breadcrumb-img?type=outdoor-light' className='img-product w-[100px] h-[100px] flex-shrink-0'>
                            <Image width={5000} height={5000} src='/images/collection/marketplace3.png' className='w-full h-full object-cover' alt='img' />
                        </Link>
                        <div className="text-content w-full">
                            <div className="heading6 pb-4">Outdoor Lights</div>
                            <ul>
                                <li>
                                    <Link href="shop/breadcrumb-img?category=flood-light" className="has-line-before caption1 text-secondary hover:text-black">Flood Light</Link>
                                </li>
                                <li className="mt-1">
                                    <Link href="shop/breadcrumb-img?category=wall-light" className="has-line-before caption1 text-secondary hover:text-black">Outdoor Wall Light</Link>
                                </li>
                                <li className="mt-1">
                                    <Link href="shop/breadcrumb-img?category=garden-light" className="has-line-before caption1 text-secondary hover:text-black">Garden Light</Link>
                                </li>
                                <li className="mt-1">
                                    <Link href="shop/breadcrumb-img?category=floor-light" className="has-line-before caption1 text-secondary hover:text-black">Floor Light</Link>
                                </li>
                            </ul>
                            <Link href='/shop/breadcrumb-img?type=outdoor-light' className='flex items-center gap-1.5 mt-4'>
                                <span className="text-button">All Outdoor Lights</span>
                                <i className="ph-bold ph-caret-double-right text-sm"></i>
                            </Link>
                        </div>
                    </div>
                    {/* Collection Item 4 */}
                    <div className="item flex gap-3 px-5 py-6 border border-line rounded-2xl">
                        <Link href='/shop/breadcrumb-img?type=solar-light' className='img-product w-[100px] h-[100px] flex-shrink-0'>
                            <Image width={5000} height={5000} src='/images/collection/marketplace4.png' className='w-full h-full object-cover' alt='img' />
                        </Link>
                        <div className="text-content w-full">
                            <div className="heading6 pb-4">Solar Light</div>
                            <ul>
                                <li>
                                    <Link href="shop/breadcrumb-img?category=solar-floor-light" className="has-line-before caption1 text-secondary hover:text-black">Solar Flood Light</Link>
                                </li>
                                <li className="mt-1">
                                    <Link href="shop/breadcrumb-img?category=solar-street-light" className="has-line-before caption1 text-secondary hover:text-black">Solar Street Light</Link>
                                </li>
                                <li className="mt-1">
                                    <Link href="shop/breadcrumb-img?category=solar-wall-light" className="has-line-before caption1 text-secondary hover:text-black">Solar Wall Light</Link>
                                </li>
                               
                            </ul>
                            <Link href='/shop/breadcrumb-img?type=solar-light' className='flex items-center gap-1.5 mt-4'>
                                <span className="text-button">All Solar Lights</span>
                                <i className="ph-bold ph-caret-double-right text-sm"></i>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Collection;