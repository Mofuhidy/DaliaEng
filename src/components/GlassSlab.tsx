"use client";

import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import {
  Image as ImageDrei,
  MeshTransmissionMaterial,
} from "@react-three/drei";
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

  // Material refs for animating properties
  const materialRef = useRef<any>(null);

  useGSAP(() => {
    // Entrance Animation: Slide in from the right with heavy elastic ease
    if (groupRef.current) {
      gsap.from(groupRef.current.position, {
        x: position[0] + 10,
        opacity: 0,
        duration: 2.5,
        ease: "elastic.out(1, 0.8)",
        delay: index * 0.15,
      });

      gsap.from(groupRef.current.rotation, {
        y: rotation[1] + 1,
        duration: 2,
        ease: "power3.out",
        delay: index * 0.15,
      });
    }
  }, [position, rotation, index]);

  useFrame(state => {
    if (groupRef.current && meshRef.current) {
      // Mouse Interaction (Lerp)
      const mouseX = state.mouse.x * 0.5;
      const mouseY = state.mouse.y * 0.5;

      // Calculate scroll progress (0-1) based on hero visibility
      const scrollProgress = Math.min(
        Math.max(window.scrollY / (window.innerHeight || 1), 0),
        1,
      );

      const scrollRotationY = index === 1 ? scrollProgress * Math.PI * 0.5 : 0;

      // Target rotation combines original rotation + mouse influence + scroll morph
      const targetRotX = rotation[0] + mouseY * 0.15;
      const targetRotY = rotation[1] + mouseX * 0.15 + scrollRotationY;

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

      // Scroll Linked Expansion & Material Properties
      if (materialRef.current) {
        // Smoothly increase roughness on scroll
        const targetRoughness = THREE.MathUtils.lerp(0.05, 0.3, scrollProgress);
        materialRef.current.roughness = THREE.MathUtils.lerp(
          materialRef.current.roughness,
          targetRoughness,
          0.05,
        );

        if (index === 1) {
          // Expansion morph for the Monolith
          const targetScale = THREE.MathUtils.lerp(1, 3, scrollProgress);
          groupRef.current.scale.setScalar(
            THREE.MathUtils.lerp(groupRef.current.scale.x, targetScale, 0.1),
          );
        }
      }
    }
  });

  return (
    <group ref={groupRef} position={position} rotation={rotation as any}>
      {/* The Glass Monolith */}
      <mesh ref={meshRef} castShadow receiveShadow>
        <boxGeometry args={[3, 4, 0.1]} />
        <MeshTransmissionMaterial
          ref={materialRef}
          thickness={0.4}
          roughness={0.05}
          transmission={1}
          ior={1.2}
          chromaticAberration={0.03}
          anisotropy={0.1}
          distortion={0.1}
          distortionScale={0.5}
          temporalDistortion={0.1}
          clearcoat={1}
          attenuationDistance={1}
          attenuationColor="#ffffff"
          color="#ffffff"
        />
      </mesh>

      {/* The Image Behind the Glass */}
      <ImageDrei
        url={image}
        scale={[2.9, 3.9]}
        position={[0, 0, -0.1]}
        transparent
        opacity={1}
        toneMapped={false}
      />
    </group>
  );
}
