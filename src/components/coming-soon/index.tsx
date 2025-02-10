import { useEffect } from "react";
import MorphingText from "~/components/text-morph-component";
import ShootingStars from "./shooting-stars";
import gsap from "gsap";
import { CONSTANT } from "~/constants";

const ComingSoonComponent = () => {
  useEffect(() => {
    gsap.to(".star", {
      opacity: 1,
      scale: 1.5,
      duration: 0.2,
      repeat: -1,
      yoyo: true,
      stagger: {
        amount: 3,
        from: "random",
      },
    });
  }, []);

  const renderStars = () => {
    const stars = [];
    for (let i = 0; i < 250; i++) {
      const size = Math.random() * 2;
      const top = Math.random() * 100;
      const left = Math.random() * 100;
      stars.push(
        <span
          key={i}
          className="star absolute rounded-full bg-blue-300"
          style={{
            width: `${size}px`,
            height: `${size}px`,
            top: `${top}%`,
            left: `${left}%`,
            opacity: Math.random(),
          }}
        />,
      );
    }
    return stars;
  };

  return (
    <a
      href={CONSTANT.URL.VIDEO.THEME_REVEAL}
      className="relative w-full h-screen select-none flex-col flex items-center justify-center overflow-hidden"
      style={{
        background: `radial-gradient(circle at 50% 50%, #033137 0%, #137C2D 70%)`,
        backgroundSize: "100% 100%",
        backgroundPosition: "0% 0%",
      }}
    >
      <div className="absolute w-full h-full z-20">{renderStars()}</div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/2025/logo.png"
        alt="logo"
        className="w-52 lg:w-96 aspect-auto"
      />
      <div className="md:w-[60%] w-[80%] h-52 lg:h-96 z-20 flex justify-center items-center">
        <MorphingText
          texts={["Coming Soon", "Echoes of Eternity"]}
          className="font-life-craft tracking-widest lg:text-[9rem] md:text-[6rem] text-[4rem] text-yellow-400 text-center min-w-full self-center justify-self-center"
        />
      </div>
      <div className="absolute w-full h-full z-20">
        <ShootingStars />
      </div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        id="door-left"
        src="/assets/png/door.png"
        alt="Door-Left"
        className="absolute lg:h-full h-screen lg:w-[20%] md:scale-y-150 lg:scale-y-100 lg:left-0 -top-[38%] lg:top-0 lg:rotate-0 rotate-90 z-30"
        draggable={false}
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        id="door-right"
        src="/assets/png/door1.png"
        alt="Door-Left"
        className="absolute lg:h-full h-screen lg:w-[20%] md:scale-y-150 lg:scale-y-100 lg:right-0 lg:bottom-0 -bottom-[38%] lg:rotate-0 rotate-90 z-30"
        draggable={false}
      />
    </a>
  );
};

export default ComingSoonComponent;
