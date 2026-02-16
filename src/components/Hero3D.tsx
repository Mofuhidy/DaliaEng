"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense, useRef, useState, useMemo } from "react";
import { Html, ContactShadows, Grid } from "@react-three/drei";
import { useTranslations } from "next-intl";
import {
  EffectComposer,
  Bloom,
  Noise,
  Vignette,
} from "@react-three/postprocessing";
import FloatingGallery from "./FloatingGallery";
import Loader from "./Loader";
import * as THREE from "three";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useFrame } from "@react-three/fiber";

function BlueprintGrid({ isHovered }: { isHovered: boolean }) {
  const gridRef = useRef<THREE.Group>(null);
  const opacity = useRef(0);

  useFrame((state, delta) => {
    // Smoothly transition opacity
    opacity.current = THREE.MathUtils.lerp(
      opacity.current,
      isHovered ? 0.35 : 0,
      delta * 4,
    );
    if (gridRef.current) {
      gridRef.current.children.forEach(child => {
        if (child instanceof THREE.LineSegments) {
          (child.material as THREE.LineBasicMaterial).opacity = opacity.current;
        }
      });
      gridRef.current.rotation.y = state.pointer.x * 0.1;
      gridRef.current.rotation.x = -state.pointer.y * 0.1;
    }
  });

  return (
    <group ref={gridRef}>
      <Grid
        infiniteGrid
        fadeDistance={20}
        sectionSize={3}
        sectionThickness={1}
        sectionColor="#567c8d"
        cellColor="#567c8d"
        cellSize={1}
        position={[0, 0, -5]}
        rotation={[Math.PI / 2, 0, 0]}
      />
    </group>
  );
}

