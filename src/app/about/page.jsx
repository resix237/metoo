"use client"
import ButtonMenu from '@/components/ui/ButtonMenu';
import React, { useLayoutEffect, useRef } from 'react'
import gsap from "gsap";
import scrollTrigger from "gsap/ScrollTrigger";

function Page() {
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
  return (
    <div>
      <div className="flex w-full justify-between py-14 place-items-center">
        <h1 className=" font-Montserrat text-white text-xl font-light uppercase  ">
          Marc Fouda
        </h1>

        <ButtonMenu />

      </div>
    </div>
  )
}

export default Page;