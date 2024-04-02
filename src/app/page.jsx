"use client"
import ButtonMenu from "@/components/ui/ButtonMenu";
import Image from "next/image"
import { Fragment, useEffect, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import scrollTrigger from "gsap/ScrollTrigger";
import SplitText from "../utils/Split3.min";
import CardProject from "@/components/ui/CardProject";

export default function Home() {

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
    // gsap.to(split.lines, {
    //   duration: 1,
    //   y: 0,
    //   opacity: 1,
    //   stagger: 0.1,
    //   delay: 0.3,
    //   ease: "power4",
    // });

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

  }, [])
  return (
    <Fragment>


      <div ref={comp} className=" xl:px-64 px-10 lg:px-32 transition-all ease-in-out duration-100 relative h-screen">
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
          <div className=" grid lg:grid-cols-2 pt-20" >
            <div className=" text-6xl text-white font-Montserrat flex flex-col  gap-3 relative " >
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
              <span className="animate-text text-2xl">
                I answer to the name Resix,
              </span>
              <span className="animate-text text-xl font-bold tracking-wider "><span className=" font-bold text-2xl">{`<`}</span> Sculteur_de_pixels <span className=" font-bold text-2xl">{`/>`}</span></span>
            </div>
            <div className=" relative pt-10 justify-center place-items-center lg:flex hidden ">
              <div className=" animate-bold animation-delay-3000 absolute opacity-80 filter blur-3xl min-h-96 right-[50%] min-w-96 rounded-full bg-accent ">
              </div>
              <div className=" animate-bold absolute opacity-70 filter blur-3xl min-h-96  -bottom-20 -left-10 min-w-96 rounded-full bg-accent ">
              </div>
              <div className=" animate-bold animation-delay-2000 labsolute opacity-70 filter blur-3xl min-h-96  right-[30%] min-w-96 rounded-full bg-secondary ">
              </div>
              <div className=" animate-bold absolute opacity-70 filter blur-3xl min-h-96  right-[10%] min-w-96 rounded-full bg-secondary ">
              </div>
              <div className=" animate-bold  animation-delay-4000 absolute opacity-70 filter blur-3xl min-h-96  -bottom-4 lg:left-20 min-w-96 rounded-full bg-secondary ">
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
        <div className=" flex gap-20 justify-between  bottom-10 absolute ">
          <Image
            src={'/img/linkedin.svg'}
            width={25}
            height={25}
            alt="linkedin"
            priority={true}

          />
          <Image
            src={'/img/twitter.svg'}
            width={25}
            height={25}
            alt="twitter"
            priority={true}

          />
          <Image
            src={'/img/github.svg'}
            width={25}
            height={25}
            alt="github"
            priority={true}

          />
          <Image
            src={'/img/figma.svg'}
            width={25}
            height={25}
            alt="figma"
            priority={true}

          />
        </div>
      </div>
      {/* section citation  */}
      <div className="flex relative h-[75vh]   w-full justify-center place-items-center border border-accent  bg-secondary opacity-80">

        <Image
          src={'/img/citation.svg'}
          fill={true}
          className=" scale-150"
          alt="quote"
          priority={true}

        />
      </div>
      {/* section Work */}
      <div className=" relative xl:px-64 px-10 lg:px-32 pt-10 text-white flex flex-col ">
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
      </div>
    </Fragment>

  );
}
