"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import GlassSlab from "./GlassSlab";
import * as THREE from "three";

import { SanityProject } from "@/types/sanity";
import { urlForImage } from "@/sanity/lib/image";

const staticProjects = [
  {
    id: "1",
    image: "/project-1.png",
    position: [-2.5, 0, 0],
    rotation: [0, 0.2, 0],
  },
  {
    id: "2",
    image: "/project-2.png",
    position: [0, 0, 1],
    rotation: [0, 0, 0],
  },
  {
    id: "3",
    image: "/project-3.png",
    position: [2.5, 0, 0],
    rotation: [0, -0.2, 0],
  },
];

export default function FloatingGallery({
  projects: sanityProjects,
}: {
  projects?: SanityProject[];
}) {
  const groupRef = useRef<THREE.Group>(null);

  // Merge sanity projects with static ones, or use sanity projects if they exist
  // We only show 3 projects in the hero gallery
  // Ensure 3 items always by merging Sanity projects with static placeholders
  // Priority Mapping: Center (1) -> Left (0) -> Right (2) to keep main project in middle
  const displayProjects = [...staticProjects];

  if (sanityProjects && sanityProjects.length > 0) {
    // 1. Assign first project to Center (index 1) which is "Project 2" statically
    // We override id and image, keep position/rotation
    if (sanityProjects[0]) {
      displayProjects[1] = {
        ...staticProjects[1],
        id: sanityProjects[0]._id,
        image: sanityProjects[0].mainImage
          ? urlForImage(sanityProjects[0].mainImage)?.url() ||
            staticProjects[1].image
          : staticProjects[1].image,
      };
    }

    // 2. Assign second project to Left (index 0)
    if (sanityProjects[1]) {
      displayProjects[0] = {
        ...staticProjects[0],
        id: sanityProjects[1]._id,
        image: sanityProjects[1].mainImage
          ? urlForImage(sanityProjects[1].mainImage)?.url() ||
            staticProjects[0].image
          : staticProjects[0].image,
      };
    }

    // 3. Assign third project to Right (index 2)
    if (sanityProjects[2]) {
      displayProjects[2] = {
        ...staticProjects[2],
        id: sanityProjects[2]._id,
        image: sanityProjects[2].mainImage
          ? urlForImage(sanityProjects[2].mainImage)?.url() ||
            staticProjects[2].image
          : staticProjects[2].image,
      };
    }
  }

  useFrame(state => {
    if (groupRef.current) {
      // Gentle floating for the entire gallery
      const t = state.clock.getElapsedTime();
      groupRef.current.position.y = Math.sin(t * 0.5) * 0.15;
    }
  });

  return (
    <group ref={groupRef}>
      {displayProjects.map((project, index) => (
        <GlassSlab
          key={project.id || index}
          index={index}
          position={project.position as [number, number, number]}
          rotation={project.rotation as [number, number, number]}
          image={project.image || "/project-1.png"}
        />
      ))}
    </group>
  );
}
