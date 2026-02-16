"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Suspense } from "react";
import { Environment, Html } from "@react-three/drei";
import {
  EffectComposer,
  Bloom,
  Noise,
  Vignette,
} from "@react-three/postprocessing";
import FurnitureModel from "./FurnitureModel";
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
  return (
    <div className="w-full h-screen relative bg-canvas select-none">
      <Canvas
        shadows
        camera={{ position: [0, 0, 8], fov: 45 }}
        dpr={[1, 2]} // Optimization for varying pixel ratios
      >
        <Suspense
          fallback={
            <Html center>
              <Loader />
            </Html>
          }>
          {/* Lighting */}
          <ambientLight intensity={0.5} />
          <spotLight
            position={[10, 10, 10]}
            angle={0.15}
            penumbra={1}
            shadow-mapSize={2048}
            castShadow
          />
          {/* <Environment preset="city" /> - Removed to prevent fetch errors */}

          {/* The Model */}
          <FurnitureModel />

          {/* Camera Rig (Parallax) */}
          <Rig />

          {/* Post Processing */}
          <EffectComposer>
            <Bloom luminanceThreshold={1} mipmapBlur intensity={1.5} />
            <Noise opacity={0.05} />
            <Vignette eskil={false} offset={0.1} darkness={0.5} />
          </EffectComposer>
        </Suspense>
      </Canvas>

      {/* Overlay Text/UI */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10 text-primary mix-blend-difference">
        <h1 className="text-6xl md:text-9xl font-serif tracking-tighter mix-blend-difference">
          Dalia Al Dukhain
        </h1>
        <p className="text-lg md:text-xl font-sans uppercase tracking-[0.5em] mt-4 mix-blend-difference">
          Interior Architecture
        </p>
      </div>
    </div>
  );
}
