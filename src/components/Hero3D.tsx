"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense, useRef } from "react";
import { Html, ContactShadows } from "@react-three/drei";
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

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Hero3D() {
  const t = useTranslations("HomePage");
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Title Stagger Animation
      const words = gsap.utils.toArray(".hero-title-word");
      gsap.from(words, {
        y: 60,
        opacity: 0,
        duration: 1.2,
        stagger: 0.1,
        ease: "power4.out",
        delay: 0.5,
      });

      // Content fade in
      gsap.from(".hero-content-fade", {
        opacity: 0,
        duration: 1.5,
        delay: 1.2,
        stagger: 0.15,
      });

      // Parallax effect on the content side
      gsap.to(".hero-content-reveal", {
        y: -50,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
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
      <section className="relative w-full md:w-1/2 min-h-[50vh] md:h-screen flex flex-col justify-center items-start p-8 md:p-16 lg:p-24 bg-background-beige border-b md:border-b-0 md:border-r border-sky-blue/30 z-20">
        <div className="max-w-md lg:max-w-lg w-full flex flex-col items-start gap-4 md:gap-6 mt-32 md:mt-40 hero-content-reveal">
          {/* Eyebrow */}
          <div className="flex items-center gap-3 hero-content-fade">
            <span className="h-px w-8 bg-sky-blue"></span>
            <span className="font-sans text-[9px] md:text-[10px] tracking-[0.3em] uppercase text-navy font-bold">
              {t("issue_label")}
            </span>
          </div>

          {/* Main Title */}
          <h2 className="font-display font-medium text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-[0.95] tracking-tight text-navy">
            {t("title")
              .split(" ")
              .map((word, i) => (
                <span key={i} className="block overflow-hidden h-fit">
                  <span className="block hero-title-word">{word}</span>
                </span>
              ))}
          </h2>

          {/* Excerpt */}
          <p className="font-display italic text-sm md:text-base lg:text-lg leading-relaxed text-navy/70 max-w-sm hero-content-fade">
            {t("about_text")}
          </p>

          {/* CTA */}
          <div className="pt-2 hero-content-fade">
            <button className="group relative overflow-hidden border border-navy/20 px-6 py-3 md:px-8 md:py-4 bg-transparent transition-all duration-500 hover:border-navy">
              <span className="relative flex items-center gap-3 font-sans text-[9px] md:text-[10px] font-bold tracking-[0.2em] text-navy uppercase">
                {t("explore_works")}
                <svg
                  className="w-3 h-3 md:w-4 md:h-4 transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </span>
            </button>
          </div>
        </div>

        {/* Decorative page number */}
        <div className="absolute bottom-8 left-8 md:bottom-12 md:left-24 font-sans text-[10px] tracking-widest text-muted uppercase">
          01 / 05
        </div>
      </section>

      {/* Right Panel: 3D Immersive Scene */}
      <section className="relative w-full md:w-1/2 h-[60vh] md:h-screen bg-[#0a0f14] overflow-hidden">
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
            <color attach="background" args={["#0a0f14"]} />
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
