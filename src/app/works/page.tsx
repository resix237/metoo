"use client"
import React, { useState } from 'react'
import { projects } from '@/lib/data'
import CardProject from '@/components/ui/CardProject'
import Drawer from '@/components/ui/Drawer'
import Image from 'next/image'
import Link from 'next/link'
import { ExternalLink } from 'lucide-react'
import { ProjectType } from '@/lib/data/types'

function Page() {
    const [selectedProject, setSelectedProject] = useState<ProjectType | null>(null);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const handleProjectClick = (project: ProjectType) => {
        setSelectedProject(project);
        setIsDrawerOpen(true);
    };

    return (
        <div className='min-h-screen bg-black pt-32 pb-20'>
            <div className="relative xl:px-64 px-5 lg:px-32 text-white flex flex-col">
                <Image
                    src={'/img/grid2.svg'}
                    width={170}
                    height={170}
                    className="absolute -z-10 top-0 left-10 opacity-30"
                    alt="background grid"
                />

                <h1 className="text-4xl md:text-5xl font-light font-Montserrat mb-10">
                    <span className="font-Montserrat tracking-tighter">My</span> Projects
                </h1>

                <span className="text-xl font-light tracking-wider mb-10">
                    <span className="font-bold text-2xl">{`<`}</span> All_works <span className="font-bold text-2xl">{`/>`}</span>
                </span>

                <div className="flex flex-col gap-16">
                    {projects.map((item, index) => (
                        <CardProject
                            key={index}
                            data={item}
                            position={index}
                            onClick={() => handleProjectClick(item)}
                        />
                    ))}
                </div>

                <Image
                    src={'/img/grid.svg'}
                    width={170}
                    height={170}
                    className="absolute -z-10 bottom-10 right-10 opacity-30"
                    alt="background grid"
                />
            </div>

            <Drawer
                isOpen={isDrawerOpen}
                onClose={() => setIsDrawerOpen(false)}
                title={selectedProject?.name}
            >
                {selectedProject && (
                    <div className="flex flex-col gap-6 font-Hind">
                        {/* Featured Image Placeholder (since we only have bg color classes) */}
                        <div className={`w-full h-64 rounded-xl border border-white/10 ${selectedProject.image} bg-cover bg-center shadow-lg`} />

                        <div className="space-y-4">
                            <div>
                                <h3 className="text-secondary text-sm font-bold uppercase tracking-widest mb-1">Company / Type</h3>
                                <p className="text-white text-lg">{selectedProject.label}</p>
                            </div>

                            <div>
                                <h3 className="text-secondary text-sm font-bold uppercase tracking-widest mb-1">Overview</h3>
                                <p className="text-white/80 leading-relaxed text-base">
                                    {selectedProject.description}
                                </p>
                            </div>

                            {selectedProject.url && (
                                <div className="pt-4">
                                    <Link
                                        href={selectedProject.url}
                                        target="_blank"
                                        className="inline-flex items-center gap-2 bg-secondary text-black font-bold py-3 px-6 rounded-lg hover:bg-white transition-colors duration-300"
                                    >
                                        Visit Website <ExternalLink size={18} />
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </Drawer>
        </div>
    )
}

export default Page;