function GlassDivider() {
  return (
    <mesh position={[0, 0, 0]}>
      <boxGeometry args={[0.02, 10, 5]} />
      <meshPhysicalMaterial
        color="#c8d9e6"
        transparent
        opacity={0.8}
        roughness={0}
        transmission={1}
        thickness={0.5}
        ior={1.5}
      />
    </mesh>
  );
}

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Hero3D() {
  const t = useTranslations("HomePage");
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useGSAP(
    () => {
      // Title "Etched" Reveal Animation
      const words = gsap.utils.toArray(".hero-title-word");
      gsap.fromTo(
        words,
        {
          y: "110%",
          clipPath: "inset(0% 0% 100% 0%)",
          opacity: 0,
        },
        {
          y: "0%",
          clipPath: "inset(0% 0% 0% 0%)",
          opacity: 1,
          duration: 1.8,
          stagger: 0.15,
          ease: "power4.out",
          delay: 0.4,
        },
      );

      // Horizontal "Stretch" (Space Expansion) effect on scroll
      gsap.to(".hero-title-word", {
        letterSpacing: "0.1em",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      // Content fade in (Smooth Reveal)
      gsap.from(".hero-content-fade", {
        opacity: 0,
        y: 20,
        filter: "blur(10px)",
        duration: 1.5,
        delay: 1.2,
        stagger: 0.15,
        ease: "power2.out",
      });

      // Parallax effect on the content side
      gsap.to(".hero-content-reveal", {
        y: -100,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });
    },
    { scope: containerRef },
  );

  return (
    <div
      ref={containerRef}
      className="w-full min-h-screen flex flex-col md:flex-row bg-background-beige overflow-hidden">
      {/* Left Panel: Editorial Content */}
      <section
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative w-full md:w-1/2 min-h-[60vh] md:h-screen flex flex-col justify-center items-start p-8 md:p-16 lg:p-24 bg-background-beige border-b md:border-b-0 md:border-e border-sky-blue/30 z-20">
        {/* Background Grid Canvas */}
        <div className="absolute inset-0 pointer-events-none opacity-40">
          <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[2, 2, 2]} intensity={10} color="#567c8d" />
            <BlueprintGrid isHovered={isHovered} />
            <group position={[3.5, 0, -2]}>
              <GlassDivider />
            </group>
          </Canvas>
        </div>

        <div className="relative max-w-md lg:max-w-lg w-full flex flex-col items-start gap-4 md:gap-6 mt-24 md:mt-40 hero-content-reveal font-sans-arabic">
          {/* Eyebrow */}
          <div className="flex items-center gap-3 hero-content-fade">
            <span className="h-px w-8 bg-primary"></span>
            <span className="font-sans text-[9px] md:text-[10px] tracking-[0.3em] uppercase text-navy font-bold">
              {t("issue_label")}
            </span>
          </div>

          {/* Main Title */}
          <h2 className="font-display font-medium text-4xl md:text-5xl lg:text-7xl xl:text-8xl  tracking-tight text-navy">
            {t("title")
              .split(" ")
              .map((word, i) => (
                <span key={i} className="flex h-fit">
                  <span>{word}</span>
                </span>
              ))}
          </h2>

          {/* Excerpt */}
          <p className="font-display italic text-base md:text-lg lg:text-xl leading-relaxed text-navy/80 max-w-sm hero-content-fade arabic-excerpt">
            {t("about_text")}
          </p>

          {/* CTA */}
          <div className="pt-4 hero-content-fade">
            <a
              href="#projects"
              className="group relative inline-block overflow-hidden border-b-2 border-navy px-0 py-2 bg-transparent transition-all duration-500">
              <span className="relative flex items-center gap-4 font-sans text-xs font-bold tracking-[0.3em] text-navy uppercase">
                {t("explore_works")}
                <span className="w-8 h-px bg-navy transition-all duration-300 group-hover:w-12"></span>
              </span>
            </a>
          </div>
        </div>

        {/* Decorative page number */}
        <div className="absolute bottom-8 left-8 md:bottom-12 md:left-24 font-sans text-[10px] tracking-widest text-muted uppercase">
          01 / 05
        </div>
      </section>

      {/* Right Panel: 3D Immersive Scene */}
      <section className="relative w-full md:w-1/2 h-[60vh] md:h-screen bg-background-beige overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Canvas
            camera={{ position: [0, 0, 8], fov: 35 }}
            dpr={[1, 1.5]}
            performance={{ min: 0.5 }}
            gl={{
              antialias: false,
              alpha: true,
              powerPreference: "high-performance",
            }}>
            <color attach="background" args={["#f5efeb"]} />
            <Suspense
              fallback={
                <Html center>
                  <Loader />
                </Html>
              }>
              {/* Enhanced Studio Lighting (No external HDR dependencies) */}
              <ambientLight intensity={1} />
              <directionalLight position={[10, 10, 10]} intensity={2} />
              <directionalLight
                position={[-10, 10, 10]}
                intensity={1.5}
                color="#c8d9e6"
              />
              <pointLight position={[0, 0, 5]} intensity={40} color="#ffffff" />
              <pointLight
                position={[0, 5, -5]}
                intensity={30}
                color="#ffffff"
              />

              <FloatingGallery />

              <ContactShadows
                position={[0, -3.5, 0]}
                opacity={0.3}
                scale={15}
                blur={1.5}
                far={4.5}
              />

              <EffectComposer disableNormalPass multisampling={0}>
                <Bloom luminanceThreshold={1} intensity={0.3} radius={0.3} />
                <Vignette offset={0.3} darkness={0.5} />
              </EffectComposer>
            </Suspense>
          </Canvas>
        </div>

        {/* Sticky Label on Image equivalent */}
        {/* <div className="absolute bottom-12 right-12 z-10 text-white text-right pointer-events-none">
          <p className="font-display italic text-lg opacity-90">
            {t("visual_concept")}
          </p>
          <p className="font-sans text-[10px] tracking-widest uppercase opacity-70 mt-1">
            {t("experimental_space")}
          </p>
        </div> */}
      </section>
    </div>
  );
}
