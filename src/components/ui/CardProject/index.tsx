import React, { useState } from 'react'
import "./style.css"
interface cardProjectProps {
    position: number;
}
function CardProject(prop: cardProjectProps) {
    const [isHover, setIshover] = useState<boolean>(false);
    return (
        <div className={` w-full lg:w-1/2 h-80 border-2 border-secondary relative ${prop.position === 0 ? " lg:ml-20 place-self-center " : " lg:mr-20 place-self-center"} bg-[url('../assets/img/project-image.svg')] bg-cover bg-center   `}>
            <div
                onMouseEnter={() => setIshover(true)}
                onMouseLeave={() => setIshover(false)}
                className=" before:peer  bg-black/40 h-full w-full relative before:absolute before:content-[''] before:h-full before:z-10 before:transition-all before:duration-500 before:w-0 before:origin-left before:bg-secondary/75 hover:before:w-full hover:before:origin-right">
                <div className={` absolute bottom-10 left-10 z-20  duration-300 transition-transform  ease-out ${isHover ? " scale-125 -translate-y-5 translate-x-10" : ""}`}>
                    <h1 className=' font-Hind font-bold text-xl '>

                        Cerasa Redesign
                    </h1>
                    <i className=' font-light font-Hind'>

                        Leader in bathroom furniture since 1983.
                    </i>
                </div>
            </div>
            <div className={`absolute -top-14 ${prop.position === 0 ? "-right-5" : "-left-5"}  text-[120px] font-Hind font-bold z-20 h-32 overflow-hidden`}>
                <h1 className={`  ${isHover ? " translate-y-0 opacity-100 " : "translate-y-full opacity-0"} duration-300 transition-transform  ease-out text-white/50 relative before:overflow-hidden before:content-["01"] before:delay-600 before:absolute before:text-white before:translate-y-full ${isHover ? " before:translate-y-0  " : ""} before:transition-transform before:duration-500 before:ease-out `}>
                    01
                </h1>
            </div>

        </div>
    )
}

export default CardProject;