/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import React, { useEffect, useMemo, useRef, useState } from "react";

import * as THREE from "three";
import MasalaModel from "~/components/pronite/masala_coffee";
import Stage from "~/components/pronite/stage";
import Screen from "~/components/pronite/screen";
import Shaan from "~/components/pronite/shaan";

import {
  Box,
  MeshReflectorMaterial,
  useAnimations,
  useGLTF,
  useTexture,
  useVideoTexture,
} from "@react-three/drei";
import {
  Canvas,
  Euler,
  ExtendedColors,
  Layers,
  Matrix4,
  NodeProps,
  NonFunctionKeys,
  Overwrite,
  Quaternion,
  useFrame,
  useThree,
  Vector3,
} from "@react-three/fiber";

import Image from "next/image";
import { EventHandlers } from "@react-three/fiber/dist/declarations/src/core/events";

const videos = [
  "https://res.cloudinary.com/dliarni5j/video/upload/v1739119567/shaan_z13zrz.mov",

  "https://res.cloudinary.com/dliarni5j/video/upload/v1739079132/Coffee_pdoave.mp4",
];
const songs = [
  "https://res.cloudinary.com/dliarni5j/video/upload/v1739121952/Chaar_Kadam_vsre4a.mp3",
  "https://res.cloudinary.com/dliarni5j/video/upload/v1739121950/Musu_Musu_uqvaqg.mp3",
  "https://res.cloudinary.com/dliarni5j/video/upload/v1739121945/Deevangi_lfwynw.mp3",
  "https://res.cloudinary.com/dliarni5j/video/upload/v1739127684/kantaa_wofgg1.mp3",
  "https://res.cloudinary.com/dliarni5j/video/upload/v1739127684/Adiyelo_hr9sno.mp3",
];

const songname = [
  "Chaar Kadam - Shreya Ghoshal, Shaan",
  "Musu Musu - Shaan",
  "Deewangi Deewangi - Shaan, Sunidhi Chauhan, Shreya Ghoshal, Udit Narayan",
  "Kaantha - Sooraj Santhosh, Masala Coffee, Varun Sunil",
  "Aadiyilalo - Masala Coffee",
];

useGLTF.preload("/2025/pronites/singer.glb");
useGLTF.preload("/2025/pronites/guitarist.glb");
useGLTF.preload("/2025/Pronites/shaan.glb");
useGLTF.preload("/2025/pronites/drums.glb");
useGLTF.preload("/2025/Pronites/pianist.glb");

