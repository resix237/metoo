"use client"
import { Inter } from "next/font/google";
import { useEffect, useLayoutEffect } from "react";
import "./globals.scss";
import gsap from "gsap";

const inter = Inter({ subsets: [ "latin" ] });
const ratio = 0.1;

const options = {
  root: null,
  rootMargin: "0px",
  threshold: ratio,
};

const handleIntersect = (entries, observer) => {
  entries.forEach((entry) => {
    if (entry.intersectionRatio > ratio) {
      console.log("Intersection ratio");
      entry.target.classList.add("reveal-visible");
      observer.unobserve(entry.target);
    }
  });
};

export default function RootLayout({
  children,
}) {

  useLayoutEffect(() => {
    const circles = document.querySelectorAll(".circle");
    const colors = [
      "#ffb56b",
      "#fdaf69",
      "#f89d63",
      "#f59761",
      "#ef865e",
      "#ec805d",
      "#e36e5c",
      "#df685c",
      "#d5585c",
      "#d1525c",
      "#c5415d",
      "#c03b5d",
      "#b22c5e",
      "#ac265e",
      "#9c155f",
      "#950f5f",
      "#830060",
      "#7c0060",
      "#680060",
      "#60005f",
      "#48005f",
      "#3d005e"
    ];

    circles.forEach((circle, index) => {
      circle.dataset.x = "0";
      circle.dataset.y = "0";
      circle.style.backgroundColor = colors[ index % colors.length ];
    });
    function animateCircles(e) {
      let x = e.clientX;
      let y = e.clientY;

      circles.forEach((circle, index) => {
        circle.style.opacity = "1";
        circle.style.transform = `translateX(${x - 7}px) translateY(${y - 7}px) scale(${(circles.length - index) / circles.length})`;
        circle.style.transition = `${0.13 + index * (0.006)}s`
      });
    }
    document.addEventListener("mousemove", (e) => {
      animateCircles(e);
    })
    document.addEventListener("wheel", (e) => {
      animateCircles(e);
    })
    document.addEventListener("mouseout", (e) => {
      circles.forEach((circle, index) => {
        circle.style.opacity = "0";
      });
    })


    const observer = new IntersectionObserver(handleIntersect, options);
    document.querySelectorAll(".reveal").forEach((element) => {
      observer.observe(element);
    });
    // Nettoyage de l'observateur lors du démontage du composant
    return () => observer.disconnect();

  }, []);

  return (
    <html lang="en">
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@200;300;400;500;600;700;800&family=Montserrat:ital,wght@0,100..900;1,100..900&family=Mukta+Mahee:wght@200;300;400;500;600;700;800&family=Questrial&display=swap" rel="stylesheet"></link>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
      <link href="https://fonts.googleapis.com/css2?family=Hind:wght@300;400;500;600;700&display=swap" rel="stylesheet"></link>

      <body className={inter.className}>
        {/* <script src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/16327/SplitText3.min.js">

        </script> */}
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="circle"></div>
        {children}

      </body>
    </html>
  );
}
