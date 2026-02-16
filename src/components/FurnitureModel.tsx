"use client";

import { useRef } from "react";
import { useFrame, ThreeElements } from "@react-three/fiber";
import { AccumulativeShadows, RandomizedLight } from "@react-three/drei";
import * as THREE from "three";

export default function FurnitureModel(props: ThreeElements["group"]) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(state => {
    if (meshRef.current) {
      // Subtle floating animation
      const t = state.clock.getElapsedTime();
      meshRef.current.position.y = Math.sin(t / 2) * 0.1;
      meshRef.current.rotation.y = Math.sin(t / 4) * 0.1;
    }
  });

  return (
    <group {...props} dispose={null}>
      <mesh ref={meshRef} castShadow receiveShadow>
        <boxGeometry args={[2, 2, 2]} />
        <meshStandardMaterial color="#f5efeb" roughness={0.5} metalness={0.1} />
        {/* Placeholder Decal or Texture capability */}
      </mesh>

      <AccumulativeShadows
        position={[0, -1.2, 0]}
        frames={100}
        alphaTest={0.9}
        scale={10}
        opacity={0.5}
        color="#2f4156">
        <RandomizedLight
          amount={8}
          radius={4}
          ambient={0.5}
          position={[5, 5, -10]}
          bias={0.001}
        />
      </AccumulativeShadows>
    </group>
  );
}
