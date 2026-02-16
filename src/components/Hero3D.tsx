"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Suspense } from "react";
import { useTranslations } from "next-intl";
import { ScrollControls, Html } from "@react-three/drei";
import Image from "next/image";
import {
  EffectComposer,
  Bloom,
  Noise,
  Vignette,
} from "@react-three/postprocessing";
import FloatingGallery from "./FloatingGallery";
import Loader from "./Loader";
import * as THREE from "three";

function Rig() {
  const { camera, mouse } = useThree();
  const vec = new THREE.Vector3();

  useFrame(() => {
    // Parallax effect: Camera moves slightly based on mouse position
    camera.position.lerp(
      vec.set(mouse.x * 2, mouse.y * 1, camera.position.z),
      0.05,
    );
    camera.lookAt(0, 0, 0);
  });
  return null;
}

export default function Hero3D() {
  const t = useTranslations("HomePage");
  return (
    <div className="w-full h-screen relative bg-canvas select-none">
      <Canvas
        shadows
        camera={{ position: [0, 0, 8], fov: 35 }} // Narrower FOV for editorial look
        dpr={[1, 2]}>
        <Suspense
          fallback={
            <Html center>
              <Loader />
            </Html>
          }>
          {/* Studio Lighting */}
          {/* Key Light (White) */}
          <rectAreaLight
            width={10}
            height={10}
            color="#ffffff"
            intensity={2}
            position={[-5, 5, 5]}
            lookAt={() => new THREE.Vector3(0, 0, 0)}
          />
          {/* Fill Light (Subtle Warmth) */}
          <rectAreaLight
            width={10}
            height={10}
            color="#f5efeb"
            intensity={1}
            position={[5, 0, 5]}
            lookAt={() => new THREE.Vector3(0, 0, 0)}
          />
          {/* Rim Light (Sky Blue) - Catches the glass edges */}
          <rectAreaLight
            width={10}
            height={2}
            color="#c8d9e6"
            intensity={5}
            position={[0, 5, -5]}
            lookAt={() => new THREE.Vector3(0, 0, 0)}
          />

          <ScrollControls pages={0} damping={0.1}>
            <FloatingGallery />
          </ScrollControls>

          {/* Post Processing */}
          <EffectComposer>
            <Bloom
              luminanceThreshold={0.8}
              mipmapBlur
              intensity={0.5}
              radius={0.5}
            />
            <Noise opacity={0.05} />
            <Vignette eskil={false} offset={0.1} darkness={0.4} />
          </EffectComposer>
        </Suspense>
      </Canvas>

      {/* Overlay Text/UI */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-auto z-20 text-primary">
        <div className="relative w-64 h-64 md:w-96 md:h-96">
          <Image
            src="/BlackLogo.png"
            alt="Dalia Al Dukhain"
            fill
            className="object-contain"
            priority
          />
        </div>
        <p className="text-lg md:text-xl font-sans uppercase tracking-[0.5em] mt-8 font-light text-primary/80">
          {t("hero_subtitle")}
        </p>
      </div>
    </div>
  );
}
