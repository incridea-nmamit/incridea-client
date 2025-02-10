import { type NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";

import LoginCard from "~/components/login/card";
import EasterBomb from "~/components/login/easterBomb";
import FallingItem from "~/components/login/fallingItem";
import { env } from "~/env";

type CardStyle = {
  opacity: string;
  transitionDuration: string;
  pointerEvents: React.CSSProperties["pointerEvents"];
};

// HACK: If "top" values are changed, please check LoginCard component logic once
const CARD_SWITCH_DURATION = 1000; // 1 second

const CARD_TOP_STYLE = {
  opacity: "0%",
  transitionDuration: "500ms",
  pointerEvents: "none" as React.CSSProperties["pointerEvents"],
};

const CARD_NEUTRAL_STYLE = {
  opacity: "100%",
  transitionDuration: "3000ms",
  pointerEvents: "auto" as React.CSSProperties["pointerEvents"],
};

const CARD_BOTTOM_STYLE = {
  opacity: "100%",
  transitionDuration: "1500ms",
  pointerEvents: "none",
};

const SignIn: NextPage = () => {
  const {
    query,
  }: {
    query: {
      whichForm?: "signIn" | "resetPassword" | "signUp" | "resendEmail";
      redirectUrl?: string;
    };
  } = useRouter();

  const [whichForm, setWhichForm] = useState<
    "signIn" | "resetPassword" | "signUp" | "resendEmail"
  >(query.whichForm ?? "signUp");

  const [radius1, setRadius1] = useState<number>(0); // Small gear radius
  const [radius2, setRadius2] = useState<string>("0"); // Large gear radius
  const [bottom1, setBottom1] = useState<string>("90%");
  const [scale1, setScale1] = useState<string>("");
  const [secondsAnimation, setSecondsAnimation] = useState<string>("20000s");
  const [rotationAngle1, setRotationAngle1] = useState<number>(0);
  const [rotationAngle2, setRotationAngle2] = useState<number>(0);

  const [gearPosition, setGearPosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [radius3, setRadius3] = useState<number>(0);
  const [transitioning, setTransitioning] = useState<boolean>(false);

  const [cardStyle, setCardStyle] = useState<{
    signIn: CardStyle;
    signUp: CardStyle;
    resetPassword: CardStyle;
    resendEmail: CardStyle;
  }>({
    signIn: CARD_TOP_STYLE,
    resetPassword: CARD_TOP_STYLE,
    signUp: CARD_TOP_STYLE,
    resendEmail: CARD_TOP_STYLE,
    [whichForm]: CARD_NEUTRAL_STYLE,
  });

  const changeCard: (
    newForm: "signIn" | "resetPassword" | "signUp" | "resendEmail",
  ) => void = (newForm) => {
    if (whichForm === newForm || transitioning) return;

    const audio1 = new Audio("/2025/audio/gearsounds.mp3");
    audio1
      .play()
      .then(() => {
        console.log("audio played");
      })
      .catch((err) => {
        console.log("audio not played", err);
      });

    // setSecondsAnimation(`${CARD_SWITCH_DURATION * 0.9}s`);
    setRotationAngle1((prev) => prev + 360);
    setRotationAngle2((prev) => prev - 360);

    setTransitioning(true);

    setCardStyle((prev) => ({
      ...prev,
      [whichForm]: CARD_BOTTOM_STYLE,
      [newForm]: CARD_NEUTRAL_STYLE,
    }));

    setTimeout(() => {
      setCardStyle((prev) => ({
        ...prev,
        [whichForm]: CARD_TOP_STYLE,
      }));
      setSecondsAnimation("0s");
      setTimeout(() => {
        setTransitioning(false);
        audio1.pause();
      }, CARD_SWITCH_DURATION);
    }, CARD_SWITCH_DURATION * 0.9);

    setWhichForm(newForm);
  };

  const [gearDistance, setGearDistance] = useState<number>(0);
  const formRef = useRef<HTMLDivElement>(null);

  // setRadius1(Math.max(400, window.screen.width * 0.6));
  // setRadius2(window.screen.width * 0.35);

  const resizer = () => {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    let gear1Radius: number;
    let gear2Radius: number;
    let top: number;
    // Dynamically calculate radii
    // if (screenWidth < 440) {
    //   gear2Radius = screenWidth / 0.4; // Half the screen width
    //   gear1Radius = gear2Radius; // Proportional size for smaller gear
    //   console.log("gear2Radius", gear2Radius);
    //   setRadius1(gear1Radius);
    //   setRadius2(gear2Radius);
    // }
    if (screenWidth < 600) {
      gear2Radius = screenWidth; // Half the screen width
      gear1Radius = gear2Radius * 0.8; // Proportional size for smaller gear
      console.log("gear2Radius", gear2Radius);
      setRadius1(gear1Radius);
      setRadius2("300vw");
      setScale1("1.4");
      setBottom1("80%");
    } else if (screenWidth < 1400) {
      gear2Radius = screenWidth; // Half the screen width
      gear1Radius = gear2Radius * 0.8; // Proportional size for smaller gear
      console.log("gear2Radius", gear2Radius);
      setRadius1(gear1Radius);
      setRadius2("160vw");
      setScale1("");
      setBottom1("80%");
    } else if (screenWidth < 1500) {
      gear2Radius = screenWidth / 1; // Half the screen width
      gear1Radius = gear2Radius * 0.8; // Proportional size for smaller gear
      console.log("gear2Radius", gear2Radius);
      setRadius1(gear1Radius);
      setRadius2(`${gear2Radius}px`);
      setScale1("");
      setBottom1("80%");
    } else {
      gear2Radius = screenWidth / 1;
      gear1Radius = gear2Radius * 0.8;
      setRadius1(gear1Radius);
      setRadius2(`${gear2Radius}px`);
      setScale1("");
      setBottom1("80%");
    }

    // Calculate positioning for gear1 to attach to gear2
    const distancegear = gear1Radius / 2 + gear2Radius / 2; // Edge-to-edge distance
    setGearDistance(distancegear);
    const angle = 0; // Horizontal attachment, adjust angle for diagonal placement
    const x = gear2Radius - gear1Radius; // Attach gear1 to left edge of gear2
    const y = 0; // No vertical offset for alignment

    setGearPosition({ x, y });
  };

  useEffect(() => {
    resizer();
    window.addEventListener("resize", resizer);
  }, []);

  // setRadius3(Math.max(window.screen.width * 1));

  return (
    <>
      <div className="h-16"></div>
      <Image
        fill={true}
        className="object-cover blur-[3px]"
        src={`/2025/bg-login.jpeg`}
        alt={"loginBG"}
        quality={100}
        priority
      />

      <div
        className={`relative flex min-h-[73vh] h-screen flex-col justify-between [perspective:500px] [transform-style:preserve-3d] overflow-hidden`}
      >
        {/* TODO: Change the time delay here according to time delay set for free-fall animation in tailwind.config.js */}
        {/* 
        <div className="absolute -top-[10vh] left-2/4 z-30 h-0 w-[65vw] -translate-x-2/4 md:w-[440px]">
          <EasterBomb />
        </div> */}

        <div className="relative w-[500vw] h-[160vh] flex items-center justify-center self-center">
          {/* <div className="absolute w-[130vw] h-[130vh] bg-[url('http://localhost:3000/assets/svg/geardone2.svg')] bg-cover bg-center top-full -translate-y-1/2"></div> */}
          <div
            style={{
              width: radius1,
              height: radius1,
              left: "42%",
              bottom: bottom1,
              rotate: "18deg",
              transform: `rotate(${rotationAngle1}deg)`,
              transition: "transform 2s ease-in-out",
              scale: scale1,
            }}
            className="absolute scale-150 translate-y-1/2"
          >
            <div className="relative size-full">
              <Image src="/2025/gear.webp" alt="" fill priority />
            </div>
          </div>
          <div
            style={{
              top: "18%",
              width: radius2,
              height: radius2,
              transform: `rotate(${rotationAngle2}deg)`,
              transition: "transform 2s ease-in-out",
            }}
            className="fixed translate-y-1/2 h-full scale-[1.85]"
          >
            <div className="absolute size-full">
              <Image src="/2025/gear.webp" alt="" priority fill />
            </div>
            <div className="size-full relative">
              <LoginCard
                whichForm="signIn"
                cardStyle={cardStyle.signIn}
                setWhichForm={changeCard}
                redirectUrl={query.redirectUrl}
              />

              <LoginCard
                whichForm="resetPassword"
                cardStyle={cardStyle.resetPassword}
                setWhichForm={changeCard}
              />
              <LoginCard
                whichForm="signUp"
                cardStyle={cardStyle.signUp}
                setWhichForm={changeCard}
              />
              <LoginCard
                whichForm="resendEmail"
                cardStyle={cardStyle.resendEmail}
                setWhichForm={changeCard}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export type { CardStyle };
export default SignIn;
