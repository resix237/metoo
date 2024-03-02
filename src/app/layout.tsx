"use client"
import { Inter } from "next/font/google";
import { useEffect } from "react";
import "./globals.css";
interface Coords {
  x: number;
  y: number;
}
const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  useEffect(() => {
    const circles: NodeListOf<HTMLElement> = document.querySelectorAll(".circle");
    const colors: string[] = [
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

    circles.forEach((circle: HTMLElement, index: number) => {
      circle.dataset.x = "0";
      circle.dataset.y = "0";
      circle.style.backgroundColor = colors[index % colors.length];
    });
    function animateCircles(e: MouseEvent) {
      let x: number = e.clientX;
      let y: number = e.clientY;

      circles.forEach((circle: HTMLElement, index: number) => {
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
      circles.forEach((circle: HTMLElement, index: number) => {
        circle.style.opacity = "0";
      });
    })
  }, []);
  return (
    <html lang="en">
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@200;300;400;500;600;700;800&family=Montserrat:ital,wght@0,100..900;1,100..900&family=Mukta+Mahee:wght@200;300;400;500;600;700;800&family=Questrial&display=swap" rel="stylesheet"></link>
      <body className={inter.className}>
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
