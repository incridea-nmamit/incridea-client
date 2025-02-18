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
  const [activeYear, setActiveYear] = useState<number>(3);
  const [changedYear, setChangedYear] = useState<number>(3);
  const clockRef = useRef<HTMLDivElement | null>(null);
  const [clockPos, setClockPos] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const sceneRef = useRef(null);

  useEffect(() => {
    const updateClockPosition = () => {
      if (clockRef.current) {
        const pos = clockRef.current.getBoundingClientRect();
        setClockPos({
          x: pos.left + pos.width / 2,
          y: pos.top,
        });
      }
    };
    updateClockPosition();
    window.addEventListener("resize", updateClockPosition);
    return () => window.removeEventListener("resize", updateClockPosition);
  }, []);

  const handleClockClick = (angle: number) => {
    const year = Object.entries(angleToScenes).find(([key, value]) =>
      value.includes(angle),
    );
    setActiveYear(Number(year?.[0]) ?? 0);
  };

  const years = [2022, 2023, 2024, 2025] as const;

  const img2022 = [
    "https://qmahmrnhvk.ufs.sh/f/WiEIO6HN9rYsOScIVJcZLk63SJve9IHXzaufWNgP74idmQ1K",
    "https://qmahmrnhvk.ufs.sh/f/WiEIO6HN9rYsuExnVVhiNIPjmaM9C04xk6KFpZJTAsLRe5Sc",
    "https://qmahmrnhvk.ufs.sh/f/WiEIO6HN9rYsB2pcgGqkWUXGK6wnILoru9xPAvsyRJZftNH3",
    "https://qmahmrnhvk.ufs.sh/f/WiEIO6HN9rYsGpMJ6cFjF26ALSw5JVBU4dGoIChqOgp0RDWa",
    "https://qmahmrnhvk.ufs.sh/f/WiEIO6HN9rYstDi04n1LGkCIZ5WMu0egqnyRjzJB4TVNcOv6",
    "https://qmahmrnhvk.ufs.sh/f/WiEIO6HN9rYsbYSfma6HMayVpiftmYsLCor4QwWXxc2q1lEG",
    "https://qmahmrnhvk.ufs.sh/f/WiEIO6HN9rYsphzPl3Sjr7fYckpVUB3JSqI0zhaeMgxFLlKC",
    "https://qmahmrnhvk.ufs.sh/f/WiEIO6HN9rYsgayYKyv6z8fXkcpKN4d150uF3GeYwRV6MPgi",
    "https://qmahmrnhvk.ufs.sh/f/WiEIO6HN9rYsXRoxBB0wR70aACo8TtYy9qKWzrHGVkx2jm5N",
    "https://qmahmrnhvk.ufs.sh/f/WiEIO6HN9rYs1k4cPVuzeuBm64XfVxryzsUInKvlch8jGYk5",
    "https://qmahmrnhvk.ufs.sh/f/WiEIO6HN9rYsxsD4X3fD7Rd4EMFQmCBav9AunfUTXIybKc5q",
  ];

  const img2023 = [
    "https://qmahmrnhvk.ufs.sh/f/WiEIO6HN9rYsKSsLAKJsFfnityNQc1AgbmkjCXPlrzTMdS9D",
    "https://qmahmrnhvk.ufs.sh/f/WiEIO6HN9rYsW9aaL0HN9rYsDubyU3ELWtKnzISch0e8VC24",
    "https://qmahmrnhvk.ufs.sh/f/WiEIO6HN9rYsbNrKlVa6HMayVpiftmYsLCor4QwWXxc2q1lE",
    "https://qmahmrnhvk.ufs.sh/f/WiEIO6HN9rYsb1nhnDa6HMayVpiftmYsLCor4QwWXxc2q1lE",
    "https://qmahmrnhvk.ufs.sh/f/WiEIO6HN9rYspJhfChSjr7fYckpVUB3JSqI0zhaeMgxFLlKC",
    "https://qmahmrnhvk.ufs.sh/f/WiEIO6HN9rYsmOcvZDi5GalDMcdKkoseOfrSixqg92IP57HR",
    "https://qmahmrnhvk.ufs.sh/f/WiEIO6HN9rYs1VqnK7zeuBm64XfVxryzsUInKvlch8jGYk5o",
    "https://qmahmrnhvk.ufs.sh/f/WiEIO6HN9rYsaW0ECTLUAYWwfIge5Buk6C2r1ycR3MhalptJ",
    "https://qmahmrnhvk.ufs.sh/f/WiEIO6HN9rYs7Ia5OnUWmhgn3FxJEjMV60R2YUlHPbwf1sdX",
    "https://qmahmrnhvk.ufs.sh/f/WiEIO6HN9rYszOx6zTAkVLni9IlUhGbwxyXJmDt8KsqSTcjZ",
  ];

  const img2024 = [
    "https://qmahmrnhvk.ufs.sh/f/WiEIO6HN9rYskqPH0tF3f75EiyprLQFWulsoOtNSn2b8xMwB",
    "https://qmahmrnhvk.ufs.sh/f/WiEIO6HN9rYsOgWmDNZLk63SJve9IHXzaufWNgP74idmQ1Kp",
    "https://qmahmrnhvk.ufs.sh/f/WiEIO6HN9rYsylC8KdWsWdY7KiMXRcSBezA9Nn3fvGZhT60m",
    "https://qmahmrnhvk.ufs.sh/f/WiEIO6HN9rYs8ZlHO9ju8VBznFPtoWLd6bRTDXGlUMjpyxqf",
    "https://qmahmrnhvk.ufs.sh/f/WiEIO6HN9rYs0A5ybjQAwRdpFyuOmDB6UY54jkXKQ9Sr2TNH",
    "https://qmahmrnhvk.ufs.sh/f/WiEIO6HN9rYsX7wwgh0wR70aACo8TtYy9qKWzrHGVkx2jm5N",
    "https://qmahmrnhvk.ufs.sh/f/WiEIO6HN9rYsMkiSa74PpubWTceyBLGsXSURtKHxQ7riC4DY",
    "https://qmahmrnhvk.ufs.sh/f/WiEIO6HN9rYsXFlYkD0wR70aACo8TtYy9qKWzrHGVkx2jm5N",
    "https://qmahmrnhvk.ufs.sh/f/WiEIO6HN9rYsEvRbcLQ8mqF2GyD8viAZRnWJQ3hjbBM6tUpO",
    "https://qmahmrnhvk.ufs.sh/f/WiEIO6HN9rYstAlogWJ1LGkCIZ5WMu0egqnyRjzJB4TVNcOv",
  ];

  const renderActiveYearComponent = (): JSX.Element | null => {
    const components = [
      <Inc22 imgArr={img2022} key={0} />,
      <Inc23 imgArr={img2023} clockPos={clockPos} key={1} />,
      <Inc24 imgArr={img2024} key={2} />,
      <Inc25 key={3} />,
    ];
    return components[activeYear] ?? null;
  };

  // useEffect(() => {
  //   setTimeout(() => {
  //     setChangedYear(3);
  //   }, 1000);
  // }, [])

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
          className={`absolute -z-10
             w-[140%] h-[140%] -mt-[20%] -mb-[20%]
             sm:w-[130%] sm:h-[130%] sm:-mt-[15%] sm:-mb-[15%]
             md:w-[120%] md:h-[120%] md:-mt-[10%] md:-mb-[10%]
             ${activeYear === 3 ? "" : "bg-[url('/2025/gallery/galleryBg.webp')] bg-cover bg-center bg-no-repeat blur-[5px] brightness-75"}
             `}
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
