"use client"
import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { PhotoType, getDriveImageUrl } from '@/lib/data/gallery-data';
import Image from 'next/image';

interface PhotoCardProps {
    photo: PhotoType;
}

const PhotoCard = ({ photo }: PhotoCardProps) => {
    // Generate a random rotation between -10 and 10 degrees
    const randomRotation = useMemo(() => Math.random() * 20 - 10, []);

    return (
        <motion.div
            initial={{ rotate: randomRotation, scale: 0.95, opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            whileHover={{
                rotate: 0,
                scale: 1.05,
                zIndex: 50,
                transition: { type: 'spring', stiffness: 300, damping: 20 }
            }}
            className="relative aspect-[4/5] w-full bg-white/5 border border-white/10 rounded-2xl overflow-hidden shadow-2xl cursor-pointer group"
        >
            <Image
                src={getDriveImageUrl(photo.driveId)}
                alt={photo.title || 'Gallery image'}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <h3 className="text-white font-bold font-Hind text-lg">{photo.title?.replace(/\.[^/.]+$/, "")}</h3>
                <p className="text-white/70 text-sm">{photo.description}</p>
            </div>
        </motion.div>
    );
};

export default PhotoCard;
