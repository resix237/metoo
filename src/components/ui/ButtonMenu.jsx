"use client"

import React, { Fragment, useLayoutEffect, useState, useRef, useEffect } from 'react'
import gsap from 'gsap';
import SplitText from "../../utils/Split3.min";
import { document } from 'postcss';

function ButtonMenu() {
    const [ open, setOpen ] = useState(false);
    const [ hoverItem, setHoverItem ] = useState(0);
    let t1 = useRef()
    const comp1 = useRef()
    const handleMenuOpen = () => {
        setOpen(!open)
    };
    useLayoutEffect(() => {
        t1.current = gsap.timeline({ paused: true })
        t1.current.to(comp1.current, {
            right: 0,
            ease: "easeOut",

        })
        t1.current.to('.menu', {
            duration: .3,
            y: 0,
            opacity: 1,
            stagger: 0.1,
            delay: 0.2,
            ease: "easeOut",
        });


    }, [])

    useEffect(() => {
        open ? t1.current.play() : t1.current.reverse()
    }, [ open ])


    return (
        <Fragment>
            <div className='fixed z-40 lg:right-40 top-15 right-10'>

                <div onClick={() => handleMenuOpen()} className=" relative  border  border-white w-12 h-12 rounded-full flex justify-center place-items-center flex-col gap-1.5  before:absolute before:left-0 before:top-1/2 hover:before:top-0 before:h-0 before:z-1 before:rounded-sm hover:before:rounded-full before:transition-all before:duration-500 before:origin-left before:w-0 before:bg-accent/60 hover:before:w-full hover:before:h-full hover:before:origin-right  ">

                    <hr className={`w-7 bg-white h-[1px] rounded-lg transition-all duration-200 ${open ? "rotate-45 absolute" : ""} `} />
                    <hr className={`w-7 bg-white h-[1px] rounded-lg transition-all duration-200 ${open ? "-rotate-45 absolute" : ""} `} />
                    <hr className={`w-7 bg-white h-[1px] rounded-lg transition-all duration-200 ${open ? "rotate-45 absolute" : ""} `} />

                    {/* <hr className={`w-7 bg-white h-[1px] rounded-lg transition-all duration-200 ${open && "-rotate-[40deg] transition-all duration-200 "} `} />
<hr className={`w-7 bg-white h-[1px] rounded-lg transition-all duration-200 ${open && "rotate-[40deg] transition-all duration-200 "} `} /> */}

                </div>
            </div>
            <div ref={comp1} className='toggle-menu fixed h-screen bg-background bg-opacity-95 w-screen -right-[100%] top-0 z-30 flex'>
                <div className='  lg:basis-1/2 lg:flex hidden justify-center place-items-center '>
                    <div className=' h-10 overflow-hidden'>
                        <h1 className=' menu opacity-0  translate-y-10 font-Hind text-4xl font-light uppercase text-white tracking-widest'>
                            Menu
                        </h1>
                    </div>
                </div>
                <div className='relative lg:basis-1/2 basis-full place-items-center lg:place-items-start flex flex-col justify-center'>

                    <div className='  uppercase text-5xl font-Hind text-white gap-10 flex flex-col pb-20'>
                        <div
                            onMouseEnter={() => {
                                setHoverItem(1)
                            }}
                            onMouseLeave={() => {
                                setHoverItem(0)
                            }}
                            className=' h-10 overflow-hidden'>
                            <h1
                                className={`menu opacity-0  translate-y-10 cursor-pointer  transition-all ${hoverItem === 0 || hoverItem === 1 ? "" : "text-white/50  "}`}>About</h1>
                        </div>
                        <div
                            onMouseEnter={() => {
                                setHoverItem(2)
                            }}
                            onMouseLeave={() => {
                                setHoverItem(0)
                            }}
                            className=' h-10 overflow-hidden'>
                            <h1

                                className={`menu opacity-0  translate-y-10 cursor-pointer   transition-all ${hoverItem === 0 || hoverItem === 2 ? "" : "text-white/50  "}`}>Work</h1>
                        </div>
                        <div
                            onMouseEnter={() => {
                                setHoverItem(3)
                            }}
                            onMouseLeave={() => {
                                setHoverItem(0)
                            }}
                            className=' h-10 overflow-hidden'>
                            <h1

                                className={`menu opacity-0  translate-y-10 cursor-pointer  transition-all ${hoverItem === 0 || hoverItem === 3 ? "" : "text-white/50  "}`}>Experience</h1>
                        </div>
                        <div

                            onMouseEnter={() => {
                                setHoverItem(4)
                            }}
                            onMouseLeave={() => {
                                setHoverItem(0)
                            }}
                            className=' h-10 overflow-hidden'>
                            <h1

                                className={`menu opacity-0  translate-y-10 cursor-pointer  transition-all ${hoverItem === 0 || hoverItem === 4 ? "" : "text-white/50  "}`}>Blog</h1>
                        </div>
                        <div
                            onMouseEnter={() => {
                                setHoverItem(5)
                            }}
                            onMouseLeave={() => {
                                setHoverItem(0)
                            }}
                            className=' h-10 overflow-hidden'>
                            <h1

                                className={`menu opacity-0  translate-y-10 cursor-pointer  transition-all ${hoverItem === 0 || hoverItem === 5 ? "" : "text-white/50  ease-in-out duration-150 "}`}>Contact</h1>
                        </div>
                    </div>

                    <div className='absolute bottom-10 left-0 h-10 w-full lg:pl-0 lg:pr-10 px-10 pb-10 overflow-hidden  '>
                        <div className=' w-full  h-[1px] bg-white menu opacity-0  translate-y-10 '></div>
                        <div className='relative menu opacity-0  translate-y-10 pt-5 lg:pr-10  flex w-full justify-between lg:text-lg text-md uppercase text-white'>
                            <span>Linkedin</span>
                            <span>X(twitter)</span>
                            <span>Github</span>
                            <span>Figma</span>
                        </div>
                    </div>
                </div>
            </div>

        </Fragment>

    )
}

export default ButtonMenu