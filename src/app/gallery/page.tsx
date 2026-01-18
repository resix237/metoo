"use client"
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { PhotoType, galleryPhotos as staticPhotos } from '@/lib/data/gallery-data';
import PhotoCard from '@/components/ui/PhotoCard';
import { getGalleryPhotosAction } from '@/lib/actions/googleDrive';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const GalleryPage = () => {
    const [photos, setPhotos] = useState<PhotoType[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPhotos = async () => {
            try {
                const dynamicPhotos = await getGalleryPhotosAction();
                if (dynamicPhotos && dynamicPhotos.length > 0) {
                    setPhotos(dynamicPhotos);
                } else {
                    setPhotos(staticPhotos);
                }
            } catch (error) {
                console.error('Failed to fetch gallery photos:', error);
                setPhotos(staticPhotos);
            } finally {
                setLoading(false);
            }
        };

        fetchPhotos();
    }, []);

    return (
        <main className="min-h-screen bg-[#0e0a17] pt-32 pb-20 overflow-x-hidden">
            <div className="relative xl:px-64 px-5 lg:px-32 text-white flex flex-col">
                <Image
                    src={'/img/grid2.svg'}
                    width={170}
                    height={170}
                    className="absolute -z-10 top-0 left-10 opacity-20"
                    alt="background grid"
                />

                <h1 className="text-2xl md:text-4xl font-light font-Montserrat mb-10">
                    <span className="text-white tracking-tighter">My</span> Gallery
                </h1>

                <span className="text-xl font-light tracking-wider mb-16">
                    <span className="font-bold text-2xl">{`<`}</span> Photo_archives <span className="font-bold text-2xl">{`/>`}</span>
                </span>

                {loading ? (
                    <div className="w-full py-20 flex items-center justify-center">
                        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-secondary"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
                        {photos.map((photo) => (
                            <div key={photo.id} className="w-full">
                                <PhotoCard photo={photo} />
                            </div>
                        ))}
                    </div>
                )}

                <Image
                    src={'/img/grid.svg'}
                    width={170}
                    height={170}
                    className="absolute -z-10 bottom-10 right-10 opacity-20"
                    alt="background grid"
                />
            </div>
        </main>
    );
};

export default GalleryPage;
