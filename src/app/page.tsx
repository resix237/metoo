"use client"
import Image from "next/image"
import { Fragment, useRef, useState, useTransition } from "react";
import CardProject from "@/components/ui/CardProject";
import Button from "@/components/ui/Button";
import Carrousel from "@/components/ui/Carrousel";
import Skills from "@/components/ui/Skills";
import Link from "next/link";
import { scrapeLinkedInProfileAction } from "@/lib/actions";
import { projects, ProjectType } from "@/lib/data"
import { ResponseScrapping } from "@/lib/types";
import ExperienceAndArticles from "@/components/ui/ExperienceAndArticles";
import Drawer from "@/components/ui/Drawer";
import GallerySection from "@/components/ui/GallerySection";
import { ExternalLink } from "lucide-react";
// import { ResponseScrapping } from "@/lib/types";


export default function Home() {
  const [isPending, startTransition] = useTransition();
  const [dataArticle, setDataArticle] = useState<ResponseScrapping[]>([])
  const comp = useRef(null)
  const [selectedProject, setSelectedProject] = useState<ProjectType | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleProjectClick = (project: ProjectType) => {
    setSelectedProject(project);
    setIsDrawerOpen(true);
  };




  return (
    <Fragment>


      <div ref={comp} className=" xl:px-64 px-5 lg:px-32 transition-all ease-in-out duration-100 relative h-screen">

        <div>
          <h1 className=" py-20 font-Montserrat text-white text-xl font-light uppercase   ">

          </h1>
          <div className=" grid grid-cols-1 lg:grid-cols-2 pt-20" >
            <div className=" md:text-6xl text-2xl text-white font-Montserrat flex flex-col  gap-3 relative " >
              <Image
                src={'/img/grid2.svg'}
                width={200}
                height={200}
                className=" absolute -z-10 -top-10 lg:-left-20 "
                alt="linkedin"
                priority={true}

              />


              <span className="">
                <span className="animate-text"> Hi I&rsquo;m Marc Fouda</span>
              </span>
              <span className=" animate-text md:text-2xl text-lg ">
                I answer to the name Resix,
              </span>
              <span className="animate-text text-sm md:text-xl font-bold tracking-wider flex place-items-center "><span className=" font-bold text-lg md:text-2xl">{`<`}</span> Sculteur_de_pixels <span className=" font-bold text-lg md:text-2xl">{`/>`}</span></span>
            </div>
            <div className=" relative pt-10 justify-center place-items-center ">






            </div>
          </div>


        </div>
        <Image
          src={'/img/grid.svg'}
          width={170}
          height={170}
          className=" absolute -z-10 bottom-20 right-40 green "
          alt="linkedin"
          priority={true}

        />
        {/* socials  */}
        <div className=" flex lg:gap-20 gap-16 justify-between  bottom-10 absolute ">

          <div>
            <Link href={"https://www.linkedin.com/in/fouda-marc-arthur-03372a239/"}>
              <Image
                src={'/img/linkedin.svg'}
                width={25}
                height={25}
                alt="linkedin"
                priority={true}

              />
            </Link>
          </div>
          <div>
            <Link href={"https://twitter.com/Resix237pro"}>
              <Image
                src={'/img/twitter.svg'}
                width={25}
                height={25}
                alt="twitter"
                priority={true}

              />
            </Link>
          </div>
          <div>
            <Link href={"https://github.com/resix237"}>
              <Image
                src={'/img/github.svg'}
                width={25}
                height={25}
                alt="github"
                priority={true}

              />
            </Link>
          </div>
          <div>
            <Link href={"https://www.linkedin.com/in/fouda-marc-arthur-03372a239/"}>
              <Image
                src={'/img/figma.svg'}
                width={25}
                height={25}
                alt="figma"
                priority={true}

              />
            </Link>
          </div>
        </div>
      </div>

      {/* section expérience */}
      <ExperienceAndArticles />

      {/* section citation  */}
      <div data-scroll data-scroll-speed="0.5" className="flex relative h-[75vh]   w-full justify-center place-items-center border border-accent  bg-secondary opacity-80">

        <Image
          src={'/img/citation.svg'}
          fill={true}
          className=""
          alt="quote"
          priority={true}

        />
      </div>
      {/* section Work */}
      <div className=" relative xl:px-64 px-5 lg:px-32 pt-10 text-white flex flex-col ">
        <Image
          src={'/img/grid2.svg'}
          width={170}
          height={170}
          className=" absolute -z-10 top-10   "
          alt="linkedin"
          priority={true}

        />

        <span className=" text-xl font-light tracking-wider "><span className=" font-bold text-2xl">{`<`}</span> Recent_works <span className=" font-bold text-2xl">{`/>`}</span></span>
        <div className=" flex flex-col py-10 gap-10">
          {
            projects.map((item, index) => (
              <CardProject key={index} data={item} position={index} onClick={() => handleProjectClick(item)} />

            ))
          }
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
                        className="inline-flex items-center gap-2  text-black font-bold py-3 px-6 rounded-lg bg-white transition-colors duration-300"
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
        <Image
          src={'/img/grid.svg'}
          width={170}
          height={170}
          className=" absolute -z-10 bottom-10 left-10   "
          alt="linkedin"
          priority={true}

        /> <Image
          src={'/img/grid.svg'}
          width={170}
          height={170}
          className=" absolute -z-10 bottom-1/2 right-10   "
          alt="linkedin"
          priority={true}

        />

        <div className=" flex justify-center py-10 ">
          <Button
            tittle="View all"
            url="/works"
          />
        </div>
        <div className="h-[1px] bg-accent " />
      </div>
      <div className=" relative xl:px-64 px-5 lg:px-32 pt-10 text-white flex flex-col ">
        <span className=" text-xl font-light tracking-wider "><span className=" font-bold text-2xl">{`<`}</span> My_last_artircles <span className=" font-bold text-2xl">{`/>`}</span></span>

        <div className=" py-20">
          {
            !isPending &&
            (
              <Carrousel
                data={dataArticle}
              />
            )
          }
        </div>
        <div className=" flex justify-center py-5 ">
          <Button
            tittle="View all"
            url="/works"
          />
        </div>
      </div>
      <div className="h-[1px] bg-accent " />

      {/* section Gallery */}
      <GallerySection />

      <div className=" relative xl:px-64 px-5 lg:px-32 pt-10 text-white flex flex-col ">
        <span className=" text-xl font-light tracking-wider "><span className=" font-bold text-2xl">{`<`}</span> My_skills <span className=" font-bold text-2xl">{`/>`}</span></span>


        <div>
          <Skills />
        </div>

      </div>
    </Fragment >

  );
}
