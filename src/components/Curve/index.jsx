'use client';
import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation';
import { text, curve, translate } from './anim';

const routes = {
    "/": "Home",
    "/about": "About",
    "/contact": "Contact"
}

const anim = (variants) => {
    return {
        variants,
        initial: "initial",
        animate: "enter",
        exit: "exit"
    }
}
const SVG = ({ height, width }) => {

    const initialPath = `
        M0 300 
        Q${width / 2} 0 ${width} 300
        L${width} ${height + 300}
        Q${width / 2} ${height + 600} 0 ${height + 300}
        L0 0
    `

    const targetPath = `
        M0 300
        Q${width / 2} 0 ${width} 300
        L${width} ${height}
        Q${width / 2} ${height} 0 ${height}
        L0 0
    `

    return (
        <motion.svg {...anim(translate)} >
            <motion.path {...anim(curve(initialPath, targetPath))} />
        </motion.svg>
    )
}

export default function Curve({ children }) {
    const router = useRouter();
    const [ dimensions, setDimensions ] = useState({
        width: null,
        height: null
    })

    useEffect(() => {
        function resize() {
            setDimensions({
                width: window.innerWidth,
                height: window.innerHeight
            })
        }
        resize();
        window.addEventListener("resize", resize)
        return () => {
            window.removeEventListener("resize", resize);
        }
    }, [])

    return (
        <div className='page curve '>
            <div style={{ opacity: dimensions.width == null ? 1 : 0 }} className='background' />
            <p className=' text-white'>
                home
            </p>
            {dimensions.width != null && <SVG {...dimensions} />}
            {
                children
            }
        </div>
    )
}

