import Image from 'next/image'
import React from 'react'

const BannerAbove = () => {
    return (
        <div className="banner-block md:pt-10 pt-8">
            <div className="container">
                <div className="list-banner grid lg:grid-cols-3 sm:grid-cols-2 lg:gap-[30px] gap-[20px]">
                    <a href='/shop/breadcrumb-img'
                        className="banner-item relative py-[53.5px] px-10 bg-[#63B89F] block duration-500 rounded-2xl overflow-hidden">
                        <div className="banner-img w-1/2 absolute top-1/2 -translate-y-1/2 right-10">
                            <Image width={5000} height={5000} src='/images/banner/marketplace1.png' className='w-full duration-500' alt='img' />
                        </div>
                        <div className="banner-content relative">
                            <div className="heading6 text-white">Chandeliers<br />Save Up To ₦5,000</div>
                            <div
                                className="text-button text-white relative inline-block pb-1 border-b-2 border-white duration-500 mt-2">
                                Shop Chandeliers</div>
                        </div>
                    </a>
                    <a href='/shop/breadcrumb-img?type=chandeliers'
                        className="banner-item relative py-[53.5px] px-10 bg-[#8684D4] block duration-500 rounded-2xl overflow-hidden">
                        <div className="banner-img w-1/2 absolute top-1/2 -translate-y-1/2 right-10">
                            <Image width={5000} height={5000} src='/images/banner/marketplace2.png' className='w-full duration-500' alt='img' />
                        </div>
                        <div className="banner-content relative">
                            <div className="heading6 text-white">Solar-Lights <br />Save Up To ₦10,000</div>
                            <div
                                className="text-button text-white relative inline-block pb-1 border-b-2 border-white duration-500 mt-2">
                                Shop Deals</div>
                        </div>
                    </a>
                    <a href='/shop/breadcrumb-img'
                        className="banner-item relative py-[53.5px] px-10 bg-[#BE4468] block duration-500 max-lg:hidden max-sm:block rounded-2xl overflow-hidden">
                        <div className="banner-img w-1/2 absolute top-1/2 -translate-y-1/2 right-10">
                            <Image width={5000} height={5000} src='/images/banner/marketplace3.png' className='w-full duration-500' alt='img' />
                        </div>
                        <div className="banner-content relative">
                            <div className="heading6 text-white">Track-Light<br />Save Up To ₦7,500</div>
                            <div
                                className="text-button text-white relative inline-block pb-1 border-b-2 border-white duration-500 mt-2">
                                Shop Now!</div>
                        </div>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default BannerAbove
