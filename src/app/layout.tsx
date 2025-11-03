"use client"
import { Inter } from "next/font/google";
import { useEffect, useLayoutEffect } from "react";
import "./globals.scss";
import Curve from "../components/Curve";
import Footer from "../components/Footer";
import { AnimatePresence } from 'framer-motion';
import ButtonMenu from "@/components/ui/ButtonMenu";
import Navbar from "@/components/ui/Navbar";



export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {



  return (
    <html lang="en">
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@200;300;400;500;600;700;800&family=Montserrat:ital,wght@0,100..900;1,100..900&family=Mukta+Mahee:wght@200;300;400;500;600;700;800&family=Questrial&display=swap" rel="stylesheet"></link>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com"  />
      <link href="https://fonts.googleapis.com/css2?family=Hind:wght@300;400;500;600;700&display=swap" rel="stylesheet"></link>


      <body >
 
        <Navbar />

        <div className="flex lg:hidden absolute top-0 left-0 w-full justify-between  py-14 place-items-center">


          <ButtonMenu />

        </div>
        {children}

        <Footer />
      </body>
    </html>
  );
}
