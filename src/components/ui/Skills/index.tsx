import React, { useState } from 'react';
import Image from "next/image";

function Skills() {
    const [skillStates, setSkillStates] = useState<number>(0)


    return (
        <div className=' w-full flex flex-col place-items-center  py-10'>
            <div className=' relative font-Hind md:text-xl text-white font-light flex md:w-[700px] sm:w-[400px] w-full text-md justify-between  sm:px-3'>
                <h1 className={` ${skillStates === 0 ? " before:sm:hidden  before:content-[''] before:absolute before:w-full before:h-[2px] before:bg-accent before:rounded-full before:-bottom-1 before:left-0 " : ""} before:transition-all before:duration-500 before:ease-in-out relative cursor-pointer w-[70px] md:w-[138px] text-center sm:text-start`} onClick={() => setSkillStates(0)}>Front-end</h1>
                <h1 className={` ${skillStates === 1 ? " before:sm:hidden  before:content-[''] before:absolute before:w-full before:h-[2px] before:bg-accent before:rounded-full before:-bottom-1 before:left-0 " : ""} before:transition-all before:duration-500 before:ease-in-out relative cursor-pointer w-[70px] md:w-[138px] text-center sm:text-start`} onClick={() => setSkillStates(1)}>Back-end</h1>
                <h1 className={` ${skillStates === 2 ? " before:sm:hidden  before:content-[''] before:absolute before:w-full before:h-[2px] before:bg-accent before:rounded-full before:-bottom-1 before:left-0 " : ""} before:transition-all before:duration-500 before:ease-in-out relative cursor-pointer w-[70px] md:w-[138px] text-center sm:text-start`} onClick={() => setSkillStates(2)}>Design</h1>
                <h1 className={` ${skillStates === 3 ? " before:sm:hidden  before:content-[''] before:absolute before:w-full before:h-[2px] before:bg-accent before:rounded-full before:-bottom-1 before:left-0 " : ""} before:transition-all before:duration-500 before:ease-in-out relative cursor-pointer w-[70px] md:w-[138px] text-center sm:text-start`} onClick={() => setSkillStates(3)}>Devops</h1>
                <div className={` hidden sm:block absolute h-7 w-24 z-10 md:h-10 md:w-32 bg-accent/40  border-2 border-accent rounded-3xl md:-bottom-1.5 -bottom-[2px] transition-all ease-in-out duration-500 ${skillStates === 0 ? " sm:-translate-x-3.5 md:-translate-x-5 " : skillStates === 1 ? " sm:translate-x-[87px] md:translate-x-[155px] " : skillStates === 2 ? "sm:translate-x-[180px] md:translate-x-[320px]" : "translate-x-[280px] md:translate-x-[510px]"}`}>

                </div>

            </div>
            <div className=' flex w-full' >
                <div className=' hidden lg:flex flex-col w-96  justify-center text-xl font-Hind text-white uppercase text-start pl-28 gap-3'>
                    {
                        skillStates === 0 ? (
                            <>
                                <h1 className=' animate-text '>Next js</h1>
                                <h1 className=' animate-text '>Reactjs</h1>
                                <h1 className=' animate-text '>Typescript</h1>
                                <h1 className=' animate-text '>Tailwindcss</h1>
                            </>
                        )
                            : skillStates === 1 ? (
                                <>
                                    <h1 className=' animate-text '>Django</h1>
                                    <h1 className=' animate-text '>Nestjs</h1>
                                    <h1 className=' animate-text '>Python</h1>
                                    <h1 className=' animate-text '>Typescript</h1>
                                </>
                            )
                                :
                                skillStates === 2 ? (
                                    <>
                                        <h1 className=' animate-text '>Figma</h1>
                                        <h1 className=' animate-text '>Adobe XD</h1>

                                    </>
                                ) :
                                    (
                                        <>
                                            <h1 className=' animate-text '>Docker</h1>
                                            <h1 className=' animate-text '>Jenkins</h1>
                                            <h1 className=' animate-text '>Kubernetes</h1>
                                            <h1 className=' animate-text '>GitLab</h1>

                                        </>
                                    )

                    }
                </div>
                <div className=' flex-grow justify-center place-items-center relative h-48 lg:h-96 '>
                    <div className=" block absolute opacity-70 filter blur-3xl lg:min-h-96  min-h-44 top-1/2 lg:top-0 lg:min-w-96   min-w-full rounded-full bg-secondary ">
                    </div>
                    <div className=' absolute top-1/4 lg:left-1/4 left-1/2 '>
                        {
                            skillStates === 0 ? (
                                <>
                                    <Image
                                        src={'/img/skils/nextjs.svg'}
                                        title="NextJs"
                                        width={100}
                                        height={80}
                                        className=" z-20  lg:right-0 lg:bottom-0 animate-spher   "
                                        alt="linkedin"
                                        priority={true}
                                    />
                                    <Image
                                        src={'/img/skils/reactjs.svg'}
                                        title="Reactjs"
                                        width={60}
                                        height={60}
                                        className=" z-20  lg:left-20 lg:bottom-10 animate-spher animation-delay-2000  "
                                        alt="linkedin"
                                        priority={true}
                                    />
                                    <Image
                                        src={'/img/skils/typescript.svg'}
                                        title="Typescript"
                                        width={60}
                                        height={60}
                                        className=" z-20  lg:left-8 lg:bottom-0 animate-spher animation-delay-4000  "
                                        alt="linkedin"
                                        priority={true}
                                    />
                                    <Image
                                        src={'/img/skils/tailwind.svg'}
                                        title="Tailwindcss"
                                        width={120}
                                        height={100}
                                        className=" z-20  lg:top-0 lg:bottom-0 animate-spher animation-delay-2000  "
                                        alt="linkedin"
                                        priority={true}
                                    />
                                </>
                            )
                                :
                                skillStates === 1 ? (
                                    <>
                                        <Image
                                            src={'/img/skils/backend/django.svg'}
                                            title="Django"
                                            width={100}
                                            height={80}
                                            className=" z-20  lg:right-0 lg:bottom-0 animate-spher   "
                                            alt="linkedin"
                                            priority={true}
                                        />
                                        <Image
                                            src={'/img/skils/backend/nestjs.svg'}
                                            title="NestJs"
                                            width={60}
                                            height={60}
                                            className=" z-20  lg:left-20 lg:bottom-10 animate-spher animation-delay-2000  "
                                            alt="linkedin"
                                            priority={true}
                                        />
                                        <Image
                                            src={'/img/skils/backend/python.svg'}
                                            title="Python"
                                            width={60}
                                            height={60}
                                            className=" z-20  lg:left-8 lg:bottom-0 animate-spher animation-delay-4000  "
                                            alt="linkedin"
                                            priority={true}
                                        />
                                        <Image
                                            src={'/img/skils/typescript.svg'}
                                            title="Typescript"
                                            width={80}
                                            height={80}
                                            className=" z-20  lg:top-0 lg:bottom-0 animate-spher animation-delay-2000  "
                                            alt="linkedin"
                                            priority={true}
                                        />
                                    </>
                                )
                                    :
                                    skillStates === 2 ? (
                                        <>
                                            <Image
                                                src={'/img/skils/design/figma.svg'}
                                                title="Figma"
                                                width={100}
                                                height={80}
                                                className=" z-20  lg:right-0 lg:bottom-0 animate-spher   "
                                                alt="linkedin"
                                                priority={true}
                                            />
                                            <Image
                                                src={'/img/skils/design/xd.svg'}
                                                title="XD"
                                                width={60}
                                                height={60}
                                                className=" z-20  lg:left-20 lg:bottom-10 animate-spher animation-delay-2000  "
                                                alt="linkedin"
                                                priority={true}
                                            />

                                        </>
                                    ) : (
                                        <>
                                            <Image
                                                src={'/img/skils/devops/docker.svg'}
                                                title="Docker"
                                                width={100}
                                                height={80}
                                                className=" z-20  lg:right-0 lg:bottom-0 animate-spher   "
                                                alt="linkedin"
                                                priority={true}
                                            />
                                            <Image
                                                src={'/img/skils/devops/gitlab.svg'}
                                                title="Gitlab"
                                                width={60}
                                                height={60}
                                                className=" z-20  lg:left-20 lg:bottom-10 animate-spher animation-delay-2000  "
                                                alt="linkedin"
                                                priority={true}
                                            />
                                            <Image
                                                src={'/img/skils/devops/kubernetes.svg'}
                                                title="Kubernetes"
                                                width={60}
                                                height={60}
                                                className=" z-20  lg:left-8 lg:bottom-0 animate-spher animation-delay-4000  "
                                                alt="linkedin"
                                                priority={true}
                                            />
                                            <Image
                                                src={'/img/skils/devops/jenkin.svg'}
                                                title="Jenkins"
                                                width={80}
                                                height={50}
                                                className=" z-20  lg:top-0 lg:bottom-0 animate-spher animation-delay-2000  "
                                                alt="linkedin"
                                                priority={true}
                                            />
                                        </>
                                    )
                        }


                    </div>
                </div>

            </div>


        </div>
    )
}

export default Skills;