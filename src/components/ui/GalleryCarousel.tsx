"use client"
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, FreeMode } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';
import PhotoCard from './PhotoCard';
import { PhotoType } from '@/lib/data/gallery-data';

interface GalleryCarouselProps {
    photos: PhotoType[];
}

const GalleryCarousel = ({ photos }: GalleryCarouselProps) => {
    return (
        <div className="w-full py-10 overflow-visible">
            <Swiper
                modules={[FreeMode, Autoplay]}
                freeMode={true}
                loop={true}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                }}
                breakpoints={{
                    320: {
                        slidesPerView: 1.2,
                        spaceBetween: 20,
                    },
                    640: {
                        slidesPerView: 2.2,
                        spaceBetween: 30,
                    },
                    1024: {
                        slidesPerView: 3.2,
                        spaceBetween: 40,
                    },
                    1440: {
                        slidesPerView: 3.8,
                        spaceBetween: 50,
                    },
                }}
                className="gallery-swiper !overflow-visible"
            >
                {photos.map((photo) => (
                    <SwiperSlide key={photo.id} className="!h-auto">
                        <PhotoCard photo={photo} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default GalleryCarousel;
