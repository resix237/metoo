"use client"
import ButtonMenu from "@/components/ui/ButtonMenu";
import Image from "next/image"
import { useEffect, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import scrollTrigger from "gsap/ScrollTrigger";
import SplitText from "../utils/Split3.min";

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
    <main ref={comp} className=" xl:px-64 px-10 lg:px-32 transition-all ease-in-out duration-100 relative">
      <div id="preview-home" className="bg-white absolute top-0 left-0 h-screen  w-full z-50 flex justify-center place-items-center">
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
          <div className=" text-6xl text-white font-Montserrat flex flex-col  gap-3 " >
            <span className="">
              <span className="animate-text"> Hi I'm Marc Fouda</span>
            </span>
            <span className="animate-text text-2xl">
              I answer to the name Resix,
            </span>
            <span className="animate-text text-2xl">Sculter de pixels</span>
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
    </main>
  );
}
