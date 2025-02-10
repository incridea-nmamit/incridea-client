"use client";
import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import Sky from "~/components/spearThrow/sky";
import {
  GameContext,
  GameProvider,
  GameStatus,
  useAnimation,
} from "~/components/spearThrow/gameContext";
import Player from "~/components/spearThrow/player";
import Creature from "~/components/spearThrow/creature";
import ScoreBoard from "~/components/spearThrow/scoreboard";
import { Button } from "~/components/ui/button";
import { useRouter } from "next/router";

const nextLevelUrl = "/explore";

export default function Game() {
  return (
    <>
      <GameProvider>
        <div className="relative w-screen h-screen select-none overflow-hidden">
          <Image
            src="/2025/explore/throwspear/background/backdrop.webp"
            alt="backdrop"
            width={3200}
            height={1323}
            className="h-screen z-0 absolute top-0 left-0 object-cover"
          />
          <Image
            src="/2025/explore/throwspear/background/backdrop1.png"
            alt="backdrop"
            width={3200}
            height={1323}
            className="h-screen z-20 absolute top-0 left-0 object-cover"
          />
          <Sky />
          <Player />
          <Creature />
          <ScoreBoard />
        </div>
        <Instruction />
      </GameProvider>
    </>
  );
}

function Instruction() {
  const gameContext = useContext(GameContext);
  const router = useRouter();
  const [showInstruction, setShowInstruction] = useState(true);
  const [isLandscape, setIsLandscape] = useState(true);
  const [gameAnimationContext, setGameAnimationContext] = useState(gameContext);
  useAnimation((value) => {
    setGameAnimationContext({ ...value });
  });

  useEffect(() => {
    const handleResize = () => {
      const newIsLandscape = window.innerWidth > window.innerHeight;
      if (newIsLandscape !== isLandscape) {
        window.location.reload();
      }
      setIsLandscape(newIsLandscape);
    };

    if (typeof window !== "undefined") {
      handleResize();
      window.addEventListener("resize", handleResize);
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("resize", handleResize);
      }
    };
  }, []);

  if (gameAnimationContext.gameStatus.current === GameStatus.win) {
    return (
      <>
        <div
          className={`flex justify-center items-center fixed top-0 left-0 bg-black/70 w-full h-full z-50`}
        >
          <div className="border-2 relative border-white p-4 rounded bg-black/30 max-w-lg mx-2 flex flex-col gap-2 text-center">
            <h1 className="text-3xl text-white">Congratulations 🥳</h1>
            <p className="text-white mt-2">
              You have successfully defeated the monster!
              <br /> You have won an Easter Egg 🥚!
            </p>
            <div className="w-full flex flex-row flex-nowrap gap-4 justify-center mt-4">
              <Button
                onClick={async () => {
                  await router.push(nextLevelUrl);
                }}
                className="rounded-none border-white border-2 bg-green-800 hover:bg-green-600 hover:text-black"
              >
                Next
              </Button>
              <Button
                onClick={async () => {
                  await router.push("/");
                }}
                className="rounded-none border-white border-2 bg-green-800 hover:bg-green-600 hover:text-black"
              >
                Home
              </Button>
            </div>
          </div>
        </div>
      </>
    );
  } else if (gameAnimationContext.gameStatus.current === GameStatus.lose) {
    return (
      <>
        <div
          className={`flex justify-center items-center fixed top-0 left-0 bg-black/70 w-full h-full z-50`}
        >
          <div className="border-2 relative border-white p-4 rounded bg-black/30 max-w-lg mx-2 flex flex-col gap-2 text-center">
            <h1 className="text-3xl text-white">Game Over 😢</h1>
            <p className="text-white">
              The monster has defeated you.
              <br /> Better luck next time!
            </p>
            <div className="w-full flex flex-row flex-nowrap gap-4 justify-center mt-4">
              <Button
                onClick={() => {
                  window.location.reload();
                }}
                className="rounded-none border-white border-2 bg-green-800 hover:bg-green-600 hover:text-black"
              >
                Try Again
              </Button>
              <Button
                onClick={async () => {
                  await router.push("/");
                }}
                className="rounded-none border-white border-2 bg-green-800 hover:bg-green-600 hover:text-black"
              >
                Home
              </Button>
            </div>
          </div>
        </div>
      </>
    );
  } else if (gameContext.gameStatus.current === GameStatus.ongoing) {
    return (
      <div
        className={`flex justify-center items-center fixed top-0 left-0 bg-black/70 w-full h-full z-50 ${
          showInstruction ? "" : "hidden"
        }`}
      >
        {isLandscape ? (
          <div className="border-2 relative border-white p-4 rounded bg-black/30 max-w-lg mx-2 flex flex-col gap-2 text-center">
            <h1 className="text-3xl text-white">Instructions</h1>
            <p className="text-white">
              Click on the screen to throw spear at the monster. The angle at
              which you click from Ryoko depends on your throw. Kill the monster
              before it kills you and receive a surprise gift.
            </p>
            <div className="w-full flex flex-row flex-nowrap gap-4 justify-center mt-4">
              <Button
                onClick={() => {
                  gameContext.updatePaused();
                  setShowInstruction(false);
                }}
                className="rounded-none border-white border-2 bg-green-800 hover:bg-green-600 hover:text-black"
              >
                Start
              </Button>
              <Button
                onClick={async () => {
                  await router.push("/");
                }}
                className="rounded-none border-white border-2 bg-green-800 hover:bg-green-600 hover:text-black"
              >
                Home
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center">
            <div className="flex flex-col justify-center items-center bg-black/30 border-2 border-white rounded mx-4">
              <h1 className="text-2xl text-white my-4 mx-2 text-center">
                Please rotate your device to landscape mode
              </h1>
              <Image
                className="mb-4"
                src="/2025/assets/explore/throwspear/ROTAR.gif"
                alt="Rotate Device"
                width={100}
                height={100}
              />
            </div>
          </div>
        )}
      </div>
    );
  }
}
