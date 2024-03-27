"use client"

import React, { Fragment, useLayoutEffect, useState, useRef } from 'react'
import gsap from 'gsap';
import SplitText from "../../utils/Split3.min";
import { document } from 'postcss';

function ButtonMenu() {
    const [ open, setOpen ] = useState(false);

    function closeAndOpenMenu() {
        setOpen(!open)
        const t1 = gsap.timeline()
        const split = new SplitText(".animate-text2", {
            type: "lines",
            linesClass: "lineChildren",
        });
        const splitParent = new SplitText(".animate-text2", {
            type: "lines",
            linesClass: "lineParent",
        });

        if (open) {
            t1.to("#toggle-menu", {
                xPercent: "-100",
                duration: .8,
                delay: 0.3,
                ease: "power2",
            })
            const gsapText = gsap.utils.toArray(".animate-text2");
            gsapText.forEach((gspItem) => {
                const wordItem = gspItem.querySelectorAll("div");
                let tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: gspItem,
                        start: "top 90%",
                        end: "70% 80%",
                        toggleActions: "restart none none none"
                    }
                });
                tl.from(wordItem, {
                    duration: 1,
                    y: 0,
                    opacity: 1,
                    stagger: 0.1,
                    delay: 0.4,
                    ease: "power4",
                });
            })
        }
        else {
            t1.to("#toggle-menu", {
                xPercent: "100",
                duration: .8,
                delay: 0.3,
                ease: "power2",
            })
            const gsapText = gsap.utils.toArray(".animate-text2");
            gsapText.forEach((gspItem) => {
                const wordItem = gspItem.querySelectorAll("div");
                let tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: gspItem,
                        start: "top 90%",
                        end: "70% 80%",
                        toggleActions: "restart none none none"
                    }
                });
                tl.to(wordItem, {
                    duration: 1,
                    y: 0,
                    opacity: 1,
                    stagger: 0.1,
                    delay: 0.4,
                    ease: "power4",
                });
            })
        }
    }
    let t1 = useRef(gsap.timeline())
    const comp1 = useRef(null)
    const handleMenuOpen = () => {
        setOpen(!open)
        t1.current.reversed(!t1.current.reversed());
    };
    useLayoutEffect(() => {

        const split = new SplitText(".menu", {
            type: "lines",
            linesClass: "lineChildren",
        });
        const splitParent = new SplitText(".menu", {
            type: "lines",
            linesClass: "lineParent",
        });
        t1.current.to(".toggle-menu", {
            right: 0,
            duration: .6,
            ease: "easeOut",
            stagger: 0.6,
        })
        t1.current.to(
            split.lines, {
            duration: .3,
            y: 0,
            opacity: 1,
            stagger: 0.1,
            delay: 0.3,
            ease: "power4",
        }
        );


        t1.current.reverse()



    }, [])
    return (
        <Fragment>
            <div className='fixed z-50 lg:right-40 top-20 right-10'>

                <div onClick={() => handleMenuOpen()} className=" relative  border  border-white w-12 h-12 rounded-full flex justify-center place-items-center flex-col gap-1.5  before:absolute before:left-0 before:top-1/2 hover:before:top-0 before:h-0 before:z-1 before:rounded-sm hover:before:rounded-full before:transition-all before:duration-500 before:origin-left before:w-0 before:bg-accent/60 hover:before:w-full hover:before:h-full hover:before:origin-right  ">

                    <hr className={`w-7 bg-white h-[1px] rounded-lg transition-all duration-200 ${open ? "rotate-45 absolute" : ""} `} />
                    <hr className={`w-7 bg-white h-[1px] rounded-lg transition-all duration-200 ${open ? "-rotate-45 absolute" : ""} `} />
                    <hr className={`w-7 bg-white h-[1px] rounded-lg transition-all duration-200 ${open ? "rotate-45 absolute" : ""} `} />

                    {/* <hr className={`w-7 bg-white h-[1px] rounded-lg transition-all duration-200 ${open && "-rotate-[40deg] transition-all duration-200 "} `} />
<hr className={`w-7 bg-white h-[1px] rounded-lg transition-all duration-200 ${open && "rotate-[40deg] transition-all duration-200 "} `} /> */}

                </div>
            </div>
            <div ref={comp1} className='toggle-menu fixed h-screen bg-black w-screen -right-[100%] top-0 z-30 flex'>
                <div className='  lg:basis-1/2 lg:flex hidden justify-center place-items-center '>
                    <h1 className=' menu font-Hind text-4xl font-light uppercase text-white tracking-widest'>
                        Menu
                    </h1>
                </div>
                <div className=' lg:basis-1/2 basis-full flex flex-col justify-center'>

                    <div className='  uppercase text-5xl font-Hind text-white gap-10 flex flex-col pb-20'>
                        <h1 className='menu '>About</h1>
                        <h1 className='menu'>Work</h1>
                        <h1 className='menu'>Experience</h1>
                        <h1 className='menu'>Blog</h1>
                        <h1 className='menu'>Contact</h1>
                    </div>
                </div>
            </div>

        </Fragment>

    )
}

export default ButtonMenu