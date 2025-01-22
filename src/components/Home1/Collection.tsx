'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import 'swiper/css/bundle';
import { useRouter } from 'next/navigation';
// import Fade from 'react-reveal'

const Collection = () => {
    const router = useRouter()

    const handleTypeClick = (type: string) => {
        router.push(`/shop/breadcrumb-img?type=${type}`);
    };

    return (
        <>
            <div className="collection-block md:pt-20 pt-10">
                <div className="container">
                    <div className="heading3 text-center">Explore Collections</div>
                </div>
                <div className="list-collection section-swiper-navigation md:mt-10 mt-6 sm:px-5 px-4">
                    <Swiper
                        spaceBetween={12}
                        slidesPerView={2}
                        navigation
                        loop={true}
                        modules={[Navigation, Autoplay]}
                        breakpoints={{
                            576: {
                                slidesPerView: 2,
                                spaceBetween: 12,
                            },
                            768: {
                                slidesPerView: 3,
                                spaceBetween: 20,
                            },
                            1200: {
                                slidesPerView: 4,
                                spaceBetween: 20,
                            },
                        }}
                        className='h-full'
                    >
                        <SwiperSlide>
                            <div className="collection-item block relative rounded-2xl overflow-hidden cursor-pointer" onClick={() => handleTypeClick('solar-light')}>
                                <div className="bg-img">
                                    <Image
                                        src={'/images/collection/solar-light.png'}
                                        width={1000}
                                        height={600}
                                        alt='solar-light'
                                    />
                                </div>
                                <div className="collection-name heading5 text-center sm:bottom-8 bottom-4 lg:w-[200px] md:w-[160px] w-[100px] md:py-3 py-1.5 bg-white rounded-xl duration-500">solar-light</div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="collection-item block relative rounded-2xl overflow-hidden cursor-pointer" onClick={() => handleTypeClick('top')}>
                                <div className="bg-img">
                                    <Image
                                        src={'/images/collection/top.png'}
                                        width={1000}
                                        height={600}
                                        alt='top'
                                    />
                                </div>
                                <div className="collection-name heading5 text-center sm:bottom-8 bottom-4 lg:w-[200px] md:w-[160px] w-[100px] md:py-3 py-1.5 bg-white rounded-xl duration-500">top</div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="collection-item block relative rounded-2xl overflow-hidden cursor-pointer" onClick={() => handleTypeClick('sets')}>
                                <div className="bg-img">
                                    <Image
                                        src={'/images/collection/sets.png'}
                                        width={1000}
                                        height={600}
                                        alt='sets'
                                    />
                                </div>
                                <div className="collection-name heading5 text-center sm:bottom-8 bottom-4 lg:w-[200px] md:w-[160px] w-[100px] md:py-3 py-1.5 bg-white rounded-xl duration-500">sets</div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="collection-item block relative rounded-2xl overflow-hidden cursor-pointer" onClick={() => handleTypeClick('outerwear')}>
                                <div className="bg-img">
                                    <Image
                                        src={'/images/collection/outerwear.png'}
                                        width={1000}
                                        height={600}
                                        alt='outerwear'
                                    />
                                </div>
                                <div className="collection-name heading5 text-center sm:bottom-8 bottom-4 lg:w-[200px] md:w-[160px] w-[100px] md:py-3 py-1.5 bg-white rounded-xl duration-500">outerwear</div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="collection-item block relative rounded-2xl overflow-hidden cursor-pointer" onClick={() => handleTypeClick('ceiling-Fittings')}>
                                <div className="bg-img">
                                    <Image
                                        src={'/images/collection/ceiling-Fittings.png'}
                                        width={1000}
                                        height={600}
                                        alt='ceiling-Fittings'
                                    />
                                </div>
                                <div className="collection-name heading5 text-center sm:bottom-8 bottom-4 lg:w-[200px] md:w-[160px] w-[100px] md:py-3 py-1.5 bg-white rounded-xl duration-500">ceiling-Fittings</div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="collection-item block relative rounded-2xl overflow-hidden cursor-pointer" onClick={() => handleTypeClick('chandeliers')}>
                                <div className="bg-img">
                                    <Image
                                        src={'/images/collection/chandeliers.png'}
                                        width={1000}
                                        height={600}
                                        alt='chandeliers'
                                    />
                                </div>
                                <div className="collection-name heading5 text-center sm:bottom-8 bottom-4 lg:w-[200px] md:w-[160px] w-[100px] md:py-3 py-1.5 bg-white rounded-xl duration-500">chandeliers</div>
                            </div>
                        </SwiperSlide>
                    </Swiper>
                </div>
            </div>
        </>
    )
}

export default Collection