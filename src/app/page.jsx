"use client"
import ButtonMenu from "@/components/ui/ButtonMenu";
import Curve from "@/components/Curve";
import Image from "next/image"
import { Fragment, useEffect, useLayoutEffect, useRef, useState, useTransition } from "react";
import gsap from "gsap";
import scrollTrigger from "gsap/ScrollTrigger";
import SplitText from "../utils/Split3.min";
import CardProject from "@/components/ui/CardProject";
import Button from "@/components/ui/Button";
import Carrousel from "@/components/ui/Carrousel";
import Skills from "@/components/ui/Skills";
import Link from "next/link";
import { scrapeLinkedInProfileAction } from "@/lib/actions";
// import { ResponseScrapping } from "@/lib/types";


export default function Home() {
  const [ isPending, startTransition ] = useTransition();
  const [ dataArticle, setDataArticle ] = useState()
  const comp = useRef(null)
  useLayoutEffect(() => {
    gsap.registerPlugin(scrollTrigger)
    let ctx = gsap.context(() => {
      const t1 = gsap.timeline()
      t1.to("#preview-home", {
        yPercent: "-100",
        duration: .8,
        delay: 0.3,
        ease: "power2",
      })
    }, comp);
    const split = new SplitText(".animate-text", {
      type: "lines",
      linesClass: "lineChildren",
    });
    const splitParent = new SplitText(".animate-text", {
      type: "lines",
      linesClass: "lineParent",
    });
    const gsapText = gsap.utils.toArray(".animate-text");
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
    return () => ctx.revert();

  }, []);


  useEffect(() => {
    async function fetchData() {
      startTransition(async () => {
        const response = await scrapeLinkedInProfileAction("https://www.linkedin.com/in/fouda-marc-arthur-03372a239/recent-activity/all/")
        setDataArticle(response)
      })
    }
    fetchData();
  }, [])
  return (
    <Fragment>


      <div ref={comp} className=" xl:px-64 px-5 lg:px-32 transition-all ease-in-out duration-100 relative h-screen">
        <div id="preview-home" className="bg-white fixed top-0 left-0 h-screen  w-full z-50 flex justify-center place-items-center">
          <h1>
            loading ...
          </h1>

        </div>
        <div>
          <div className="flex w-full justify-between py-14 place-items-center">
            <h1 className=" font-Montserrat text-white text-xl font-light uppercase  ">
              Marc Fouda
            </h1>

            <ButtonMenu />

          </div>
          <div className=" grid grid-cols-1 lg:grid-cols-2 pt-20" >
            <div className=" md:text-6xl text-2xl text-white font-Montserrat flex flex-col  gap-3 relative " >
              <Image
                src={'/img/grid2.svg'}
                width={100}
                height={100}
                className=" absolute -z-10 "
                alt="linkedin"
                priority={true}

              />


              <span className="">
                <span className="animate-text"> Hi I'm Marc Fouda</span>
              </span>
              <span className="animate-text md:text-2xl text-lg ">
                I answer to the name Resix,
              </span>
              <span className="animate-text text-sm md:text-xl font-bold tracking-wider flex place-items-center "><span className=" font-bold text-lg md:text-2xl">{`<`}</span> Sculteur_de_pixels <span className=" font-bold text-lg md:text-2xl">{`/>`}</span></span>
            </div>
            <div className=" relative pt-10 justify-center place-items-center ">
              <Image
                src={'/img/profil.svg'}
                width={500}
                height={500}
                className=" z-20 lg:absolute lg:right-0 lg:bottom-0"
                alt="linkedin"
                priority={true}
              />

              <div className="lg:block hidden animate-bold animation-delay-3000 absolute opacity-80 filter blur-3xl min-h-96 right-[50%] min-w-96 rounded-full bg-accent ">
              </div>
              <div className="lg:block hidden animate-bold absolute opacity-70 filter blur-3xl min-h-96  -bottom-20 -left-10 min-w-96 rounded-full bg-accent ">
              </div>
              <div className="lg:block hidden animate-bold animation-delay-2000 labsolute opacity-70 filter blur-3xl min-h-96  right-[30%] min-w-96 rounded-full bg-secondary ">
              </div>
              <div className="lg:block hidden animate-bold absolute opacity-70 filter blur-3xl min-h-96  right-[10%]  lg:-bottom-0 min-w-96 rounded-full bg-secondary ">
              </div>
              <div className="lg:block hidden animate-bold  animation-delay-4000 absolute opacity-70 filter blur-3xl min-h-96  lg:-bottom-4 lg:left-20 min-w-96 rounded-full bg-secondary ">

              </div>



            </div>
          </div>


        </div>
        <Image
          src={'/img/grid.svg'}
          width={170}
          height={170}
          className=" absolute -z-10 bottom-20 right-40 "
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
          <CardProject position={0} />
          <CardProject position={1} />
          <CardProject position={0} />
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
      <div className=" relative xl:px-64 px-5 lg:px-32 pt-10 text-white flex flex-col ">
        <span className=" text-xl font-light tracking-wider "><span className=" font-bold text-2xl">{`<`}</span> My_skills <span className=" font-bold text-2xl">{`/>`}</span></span>


        <div>
          <Skills />
        </div>

      </div>
    </Fragment>

  );
}
