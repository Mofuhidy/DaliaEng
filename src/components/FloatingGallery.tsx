"use client";

import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useScroll } from "@react-three/drei";
import GlassSlab from "./GlassSlab";
import * as THREE from "three";

const projects = [
  {
    id: 1,
    image: "/project-1.png",
    position: [-2.5, 0, 0],
    rotation: [0, 0.2, 0],
  },
  {
    id: 2,
    image: "/project-2.png",
    position: [0, 0, 1],
    rotation: [0, 0, 0],
  },
  {
    id: 3,
    image: "/project-3.png",
    position: [2.5, 0, 0],
    rotation: [0, -0.2, 0],
  },
];

export default function FloatingGallery() {
  const groupRef = useRef<THREE.Group>(null);
  const scroll = useScroll();

  useFrame((state, delta) => {
    if (groupRef.current) {
      // Gentle floating for the entire gallery
      const t = state.clock.getElapsedTime();
      groupRef.current.position.y = Math.sin(t * 0.5) * 0.2;

      // Scroll influence (if scroll controls are active)
      if (scroll) {
        // This can be used to shift the gallery or change material properties globally
        // For now, let's just rotate the whole group slightly based on scroll
        groupRef.current.rotation.y = scroll.offset * 0.5;
      }
    }
  });

  return (
    <group ref={groupRef}>
      {projects.map((project, index) => (
        <GlassSlab
          key={project.id}
          index={index}
          position={project.position as [number, number, number]}
          rotation={project.rotation as [number, number, number]}
          image={project.image}
        />
      ))}
    </group>
  );
}
