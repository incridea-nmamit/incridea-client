import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import Image from "next/image";
import Link from "next/link";
import MobileNav from "./mobileNav";
import { useAuth } from "~/hooks/useAuth";
import { Role } from "~/generated/generated";
import { useRouter } from "next/router";
import { cn } from "~/lib/utils";
import { CONSTANT } from "~/constants";

const Navbar = () => {
  const logoRef = useRef(null);
  const textRef = useRef(null);
  const { user } = useAuth();
  const router = useRouter();
  const pathname = router.pathname;

  const tabs: {
    id: number;
    label: string;
    href: string;
  }[] = [
      {
        id: 3,
        label: "Home",
        href: "/",
      },
      {
        id: 2,
        label: "Explore",
        href: "/explore",
      },
      {
        id: 1,
        label: "Events",
        href: "/events",
      },
      // {
      //   id: 4,
      //   label: "Sponsors",
      //   href: "/sponsors",
      // },
      {
        id: 4,
        label: "Gallery",
        href: "/gallery",
      },
      {
        id: 5,
        label: "Pronites",
        href: "/pronites",
      },
      {
        id: 6,
        label: "About",
        href: "/about",
      },
    ];

  useEffect(() => {
    gsap.set(textRef.current, { opacity: 1 });
    gsap.set(logoRef.current, { opacity: 0 });

    const tl = gsap.timeline({ repeat: -1 });

    tl.to(textRef.current, {
      opacity: 0,
      duration: 0.3,
    })
      .to(logoRef.current, {
        opacity: 1,
        duration: 0.3,
      })

      .to(logoRef.current, {
        opacity: 1,
        duration: 1.7,
      })
      .to(logoRef.current, {
        opacity: 0,
        duration: 0.3,
      })
      .to(textRef.current, {
        opacity: 1,
        duration: 0.3,
      })

      .to(textRef.current, {
        opacity: 1,
        duration: 1.7,
      });
  }, []);

  return (
    <>
      {/* PC Nav */}
      <nav
        style={{
          clipPath:
            "polygon(3% 0%, 97% 0%, 100% 50%, 97% 100%, 3% 100%, 0% 50%)",
        }}
        className="fixed font-life-craft tracking-wider w-full top-1 bg-white/10 backdrop-blur-2xl h-16 lg:flex hidden items-center justify-center rounded-full z-50"
      >
        <div className="flex items-center 2xl:mr-[20rem] lg:mr-[15rem] mr-[11rem] xl:gap-x-20 lg:gap-x-12 gap-x-8 text-2xl">
          {tabs.slice(0, 3).map((tab) => (
            <Link
              href={tab.href}
              key={tab.id}
              className="py-2 text-gray-300 hover:text-white transition-colors"
            >
              {tab.label}
            </Link>
          ))}
        </div>

        <button
          style={{
            clipPath: "polygon(0 0, 100% 0, 75% 100%, 25% 100%)",
          }}
          className={`absolute top-0 ${pathname === "/" ? "bg-gradient-to-br from-[#186C16] to-[#186C16] via-primary-950" : "bg-white"} px-12 py-2 text-white text-2xl shadow-md flex rounded-b-xl justify-center items-center hover:bg-gray-100 transition-all scale-[250%] hover:scale-[260%]`}
        >
          <div className="relative w-16 h-6 flex justify-center items-center">
            <Image
              ref={logoRef}
              src={CONSTANT.ASSETS.PUBLIC.LOGO_RIM}
              alt="Logo"
              className="absolute size-5 opacity-0 translate-y-1"
              width={40}
              height={40}
            />
            <Link
              ref={textRef}
              href={
                !user
                  ? "/login"
                  : user.role === Role.User
                    ? "/register"
                    : pathname === "/profile"
                      ? user.role !== Role.Participant
                        ? "/dashboard"
                        : "/"
                      : "/profile"
              }
              className={cn(
                pathname === "/" ? "text-white" : "text-black",
                "absolute scale-[60%] translate-y-[0.4rem]",
              )}
            >
              {!user
                ? "REGISTER"
                : user.role === Role.User
                  ? "REGISTER"
                  : pathname === "/profile"
                    ? user.role !== Role.Participant
                      ? "DASHBOARD"
                      : "HOME"
                    : "PROFILE"}
            </Link>
          </div>
        </button>

        <div className="flex items-center 2xl:ml-[20rem] lg:ml-[15rem] ml-[11rem] xl:gap-x-20 lg:gap-x-12 gap-x-8 text-2xl">
          {tabs.slice(3).map((tab) => (
            <Link
              href={tab.href}
              key={tab.id}
              className=" py-2 text-gray-300 hover:text-white transition-colors"
            >
              {tab.label}
            </Link>
          ))}
        </div>
      </nav>
      <MobileNav user={user} />
    </>
  );
};

export default Navbar;
