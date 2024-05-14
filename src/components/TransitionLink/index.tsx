"use client"
import { usePathname, useRouter } from "next/navigation"
import { animatePageOut } from "@/utils/animations"
import { HTMLAttributes } from "react"

interface Props extends HTMLAttributes<HTMLButtonElement> {
    href: string
    children: React.ReactNode

}

const TransitionLink = (props: Props) => {
    const router = useRouter()
    const pathname = usePathname()

    const handleClick = () => {
        if (pathname !== props.href) {
            animatePageOut(props.href, router)
        }
    }

    return (
        <button
            className=" cursor-pointer"
            onClick={handleClick}
            {...props}
        >
            {props.children}
        </button>
    )
}

export default TransitionLink