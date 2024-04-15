import Link from 'next/link';
import React from 'react'

interface ButtonProps {
    tittle?: string;
    url: string;
}
function Button(props: ButtonProps) {
    return (
        <Link href={props.url}>
            <div className=' uppercase relative px-6 py-2 border  border-white  rounded-3xl flex justify-center place-items-center flex-col gap-1.5  before:absolute before:left-0 before:top-1/2 hover:before:top-0 before:h-0 before:z-1 before:rounded-sm hover:before:rounded-full before:transition-all before:duration-500 before:origin-left before:w-0 before:bg-accent/60 hover:before:w-full hover:before:h-full hover:before:origin-right  '>
                {props.tittle}
            </div>
        </Link>
    )
}

export default Button;