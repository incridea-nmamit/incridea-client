import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import styles from "./loader.module.css";

const LoadingScreen = () => {
  const containerRef = useRef(null);
  const logoRef = useRef(null);
  const hourglassRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const logo = logoRef.current;
    const hourglass = hourglassRef.current;

    // Fade in animation for the container
    gsap.fromTo(
      container,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 0.4,
        ease: "power2.inOut",
      },
    );

    gsap.to(logo, {
      scale: 1.25,
      duration: 1.25,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
    });

    return () => {
      gsap.killTweensOf([container, logo, hourglass]);
    };
  }, []);
  return (
    <div ref={containerRef} className={styles.loadingScreen}>
      <div className="relative h-screen w-screen flex flex-col items-center justify-center">
        <div className={styles.background}>
          <div className={styles.particlesContainer}></div>
        </div>
        <div ref={hourglassRef} className={styles.hourglass}>
          <Image
            src="/2025/loader/hourglass.png"
            width={150}
            height={150}
            alt="Echoes of Eternity Logo"
            priority
          />
        </div>
        <div
          ref={logoRef}
          className="absolute bottom-[24%] md:bottom-[20%] xl:bottom-[22%]"
        >
          <Image
            src="/2025/loader/Echoes_of_Eternity_Logo.png"
            width={300}
            height={300}
            alt="Echoes of Eternity Logo"
            priority
          />
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
