import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import './style.css';
import { Autoplay, FreeMode, Pagination } from 'swiper/modules';
import ItemCarrousel from './ItemCarrousel';
import { ResponseScrapping } from '@/lib/types';


interface CarrouselProps {
    data: ResponseScrapping[]
}
function Carrousel({ data }: CarrouselProps) {
    return (
        <div className=' h-96 py-4 border-x-2 border-accent  '>
            <div className='relative h-full py-5'>
                <div className=' w-28 h-full absolute left-0 top-0 bg-gradient-to-r from-accent/40 ...'>

                </div>
                <div className=' w-28 h-full absolute right-0 top-0 bg-gradient-to-l from-accent/40 ...'>

                </div>
                <Swiper

                    freeMode={true}
                    breakpoints={{
                        // when window width is >= 640px
                        600: {
                            width: 640,
                            slidesPerView: 1,
                            spaceBetween: 10,
                        },
                        // when window width is >= 768px
                        768: {
                            width: 768,
                            slidesPerView: 2,
                            spaceBetween: 50,
                        },
                    }}
                    autoplay={{
                        delay: 5000,
                        pauseOnMouseEnter: true,
                        disableOnInteraction: false,

                    }}
                    modules={[FreeMode, Autoplay]}
                    className="mySwiper"
                >


                    {
                        data?.map((item, index) => (
                            <SwiperSlide key={index} className=' border-2 border-accent bg-black shadow-xl shadow-accent '>
                                <ItemCarrousel data={item} />
                            </SwiperSlide>
                        ))
                    }
                </Swiper>
            </div>

        </div>
    )
}

export default Carrousel;