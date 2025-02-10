import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { type Sponsor } from "~/constants/sponsors";

const SponsorGearCarousel = ({
  sponsors,
  isSoundEnabled,
  setIsSoundEnabled,
}: {
  sponsors: Sponsor[];
  isSoundEnabled: boolean;
  setIsSoundEnabled: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const smallGearRef = useRef<HTMLDivElement>(null);
  const largeGearRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const lastScrollY = useRef(0);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);
  const isAnimating = useRef(false);

  useEffect(() => {
    audioRef.current = new Audio("/2025/audio/GearClockAudio.mp3");
    if (audioRef.current) {
      audioRef.current.volume = 0.2;
    }

    gsap.from([smallGearRef.current, largeGearRef.current], {
      rotation: 360,
      duration: 2,
      ease: "power2.inOut",
      stagger: 0.2,
    });

    gsap.to(".scroll-helper", {
      y: "10px",
      duration: 1,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
    });

    gsap.to(".audio-helper", {
      y: "-5px",
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
    });

    const handleScroll = () => {
      if (isAnimating.current || !scrollContainerRef.current) return;

      const currentScrollY = scrollContainerRef.current.scrollTop;
      const scrollingDown = currentScrollY > lastScrollY.current;

      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }

      scrollTimeout.current = setTimeout(() => {
        if (!isAnimating.current) {
          isAnimating.current = true;

          if (isSoundEnabled && audioRef.current) {
            audioRef.current.currentTime = 0;
            audioRef.current.play().catch((error) => {
              console.error("Failed to play audio:", error);
              setIsSoundEnabled(false);
            });
          }

          gsap.to(smallGearRef.current, {
            rotation: `+=${scrollingDown ? 30 : -30}`,
            duration: 1,
            ease: "elastic.out(1, 0.5)",
          });

          gsap.to(largeGearRef.current, {
            rotation: `+=${scrollingDown ? -30 : 30}`,
            duration: 1,
            ease: "elastic.out(1, 0.5)",
          });

          gsap
            .timeline()
            .to(cardRef.current, {
              opacity: 0,
              scale: scrollingDown ? 0.8 : 1.2,
              duration: 0.4,
              ease: "power2.inOut",
            })
            .call(() => {
              setCurrentIndex((prev) => {
                if (scrollingDown) {
                  return prev === sponsors.length - 1 ? 0 : prev + 1;
                } else {
                  return prev === 0 ? sponsors.length - 1 : prev - 1;
                }
              });
            })
            .to(cardRef.current, {
              opacity: 1,
              scale: 1,
              duration: 0.4,
              ease: "power2.out",
              onComplete: () => {
                isAnimating.current = false;
              },
            });
        }
      }, 100);

      lastScrollY.current = currentScrollY;
    };

    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener("scroll", handleScroll);
      }
    };
  }, [sponsors.length, isSoundEnabled]);

  return (
    <div
      ref={scrollContainerRef}
      className="relative w-full h-[calc(100vh-12rem)] overflow-y-scroll scrollbar-hide overflow-x-clip"
    >
      <div ref={containerRef} className="relative w-full">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:20px_20px]" />

        <div className="sticky top-[40%] lg:top-1/2 -translate-y-1/2 w-full">
          <div
            ref={smallGearRef}
            className="absolute  sm:left-[6%] sm:top-[50%] md:left-[13%] md:top-[60%] lg:left-[16%] lg:top-[55%] xl:left-[24%] xl:top-[60%] -translate-y-1/2"
          >
            <div className="w-72 h-72 sm:w-[301px] sm:h-[301px] md:w-72 md:h-72 lg:w-[291px] lg:h-[291px]">
              <img
                src="/2025/sponsors/GearClock.png"
                alt="SmallGear"
                className="w-full h-full"
              />
            </div>
          </div>

          <div
            ref={largeGearRef}
            className="absolute left-[25%] top-[50%] md:left-[30%] md:top-[59%] lg:left-[28%] lg:top-[60%] xl:left-[33%] xl:top-[63%] -translate-y-1/2"
          >
            <div className="sm:w-[541px] sm:h-[541px] md:w-[581px] md:h-[581px] lg:w-[721px] lg:h-[721px]">
              <img
                src="/2025/sponsors/GearClock.png"
                alt="LargerGear"
                className="w-full h-full"
              />
            </div>
          </div>

          <div
            ref={cardRef}
            className="h-[25rem] sm:h-auto absolute sm:mt-0 mx-3 left-[5%] top-[75%] sm:left-[10%] sm:top-[50%] md:left-[20%] md:top-[59%] lg:left-[26%] lg:top-[40%] xl:left-[32%] -translate-y-1/2 max-w-xl"
          >
            <div className="bg-[#054432]/90 backdrop-blur-sm rounded-xl border-2 border-amber-500/50 shadow-lg p-4 md:p-6 hover:border-amber-500 transition-colors">
              <div className="flex flex-col items-center gap-4">
                {sponsors[currentIndex]?.title && (
                  <h3 className="text-center text-2xl text-amber-500">
                    {sponsors[currentIndex].title}
                  </h3>
                )}
                <div className="relative w-32 h-32 md:w-40 md:h-40">
                  {sponsors[currentIndex]?.notCloudinary ? (
                    <Image
                      src={`/2025/sponsors/${sponsors[currentIndex]?.logo}`}
                      fill
                      alt={sponsors[currentIndex]?.name ?? "Logo"}
                      className="object-contain"
                    />
                  ) : (
                    <Image
                      src={
                        `${process.env.NEXT_PUBLIC_BASE_IMAGE_URL}/sponsors/${sponsors[currentIndex]?.logo}` ||
                        `/2025/sponsors/${sponsors[currentIndex]?.logo}`
                      }
                      fill
                      alt={sponsors[currentIndex]?.name ?? "Sponsor Logo"}
                      className="object-contain"
                    />
                  )}
                </div>

                <div className="text-center">
                  {sponsors[currentIndex] && (
                    <>
                      <h3 className="text-2xl text-amber-500 mb-2">
                        {sponsors[currentIndex].name}
                      </h3>
                      <p
                        className={`text-emerald-100/90 text-sm ${sponsors[currentIndex].websiteURL ? "text-left" : "text-pretty"}`}
                      >
                        {sponsors[currentIndex].desc}
                      </p>
                    </>
                  )}
                </div>

                {sponsors[currentIndex]?.websiteURL && (
                  <a
                    href={sponsors[currentIndex].websiteURL}
                    target="_blank"
                    rel="noreferrer"
                    className="absolute bottom-0 right-0 group flex items-center gap-2 px-4 py-2 bg-amber-500 text-[#054432] hover:bg-amber-400 transition-all hover:scale-105 rounded-tl-2xl rounded-br-2xl rounded-tr-sm rounded-bl-sm"
                  >
                    Visit Website
                    <ExternalLink className="transition-transform group-hover:translate-x-1" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Create space for scrolling */}
        <div style={{ height: `${sponsors.length * 100}vh` }} />
      </div>
    </div>
  );
};

export default SponsorGearCarousel;
