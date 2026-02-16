"use client";

import { useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useScroll, useTexture, Image as ImageDrei } from "@react-three/drei";
import * as THREE from "three";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

interface GlassSlabProps {
  position: [number, number, number];
  rotation: [number, number, number];
  image: string;
  index: number;
}

export default function GlassSlab({
  position,
  rotation,
  image,
  index,
}: GlassSlabProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const { viewport } = useThree();
  const scroll = useScroll(); // Access scroll state from ScrollControls

  // Material refs for animating properties
  const materialRef = useRef<THREE.MeshPhysicalMaterial>(null);

  useGSAP(() => {
    // Entrance Animation: Float in from blurred/random state
    if (groupRef.current && materialRef.current) {
      gsap.from(groupRef.current.position, {
        y: position[1] - 5,
        z: position[2] - 2, // Start further back
        duration: 2,
        ease: "power3.out",
        delay: index * 0.2, // Stagger
      });

      gsap.from(groupRef.current.rotation, {
        x: rotation[0] + Math.random() * 0.5,
        y: rotation[1] + Math.random() * 0.5,
        duration: 2.5,
        ease: "power2.out",
        delay: index * 0.2,
      });

      // Fade in material opacity
      gsap.fromTo(
        materialRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1.5, delay: index * 0.2 },
      );
    }
  }, [position, rotation, index]);

  useFrame(state => {
    if (groupRef.current && meshRef.current) {
      // Mouse Intearaction (Lerp)
      // Calculating mouse influence based on normalized coordinates (-1 to 1)
      const mouseX = state.mouse.x * 0.5;
      const mouseY = state.mouse.y * 0.5;

      // Target rotation combines original rotation + mouse influence
      const targetRotX = rotation[0] + mouseY * 0.2;
      const targetRotY = rotation[1] + mouseX * 0.2;

      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        targetRotX,
        0.05,
      );
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        targetRotY,
        0.05,
      );

      // Scroll Linked Roughness & Color
      if (scroll && materialRef.current) {
        // As we scroll down (offset goes 0 -> 1), increase roughness
        const targetRoughness = THREE.MathUtils.lerp(0.05, 0.5, scroll.offset);
        materialRef.current.roughness = THREE.MathUtils.lerp(
          materialRef.current.roughness,
          targetRoughness,
          0.1,
        );

        // Optional: Tint color towards Teal (#567c8d) on scroll
        // Initial white: new THREE.Color('#ffffff')
        // Target teal: new THREE.Color('#567c8d')
        const white = new THREE.Color("#ffffff");
        const teal = new THREE.Color("#567c8d");
        materialRef.current.color.lerpColors(white, teal, scroll.offset * 0.8); // 0.8 to keep it subtle
      }
    }
  });

  return (
    <group ref={groupRef} position={position} rotation={rotation as any}>
      {/* The Glass Slab */}
      <mesh ref={meshRef} castShadow receiveShadow>
        <boxGeometry args={[3, 4, 0.2]} />{" "}
        {/* Aspect ratio roughly 3:4 portrait */}
        <meshPhysicalMaterial
          ref={materialRef}
          color="#ffffff"
          transmission={1} // Glass-like transmission
          thickness={2} // Refraction thickness
          roughness={0.05} // Glossy glass
          ior={1.5} // Index of Refraction for glass
          clearcoat={1}
          clearcoatRoughness={0}
          transparent
          envMapIntensity={1}
        />
      </mesh>

      {/* The Image Behind the Glass */}
      {/* Positioned slightly behind the slab so it's seen *through* it */}
      <ImageDrei
        url={image}
        scale={[2.8, 3.8]} // Slightly smaller than slab
        position={[0, 0, -0.15]}
        transparent
        opacity={0.8}
        toneMapped={false}
      />
    </group>
  );
}