export default function App() {
  const lightRef = useRef();

  const targetRef = useRef();

  const [lightC, setLightC] = useState("#00FFFF");
  const [actLight, setActLight] = useState(false);
  const [isAudioOn, setIsAudioOn] = useState(false);
  var video = lightC == "#00FFFF" ? 0 : 1;
  const [audio] = useState(new Audio());
  const audioRef = useRef(audio);
  const [currentSong, setCurrentSong] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [showWarning, setShowWarning] = useState(true);

  useEffect(() => {
    if (lightRef.current && targetRef.current) {
      lightRef.current.target = targetRef.current;

      lightRef.current.target.updateMatrixWorld();
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000); // 3 seconds minimum loading time

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWarning(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const [activeGradient, setActiveGradient] = useState<"blue" | "red">("blue");
  const handleBlueClick = () => {
    setActiveGradient("blue");
    console.log("Blue gradient activated");
    setLightC("#00FFFF");
  };

  const handleRedClick = () => {
    setActiveGradient("red");
    console.log("Red gradient activated");
    const lights = document.querySelectorAll("pointLight");
    setLightC("#FF0000");
  };

  const handleAudioToggle = () => {
    setIsAudioOn(!isAudioOn);
  };

  const handleLightsToggle = () => {
    setActLight(!actLight);
  };

  const [camPos, setCamPos] = useState([0, 12, 30]);

  const handleCloseToggle = () => {
    setCamPos([10, 5, 10]);
  };

  const handleCenterToggle = () => {
    setCamPos([0, 12, 30]);
  };

  const handleFarToggle = () => {
    setCamPos([-30, 12, 40]);
  };

  console.log(videos[video]);

  const getRandomShaanSong = () => Math.floor(Math.random() * 3);
  const getRandomMasalaSong = () => Math.floor(3 + Math.random() * 2);

  // Update audio when artist changes or audio toggle changes
  useEffect(() => {
    const currentAudio = audioRef.current;

    if (isAudioOn) {
      // For Shaan (blue/cyan color), pick random song from first 3
      // For Masala Coffee (red color), use the last song
      const songIndex =
        lightC === "#00FFFF" ? getRandomShaanSong() : getRandomMasalaSong();
      currentAudio.src = songs[songIndex];
      currentAudio.loop = true;
      setCurrentSong(songname[songIndex]);

      currentAudio
        .play()
        .catch((err) => console.log("Audio playback failed:", err));
    } else {
      currentAudio.pause();
      setCurrentSong("");
    }

    return () => {
      currentAudio.pause();
      currentAudio.src = "";
    };
  }, [video, isAudioOn, lightC]);

  return (
    <div>
      {showWarning && (
        <div className="fixed top-12 left-1/2 -translate-x-1/2 z-[60] bg-black px-4 py-2 rounded-lg border border-yellow-500/50 text-yellow-500 text-sm md:text-base animate-fade-out">
          Extra Light effects (💡) may affect performance on some devices
        </div>
      )}

      {isLoading ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
          <div className="text-center">
            <div className="relative w-16 h-16 mx-auto mb-8">
              <div className="absolute inset-0 border-8 border-t-cyan-400 border-r-cyan-400 border-b-red-500 border-l-red-500 rounded-full animate-spin"></div>
            </div>
            <div className="text-white text-lg font-medium">
              Constructing Pronite Stage
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="fixed top-20 w-full z-50 gap-2 flex justify-between p-4 ">
            <button
              onClick={handleAudioToggle}
              className={`px-2 py-2 rounded-sm font-medium text-sm shadow-lg transition-all duration-300 hover:scale-105 lg:text-2xl lg:px-5
              ${
                isAudioOn
                  ? "bg-gradient-to-r from-pink-300 to-pink-200 text-white"
                  : "backdrop-blur-sm bg-transparent text-gray-100 border border-gray-100"
              }`}
            >
              {isAudioOn ? "🔊" : "🔈"}
            </button>
            <button
              onClick={handleCloseToggle}
              className={`px-2 grow py-2 lg:hidden rounded-sm font-medium text-sm shadow-lg transition-all duration-300 hover:scale-105
              ${
                camPos[0] === 10 && camPos[1] === 5 && camPos[2] === 10
                  ? "bg-gradient-to-r from-emerald-900 to-emerald-500 text-white"
                  : "bg-transparent backdrop-blur-sm text-gray-100 border border-gray-100"
              }`}
            >
              Close
            </button>
            <button
              onClick={handleCenterToggle}
              className={`px-2 py-2 grow lg:hidden rounded-sm font-medium text-sm shadow-lg transition-all duration-300 hover:scale-105
              ${
                camPos[0] === 0 && camPos[1] === 12 && camPos[2] === 30
                  ? "bg-gradient-to-r from-emerald-900 to-emerald-500 text-white"
                  : "bg-transparent backdrop-blur-sm text-gray-100 border border-gray-100"
              }`}
            >
              Center
            </button>
            <button
              onClick={handleFarToggle}
              className={`px-2 py-2 grow lg:hidden rounded-sm font-medium text-sm shadow-lg transition-all duration-300 hover:scale-105
              ${
                camPos[0] === -30 && camPos[1] === 12 && camPos[2] === 40
                  ? "bg-gradient-to-r from-emerald-900 to-emerald-500 text-white"
                  : "bg-transparent backdrop-blur-sm text-gray-100 border border-gray-100"
              }`}
            >
              Far
            </button>

            <button
              onClick={handleLightsToggle}
              className={`px-2 py-2 rounded-sm font-medium text-sm shadow-lg transition-all duration-300 hover:scale-105 lg:text-2xl lg:px-5
              ${
                actLight
                  ? "bg-gradient-to-r from-yellow-400 to-yellow-100 text-white"
                  : "bg-transparent backdrop-blur-sm text-gray-100 border border-gray-100"
              }`}
            >
              💡
            </button>
          </div>
          <div className="fixed items-centerflex-col z-50 bottom-8 w-full p-4 lg:hidden">
            <div className="flex justify-end gap-2 items-end">
              <div
                onClick={handleBlueClick}
                className={`items-start bg-gradient-to-t from-cyan-400 from-0% via-teal-500/40 via-30% to-transparent to-80% h-full rounded-md cursor-pointer transition-all duration-300 ${
                  activeGradient === "blue" ? "w-[75%] pr-28" : "w-[25%] pr-4"
                }`}
              >
                <Image
                  width={400}
                  height={100}
                  src="/2025/Pronites/shaan.webp"
                  alt="Description"
                />
              </div>
              <div
                onClick={handleRedClick}
                className={` bg-gradient-to-t  from-red-600 from-0% via-orange-700/40 via-30% to-transparent to-80% h-full rounded-md cursor-pointer transition-all duration-300 ${
                  activeGradient === "red" ? "w-[75%] pl-16" : "w-[25%] pl-0"
                }`}
              >
                <Image
                  width={400}
                  height={100}
                  src="/2025/Pronites/masalacoffee.webp"
                  alt="Description"
                />
              </div>
            </div>
          </div>
          <div
            className={`fixed pointer-events-none bottom-12 ml-4 w-[calc(75%-30px)] bg-gradient-to-t  from-teal-700 from-0% to-teal-400/0  to-100% rounded-r-sm rounded-b-none pb-1 pt-4 pr-3 z-50 flex pl-2 text-white font-bold transition-all duration-300 lg:hidden ${activeGradient === "blue" ? "text-xl" : "text-lg opacity-0"}`}
          >
            SINGER SHAAN
          </div>
          <div
            className={`fixed pointer-events-none bottom-12 mr-4 w-[calc(75%-29px)] bg-gradient-to-t  from-red-700 from-0% to-red-400/0  to-100% rounded-l-sm rounded-b-none pb-1 pt-4  pr-2 pl-3 z-50 flex justify-end text-white font-bold transition-all duration-300 lg:hidden ${
              activeGradient === "red" ? "text-xl" : "text-lg opacity-0"
            }`}
            style={{ right: "0px" }}
          >
            MASALA COFFEE
          </div>
          <div className="fixed bottom-2 left-0 w-full z-50 text-center">
            <div className="px-4 py-2 bg-black/50 rounded-sm mx-4 text-white text-sm w-[calc(100%-32px)] truncate">
              {isAudioOn && currentSong
                ? `Now Playing: ${currentSong}`
                : "Audio Muted"}
            </div>
          </div>
          <div className="h-screen w-screen z-0 bg-gradient-to-t from-black to-[#080820]">
            <Canvas
              gl={{
                antialias: false,
                stencil: false,
                pixelRatio: 1,
                alpha: true,
                premultipliedAlpha: false,
                preserveDrawingBuffer: true,
              }}
              camera={{ position: [0, 10, 15], near: 5, far: 150 }}
              style={{ background: "transparent" }}
            >
              <Stage src={videos[video]} />

              {lightC == "#00FFFF" ? (
                <Shaan scale={[4, 4, 4]} position={[-2, 0, 0]} />
              ) : (
                <MasalaModel />
              )}

              <ambientLight intensity={5} />
              <Rig _camPosisiton={camPos} />

              {actLight ? <SpotLights lightC={lightC} /> : null}

              <pointLight
                position={[0, 5, -5]}
                intensity={500}
                color={lightC}
              />

              <pointLight
                position={[40, 20, 20]}
                intensity={3000}
                color={lightC.replace("F", "1").replace("0", "F")}
              />
              <pointLight
                position={[-40, 20, 20]}
                intensity={3000}
                color={"#00FF00"}
              />
              {/* <pointLight position={[2, 5, 10]} intensity={500} color={"#FF0000"} />
            <pointLight position={[-2, 5, 10]} intensity={500} color={"#00FFFF"} /> */}
              <pointLight
                position={[0, 20, 10]}
                intensity={600}
                color={"#FFFFFF"}
              />
              <pointLight
                position={[0, 30, 20]}
                intensity={2000}
                color={"#0000FF"}
              />
              <object3D ref={targetRef} position={[0, 5, 0]} />

              <mesh position={[0, 0, 100]} rotation={[Math.PI / 2, Math.PI, 0]}>
                <planeGeometry args={[500, 240]} />

                <MeshReflectorMaterial
                  blur={[200, 200]}
                  resolution={720}
                  mixBlur={0.9}
                  mixStrength={80}
                  roughness={0.9}
                  depthScale={1}
                  minDepthThreshold={0.4}
                  maxDepthThreshold={10}
                  color="#101010"
                  metalness={0.9}
                />
              </mesh>
              <ImagePlane />
              <mesh
                position={[-33.9, 8.9, -14.8]}
                rotation={[0, Math.PI + Math.PI / 12, 0]}
                onClick={() => {
                  handleBlueClick();
                }}
              >
                <planeGeometry args={[13.7, 5]} />

                <Screen src={videos[0]} />
              </mesh>
              <mesh
                position={[32.8, 8.9, -14.8]}
                rotation={[0, Math.PI - Math.PI / 12, 0]}
                onClick={() => {
                  handleRedClick();
                }}
              >
                <planeGeometry args={[13.7, 5]} />

                <Screen src={videos[1]} />
              </mesh>
            </Canvas>
          </div>
        </>
      )}
    </div>
  );
}

function ImagePlane() {
  const texture = useTexture("/2025/Pronites/screentop.jpg"); // Add your image path here

  return (
    <mesh position={[-0.7, 23.8, -2]} rotation={[0, 0, 0]}>
      <planeGeometry args={[44, 3]} />
      <meshStandardMaterial
        map={texture}
        toneMapped={false}
        transparent={true}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

function Rig({ _camPosisiton }: { _camPosisiton: number[] }) {
  const { camera, mouse, size, clock } = useThree();
  const vec = new THREE.Vector3();
  const mobileThreshold = 1024;
  const isMobile = size.width < mobileThreshold;
  const look = new THREE.Vector3(0, 8, 0);

  // Define keyframes for the cinematic sequence on mobile.
  // A keyframe with duration === 0 and a "cut" flag will cause an instant change.
  const keyframes = [
    {
      pos: new THREE.Vector3(0, 5, -10),
      lookAt: look,
      duration: 0,
    },
    {
      pos: new THREE.Vector3(25, 7, 12),
      lookAt: look,
      duration: 2,
    },

    {
      pos: new THREE.Vector3(-30, 5, 10),
      lookAt: look,
      duration: 0,
    },
    {
      pos: new THREE.Vector3(-10, 2, 10),
      lookAt: look,
      duration: 2,
    },
    // Final keyframe: go to the resting position.
    {
      pos: new THREE.Vector3(0, 3, 10),
      lookAt: look,
      duration: 0,
    },
    {
      pos: new THREE.Vector3(0, 10, 30),
      lookAt: look,
      duration: 4,
    },
  ];

  // Animation state for the cinematic sequence.
  const animationState = useRef({
    running: false,
    currentKey: 0,
    elapsed: 0,
    startPos: new THREE.Vector3(),
  });

  // Start the cinematic sequence on mobile.
  useEffect(() => {
    if (isMobile && !animationState.current.running) {
      animationState.current.running = true;
      animationState.current.currentKey = 0;
      animationState.current.elapsed = 0;
      animationState.current.startPos = camera.position.clone();
    }
  }, [isMobile, camera.position]);

  useFrame((state, delta) => {
    if (isMobile) {
      // If the cinematic sequence is still running, process the keyframes.
      if (animationState.current.running) {
        const { currentKey, elapsed, startPos } = animationState.current;
        const keyframe = keyframes[currentKey];

        // If this keyframe is a "cut", immediately set the camera's position and lookAt.
        if (keyframe.cut) {
          camera.position.set(keyframe.pos.x, keyframe.pos.y, keyframe.pos.z);
          camera.lookAt(keyframe.lookAt);
          // Advance immediately to the next keyframe.
          animationState.current.currentKey++;
          animationState.current.elapsed = 0;
          animationState.current.startPos = camera.position.clone();
          return;
        }

        // Increase elapsed time and compute progress (t) from 0 to 1.
        animationState.current.elapsed += delta;
        const t = Math.min(
          animationState.current.elapsed / keyframe.duration,
          1
        );
        camera.position.lerpVectors(startPos, keyframe.pos, t);
        camera.lookAt(keyframe.lookAt);

        // If the transition is complete, advance to the next keyframe.
        if (t >= 1) {
          animationState.current.currentKey++;
          if (animationState.current.currentKey < keyframes.length) {
            animationState.current.elapsed = 0;
            animationState.current.startPos = camera.position.clone();
          } else {
            // End of cinematic sequence.
            animationState.current.running = false;
          }
        }
      } else {
        const idleSpeed = 0.4; // Speed of the bobbing
        const idleAmplitude = 1; // Amplitude of the bobbing effect
        // Compute a small offset based on sine/cosine of the elapsed clock time.
        const offsetX = Math.sin(clock.elapsedTime * idleSpeed) * idleAmplitude;
        const offsetY =
          -Math.cos(clock.elapsedTime * idleSpeed) * idleAmplitude;
        const targetPos = new THREE.Vector3(
          _camPosisiton[0]! + offsetX,
          _camPosisiton[1]! + offsetY,
          _camPosisiton[2]
        );
        camera.position.lerp(targetPos, 0.05);
        camera.lookAt(look);
      }
    } else {
      // For non-mobile devices, apply the default behavior (smooth mouse-based rotation).
      camera.position.lerp(vec.set(0, 12, 25), 0.005);
      const factor = 60 / Math.min(size.width, size.height);
      camera.rotation.set(
        -(mouse.y * factor) - Math.PI / 32,
        -(mouse.x * factor),
        0
      );
    }
  });

  return null;
}

function SpotLights({ lightC }: { lightC: string }) {
  const positions = [-13.5, -8.7, -4.3, 0.1, 4.5, 9, 13.5];
  return (
    <group>
      {positions.map((pos, idx) => (
        <pointLight
          key={idx}
          position={[pos * 1.05, 21, -15]}
          intensity={100}
          color={lightC}
        />
      ))}
    </group>
  );
}
