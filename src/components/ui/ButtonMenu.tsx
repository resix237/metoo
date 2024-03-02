"use client"
import React, { useState } from 'react'

function ButtonMenu() {
    const [open, setOpen] = useState<boolean>(false);
    return (
        <div onClick={() => setOpen(!open)} className=" border  border-white w-12 h-12 rounded-full flex justify-center place-items-center flex-col gap-1.5 relative before:absolute before:left-0 before:top-1/2 hover:before:top-0 before:h-0 before:z-1 before:rounded-sm hover:before:rounded-full before:transition-all before:duration-500 before:origin-left before:w-0 before:bg-secondary/60 hover:before:w-full hover:before:h-full hover:before:origin-right  ">

            <hr className={`w-7 bg-white h-[1px] rounded-lg transition-all duration-200 ${open ? "rotate-45 absolute" : ""} `} />
            <hr className={`w-7 bg-white h-[1px] rounded-lg transition-all duration-200 ${open ? "-rotate-45 absolute" : ""} `} />
            <hr className={`w-7 bg-white h-[1px] rounded-lg transition-all duration-200 ${open ? "rotate-45 absolute" : ""} `} />

            {/* <hr className={`w-7 bg-white h-[1px] rounded-lg transition-all duration-200 ${open && "-rotate-[40deg] transition-all duration-200 "} `} />
            <hr className={`w-7 bg-white h-[1px] rounded-lg transition-all duration-200 ${open && "rotate-[40deg] transition-all duration-200 "} `} /> */}
        </div>
    )
}

export default ButtonMenu