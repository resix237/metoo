import React from 'react'
import { SwiperSlide } from 'swiper/react';
import Image from "next/image";
import Link from 'next/link';
import { ResponseScrapping } from '@/lib/types';

interface ItemCarrouselProps {
    data: ResponseScrapping
}
function ItemCarrousel({ data }: ItemCarrouselProps) {
    console.log(data);

    return (

        <a target="_blank" href="https://www.linkedin.com/in/fouda-marc-arthur-03372a239/recent-activity/all/" rel="noopener noreferrer">
            <div className=' w-full h-full p-5 relative '>
                <div className={` h-40 w-full `}>
                    { }
                    {
                        data?.image ? <Image
                            src={data?.image}
                            width={100}
                            height={100}
                            className=" h-40 w-full object-cover "
                            alt="linkedin"
                            priority={true}

                        /> :
                            // data?.video ?
                            //     <video
                            //         className=' h-full w-full object-cover'
                            //         preload="metadata"
                            //         poster={data?.video}
                            //         src={data?.video}
                            //     >

                            //     </video>
                            //     :
                            <Image
                                src={"/img/default-img.svg"}
                                width={100}
                                height={100}
                                className=" h-40 w-full object-cover "
                                alt="linkedin"
                                priority={true}

                            />

                    }
                    { }
                    {/* <video className=' h-full w-full' preload="metadata" poster="https://media.licdn.com/dms/image/D4E05AQF6L_vWWfNf6A/videocover-high/0/1691322428023?e=1713783600&amp;v=beta&amp;t=BRGPxUB-7XmN4dBzrkT1UmZnX9iu_PQFVw7zzYhoxM0" src="blob:https://www.linkedin.com/2968ebbc-6048-4bde-ae2b-d5f3e066299b" ></video> */}
                </div>

                <p className=' text-sm font-Hind font-light text-start  h-20  whitespace-normal truncate pt-5 '>
                    {
                        data.description
                    }
                </p>
                <div className='absolute -z-10 bottom-5 right-5'>

                    <Image
                        src={'/img/linkedin.svg'}
                        width={17}
                        height={17}
                        className="  "
                        alt="linkedin"
                        priority={true}

                    />
                </div>
            </div >
        </a>
    )
}

export default ItemCarrousel;