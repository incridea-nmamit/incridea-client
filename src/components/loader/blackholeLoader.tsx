"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import React, { useContext, useRef } from "react";
import { LoaderContext } from "./loaderContext";

const circleImage = "/2025/landing/loader/circle.png";
const backgroundImage = "/2025/landing/loader/background.png";
const logoImage = "/2025/landing/loader/logo-combined.png";

export default function BlackHoleLoader() {
  const background = useRef(null);
  const circle = useRef(null);
  const logo = useRef(null);

  const loaderContext = useContext(LoaderContext);

  useGSAP(() => {
    if (circle.current && background.current && logo.current) {
      const tlbackground = gsap.timeline({ repeat: 0 });
      const tlcircle = gsap.timeline({ repeat: 0 });
      const tlogo = gsap.timeline({ repeat: 0 });

      tlbackground.to(background.current, {
        scale: 1.1,
        duration: 1,
        rotate: 0,
        ease: "power2.out",
      });
      tlbackground.to(background.current, {
        scale: 20,
        duration: 0.7,
        rotate: 360,
        opacity: 0.5,
        display: "none",
        ease: "power2.inOut",
      });

      tlcircle.to(circle.current, {
        scale: 1.1,
        duration: 1,
        ease: "power2.out",
      });
      tlcircle.to(circle.current, {
        scale: 20,
        duration: 0.7,
        rotate: -90,
        opacity: 0.5,
        display: "none",
        ease: "power2.inOut",
      });

      tlogo.to(logo.current, {
        duration: 1,
        scale: 1.2,
        ease: "power2.out",
      });
      tlogo.to(logo.current, {
        duration: 0.7,
        opacity: 0.5,
        scale: 0.2,
        display: "none",
        ease: "power2.out",
        onComplete: () => {
          loaderContext?.setShow("hide");
          loaderContext?.setAnimate(true);
          sessionStorage.setItem("black-hole-loader", "true");
        },
      });
    }
  }, [loaderContext?.show]);

  if (loaderContext?.show === "show")
    return (
      <>
        <div
          className="w-screen h-screen bg-black flex items-center justify-center overflow-hidden relative z-[999999]"
          id="black-hole-loader"
        >
          <Image
            src={backgroundImage}
            className="object-cover scale-[1.3] w-full aspect-square h-screen z-[51]"
            ref={background}
            priority
            alt="background"
            height={1080}
            width={1920}
          />
          <Image
            src={circleImage}
            priority
            className="object-contain scale-[1.3] opacity-50 absolute aspect-square lg:h-[30vh] sm:h-[20vh] h-[18vh] top-1/2 z-[51] left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            ref={circle}
            height={1080}
            width={1920}
            alt="circle"
          />
          <Image
            src={logoImage}
            priority
            ref={logo}
            id="logo-black"
            className={`object-contain absolute aspect-square lg:h-[25vh] sm:h-[16vh] h-[12vh] top-1/2 z-[52] left-1/2 transform -translate-x-1/2 -translate-y-1/2 `}
            height={1080}
            width={1920}
            alt="circle"
          />
        </div>
      </>
    );
}
