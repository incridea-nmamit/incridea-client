import Image from "next/image";
import React, { useState } from "react";

import Banner from "~/components/aboutUs/banner";
import { env } from "~/env";

const images = [
  { id: 15, alt: "a forest after an apocalypse" },
  { id: 15, alt: "a waterfall and many rocks" },
  { id: 15, alt: "a house on a mountain" },
  { id: 15, alt: "some pink flowers" },
  { id: 15, alt: "big rocks with some trees" },
  { id: 15, alt: "a waterfall, trees and a view from the sky" },
  { id: 15, alt: "a cool landscape" },
  { id: 15, alt: "inside a town between two big buildings" },
];

const About = () => {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className="max-w-screen-2xl mx-auto p-4 md:p-12 flex flex-col gap-y-2 md:gap-16">
      <div className="flex min-h-screen flex-col gap-y-2 md:gap-16">
        <Banner
          video={"https://vimeo.com/883551016?share=copy"}
          text=""
          credits=""
        />

        <span className="text-base text-secondary-100 md:text-lg xl:text-xl">
          <div className="flex flex-col items-center justify-between gap-8 lg:flex-row">
            <Image
              src={`${env.NEXT_PUBLIC_BASE_IMAGE_URL}/assets/png/nitteLogoWhite.png`}
              alt="image"
              loading="lazy"
              className="top-0 h-full w-3/4 object-contain object-center md:w-1/3"
              height={500}
              width={500}
            />
            <div className="max-w-3xl text-justify">
              Nitte Mahalinga Adyantaya Memorial Institute of Technology
              (NMAMIT), Nitte, established in 1986 and recognized by the
              All-India Council for Technical Education, New Delhi, has been a
              constituent college of Nitte (Deemed to be University), Mangaluru,
              since June 2022. NMAMIT is placed in the Rank band 101-150 in the
              National Institutional Ranking Framework (NIRF) 2023 by the
              Ministry of Education, Government of India. NMAMIT, the off-campus
              centre of Nitte DU located at Nitte Village, has active
              collaborations with several international universities and
              organizations for faculty and student exchanges, research,
              internships and placements.
              <br />
              <br />
              The Institute offers UG engineering program in fifteen
              disciplines, PG program M.Tech. in seven disciplines & MCA
              program. All the departments have qualified research guides for
              students interested in taking up research work leading to Ph.D.
              For details, visit{" "}
              <a
                href="https://nmamit.nitte.edu.in/"
                target="_blank"
                rel="noreferrer"
                className="underline underline-offset-4"
              >
                www.nmamit.nitte.edu.in
              </a>
            </div>
          </div>
        </span>
      </div>
      <Banner
        video={"https://vimeo.com/909929083?share=copy"}
        text=""
        credits=""
      />
      <span className="text-base text-secondary-100 md:text-lg xl:text-xl">
        <div className="relative flex flex-col items-center justify-between gap-16 lg:flex-row">
          {/* Gallery Section - Contained width, proper spacing */}
          <div className="relative w-full lg:w-2/4 pt-24 pb-28">
            <style jsx>{`
              .gallery {
                --s: min(120px, 80vw);
                position: relative;
                width: var(--s);
                height: var(--s);
                margin: 0 auto;
                cursor: pointer;
                z-index: 10;
              }

              .gallery > img {
                position: absolute;
                width: 100%;
                height: 100%;
                grid-area: 1/1;
                border-radius: 50%;
                object-fit: cover;
                transform: scale(0.5);
                opacity: 0;
                transition:
                  transform 1s ease,
                  opacity 0.5s ease;
              }

              ${images
                .map(
                  (_, index) => `
                .gallery > img:nth-of-type(${index + 2}) {
                  --i: ${index + 1};
                  transition-delay: ${index * 0.1}s;
                }
              `,
                )
                .join("\n")}

              .gallery > img.active {
                opacity: 1;
                transform: rotate(calc(var(--i) * 360deg / 8))
                  translate(calc(1.5 * var(--s)))
                  rotate(calc(var(--i) * -360deg / 8));
              }

              @media (max-width: 1024px) {
                .gallery {
                  --s: min(100px, 60vw);
                }

                .gallery > img.active {
                  transform: rotate(calc(var(--i) * 360deg / 8))
                    translate(calc(1.2 * var(--s)))
                    rotate(calc(var(--i) * -360deg / 8));
                }
              }

              @media (max-width: 480px) {
                .gallery {
                  --s: min(95px, 60vw);
                }

                .gallery > img.active {
                  transform: rotate(calc(var(--i) * 360deg / 8))
                    translate(calc(1 * var(--s)))
                    rotate(calc(var(--i) * -360deg / 8));
                }
              }

              .logo {
                z-index: 10;
                transform-origin: center;
                opacity: 1 !important;
              }
            `}</style>

            <div className="gallery" onClick={() => setIsActive(!isActive)}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`${env.NEXT_PUBLIC_BASE_IMAGE_URL}/assets/png/logo-rim-white.png`}
                alt="Incridea Logo"
                loading="lazy"
                className={`object-contain logo ${isActive ? "active" : ""} object-contain origin-bottom animate-shakelogo`}
                height={400}
                width={400}
              />
              {images.map(({ id, alt }) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={id}
                  src={`https://picsum.photos/id/${id}/300/300`}
                  alt={alt}
                  className={isActive ? "active " : ""}
                />
              ))}
            </div>
          </div>

          {/* Content Section - More width, proper spacing */}
          <div className="relative z-0 w-full lg:w-2/4 px-2 lg:pl-14 flex justify-center items-center">
            <div className="max-w-3xl text-justify">
              Incridea is a colossal national-level techno-cultural fest with an
              audience pool spread among{" "}
              <span className="font-bold">200 colleges</span> all across India.
              The fest holds the values abbreviated in the name, i.e.{" "}
              <span className="font-bold">Innovate, Create and Ideate</span> at
              the highest standard possible by becoming a symbol of technology,
              passion, culture and conviction among students. Incridea is
              conducted with the help of many services and technology created
              and operated by students, making it one of the most indigenous
              college fests with resources and capabilities beyond expectations.
              <br />
              <br />
              Pronites of Incridea has seen a wide range of popular and talented
              artists, DJs, and bands. The fest constitutes over{" "}
              <span className="font-bold">40+ events</span> and expected
              footfall of around <span className="font-bold">45,000</span>,
              making it one of the most happening fests in the region. With
              grand successes over the years and a flair for perfection, we
              intend to make Incridea &apos;24 and grand success and the best
              one so far.
            </div>
          </div>
        </div>
      </span>
    </div>
  );
};

export default About;
