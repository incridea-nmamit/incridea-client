import { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { type NextPage } from "next";
import Clock from "~/components/galleryComponents/clock";
import Inc22 from "~/components/galleryComponents/scenes/Inc22";
import Inc23 from "~/components/galleryComponents/scenes/Inc23";
import Inc24 from "~/components/galleryComponents/scenes/Inc24";
import Inc25 from "~/components/galleryComponents/scenes/Inc25";
import {
  PiClockClockwiseBold,
  PiClockCounterClockwiseBold,
} from "react-icons/pi";
import Parallax from "parallax-js";

export const angleToScenes: { [key: number]: number[] } = {
  0: [Math.PI],
  1: [(3 * Math.PI) / 2, -Math.PI / 2],
  2: [2 * Math.PI, 0],
  3: [Math.PI / 2],
};

const Gallery: NextPage = () => {
  const [activeYear, setActiveYear] = useState<number>(0);
  const [changedYear, setChangedYear] = useState<number>(0);
  const clockRef = useRef<HTMLDivElement | null>(null);
  const [clockPos, setClockPos] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const sceneRef = useRef(null);

  useEffect(() => {
    const updateClockPosition = () => {
      if (clockRef.current) {
        const posi = clockRef.current.getBoundingClientRect();
        setClockPos({
          x: posi.left + posi.width / 2,
          y: posi.top + posi.height / 2,
        });
      }
    };
    updateClockPosition();
    window.addEventListener("resize", updateClockPosition);
    return () => window.removeEventListener("resize", updateClockPosition);
  }, []);

  const images22: string[] = [
    "https://cxyw63cg3t.ufs.sh/f/rcOPZjbdsKD64Sgn2E7gjUQEnHRB6acYe3z07wmr1FZphyNP",
    "https://cxyw63cg3t.ufs.sh/f/rcOPZjbdsKD6dNwH6gQNk6Mso8WuK2jgRcmrVZdx5zTyB4lS",
    "https://cxyw63cg3t.ufs.sh/f/rcOPZjbdsKD6R0y97VshMbdqu9Dv5sClAGzH4NFEa8xgrwZW",
    "https://cxyw63cg3t.ufs.sh/f/rcOPZjbdsKD6oXcQEjTAjvGsfIbWS4wiz2DCtNxYrhE6q3UR",
    "https://cxyw63cg3t.ufs.sh/f/rcOPZjbdsKD63kfzz9uyGThZ7z4KLvCYJEoXsRPUlefFnuwk",
    "https://cxyw63cg3t.ufs.sh/f/rcOPZjbdsKD656UKEcozf8HJFAlsQ20KwyZNUIoLmOVecu4g",
    "https://cxyw63cg3t.ufs.sh/f/rcOPZjbdsKD6R0y97VshMbdqu9Dv5sClAGzH4NFEa8xgrwZW",
    "https://cxyw63cg3t.ufs.sh/f/rcOPZjbdsKD6oXcQEjTAjvGsfIbWS4wiz2DCtNxYrhE6q3UR",
    "https://cxyw63cg3t.ufs.sh/f/rcOPZjbdsKD64Sgn2E7gjUQEnHRB6acYe3z07wmr1FZphyNP",
    "https://cxyw63cg3t.ufs.sh/f/rcOPZjbdsKD6dNwH6gQNk6Mso8WuK2jgRcmrVZdx5zTyB4lS",
  ];

  const handleClockClick = (angle: number) => {
    const year = Object.entries(angleToScenes).find(([key, value]) =>
      value.includes(angle),
    );
    setActiveYear(Number(year?.[0]) ?? 0);
  };

  const years = [2022, 2023, 2024, 2025] as const;
  const imageCounts = [21, 12, 26, 0] as const;

  const generateImagePaths = (
    year: number,
    count: number,
    extension: string,
  ): string[] => {
    return Array.from(
      { length: count },
      (_, i) => `gallery/${year}/${i + 1}.${extension}`,
    );
  };
  const img2022 = generateImagePaths(years[0], imageCounts[0], "jpg");
  const img2023 = generateImagePaths(years[1], imageCounts[1], "jpg");
  const img2024 = generateImagePaths(years[2], imageCounts[2], "jpg");

  const renderActiveYearComponent = (): JSX.Element | null => {
    const components = [
      <Inc22 imgArr={images22} key={0} />,
      <Inc23 imgArr={images22} clockPos={clockPos} key={1} />,
      <Inc24 imgArr={images22} key={2} />,
      <Inc25 key={3} />,
    ];
    return components[activeYear] ?? null;
  };

  useEffect(() => {
    gsap.fromTo(
      "#active-year-content",
      { opacity: 0 },
      { opacity: 1, duration: 0.6 },
    );

    return () => {
      gsap.to("#active-year-content", { opacity: 0, duration: 0.6 });
    };
  }, [activeYear]);

  const handleYearChange = (direction: number) => {
    const newYear = (activeYear + direction + years.length) % years.length;
    setActiveYear(newYear);
    setChangedYear(newYear);
  };

  useEffect(() => {
    if (!sceneRef.current) return; // ✅ Prevents 'null' error

    const parallaxInstance = new Parallax(sceneRef.current as HTMLElement, {
      relativeInput: false, // Disable cursor-based movement
      hoverOnly: false, // Enable motion-based movement
    });

    const handleOrientation = (event: DeviceOrientationEvent) => {
      if (event.gamma === null || event.beta === null) return;

      const tiltX = event.gamma / 45; // Left/Right tilt (-45 to 45 → -1 to 1)
      const tiltY = event.beta / 45; // Forward/Backward tilt (-45 to 45 → -1 to 1)

      parallaxInstance.friction(tiltX * 0.1, tiltY * 0.1);
    };

    window.addEventListener("deviceorientation", handleOrientation);

    return () => {
      window.removeEventListener("deviceorientation", handleOrientation);
      parallaxInstance.destroy();
    };
  }, []);

  return (
    <>
      <section
        ref={sceneRef}
        data-depth="1"
        className="fixed flex h-screen w-full flex-col overflow-hidden bg-transparent justify-center items-center"
      >
        <div
          data-depth="0.4"
          className="absolute -z-10 
             w-[140%] h-[140%] -mt-[20%] -mb-[20%]  /* Mobile adjustments */
             sm:w-[130%] sm:h-[130%] sm:-mt-[15%] sm:-mb-[15%]  /* Small screens */
             md:w-[120%] md:h-[120%] md:-mt-[10%] md:-mb-[10%]  /* Desktops */
             bg-[url('/2025/gallery/galleryBg.webp')] bg-cover bg-center bg-no-repeat 
             blur-[5px] brightness-75"
        ></div>
      </section>
      <div className="fixed flex h-screen w-full z-0 overflow-hidden">
        <div className="relative h-full w-full">
          <div className="absolute transform h-auto translate-y-20 md:translate-y-10 z-20 top-20 md:top-20 left-[50%] -translate-x-1/2 flex">
            <p className="absolute left-[50%] font-life-craft -translate-x-1/2 -translate-y-full text-white sm:text-5xl text-3xl w-screen text-center tracking-wider">
              Incridea &nbsp;{years[activeYear]}
            </p>
            <div
              className={`absolute -translate-x-[40px] self-center cursor-pointer bg-[#23854b] border-2 border-[#faae30] rounded-full p-1 ${activeYear === 0 ? "hidden" : ""}`}
              onClick={() => handleYearChange(-1)}
            >
              <PiClockCounterClockwiseBold
                fill="#ebe5e3"
                className="sm:size-8 size-7"
              />
            </div>
            <div ref={clockRef}>
              <Clock onClockClick={handleClockClick} year={changedYear} />
            </div>
            <div
              className={`absolute sm:translate-x-[230px] translate-x-[200px] self-center cursor-pointer bg-[#23854b] border-2 border-[#faae30] rounded-full p-1 ${activeYear === 3 ? "hidden" : ""}`}
              onClick={() => handleYearChange(1)}
            >
              <PiClockClockwiseBold
                fill="#ebe5e3"
                className="sm:size-8 size-7"
              />
            </div>
          </div>

          <div id="active-year-content" className="relative h-full w-full z-10">
            {renderActiveYearComponent()}
          </div>
        </div>
      </div>
    </>
  );
};

export default Gallery;
