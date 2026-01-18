import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Button from './Button';
import GalleryCarousel from './GalleryCarousel';
import { getGalleryPhotosAction } from '@/lib/actions/googleDrive';
import { PhotoType, galleryPhotos as staticPhotos } from '@/lib/data/gallery-data';

const GallerySection = () => {
    const [photos, setPhotos] = useState<PhotoType[]>([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const fetchPhotos = async () => {
            try {
                console.log('GallerySection: Fetching dynamic photos...');
                const dynamicPhotos = await getGalleryPhotosAction();
                console.log('GallerySection: Received dynamic photos:', dynamicPhotos?.length || 0);

                if (dynamicPhotos && dynamicPhotos.length > 0) {
                    setPhotos(dynamicPhotos);
                } else {
                    console.log('GallerySection: No dynamic photos found, falling back to static.');
                    setPhotos(staticPhotos);
                }
            } catch (error) {
                console.error('GallerySection: Failed to fetch gallery photos:', error);
                setPhotos(staticPhotos);
            } finally {
                setLoading(false);
            }
        };

        fetchPhotos();
    }, []);

    return (
        <section className="relative xl:px-64 px-5 lg:px-32 pt-20 text-white flex flex-col overflow-hidden">
            <Image
                src={'/img/grid2.svg'}
                width={170}
                height={170}
                className="absolute -z-10 top-10 left-10 opacity-20"
                alt="grid"
            />

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
                <div className="flex flex-col">
                    <span className="text-xl font-light tracking-wider">
                        <span className="font-bold text-2xl">{`<`}</span> My_Capture <span className="font-bold text-2xl">{`/>`}</span>
                    </span>
                    <i className="text-sm  md:text-md font-light font-Montserrat mt-4 text-white">
                        Life through my lens
                    </i>
                </div>

                <div className="flex-shrink-0">
                    <Button
                        tittle="Voir la galerie"
                        url="/gallery"
                    />
                </div>
            </div>

            {loading ? (
                <div className="w-full h-80 flex items-center justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-secondary"></div>
                </div>
            ) : (
                <GalleryCarousel photos={photos} />
            )}

            <Image
                src={'/img/grid.svg'}
                width={170}
                height={170}
                className="absolute -z-10 bottom-10 right-10 opacity-20"
                alt="grid"
            />
        </section>
    );
};

export default GallerySection;
