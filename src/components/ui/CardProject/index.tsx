import { ProjectType } from '@/lib/data';

import React, { useEffect, useState } from 'react'
import "./style.css"
interface cardProjectProps {
    data: ProjectType
    position: number;

}
function CardProject(prop: cardProjectProps) {
    const [isHover, setIshover] = useState<boolean>(false);

    function formatNumber(num: number) {
        return num < 10 ? '0' + num : String(num);
    }
    const numberElement = document.getElementById(prop.data.image);
    const formattedNumber = formatNumber(prop.position + 1);

    numberElement?.setAttribute('data-formatted-number', formattedNumber);
    return (
        <div className={` w-full lg:w-1/2 h-80 border-2 border-secondary relative ${prop.position % 2 === 0 ? " lg:ml-20 place-self-center " : " lg:mr-20 place-self-center"} ${prop.data.image} bg-cover bg-center   `}>
            <div
                onMouseEnter={() => setIshover(true)}
                onMouseLeave={() => setIshover(false)}
                className=" before:peer  bg-black/40 h-full w-full relative before:absolute before:content-[''] before:h-full before:z-10 before:transition-all before:duration-500 before:w-0 before:origin-left before:bg-secondary/75 hover:before:w-full hover:before:origin-right">
                <div className={` absolute bottom-10 left-10 z-20  duration-300 transition-transform  ease-out ${isHover ? " lg:scale-125 -translate-y-5 lg:translate-x-10" : ""}`}>
                    <h1 className=' font-Hind font-bold text-xl '>

                        {prop.data.name}
                    </h1>
                    <i className=' font-light font-Hind'>

                        {prop.data.label}
                    </i>
                </div>
            </div>
            <div className={`absolute -top-14 ${prop.position === 0 ? "lg:-right-5" : "lg:-left-5"}  text-[120px] font-Hind font-bold z-20 h-32 overflow-hidden`}>
                <h1 id={prop.data.image} className={` ${isHover ? " translate-y-0 opacity-100 " : "translate-y-full opacity-0"}  duration-300 transition-all  ease-out text-white/50 relative before:overflow-hidden before:content-["${String(prop.position + 1).padStart(2, '0')}"] before:delay-600 before:absolute before:text-white  ${isHover ? " before:translate-y-0  " : "before:translate-y-full"} before:transition-transform before:duration-500 before:ease-out `}>
                    {String(prop.position + 1).padStart(2, '0')}
                </h1>
            </div>

        </div>

    )
}

export default CardProject;