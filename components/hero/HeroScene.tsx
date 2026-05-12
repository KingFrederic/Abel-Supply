'use client';

import { useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import House from './House';
import OrbitingMaterials from './OrbitingMaterials';

export default function HeroScene() {
  const prefersReducedMotion =
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false;

  return (
    <Canvas
      gl={{
        antialias: true,
        powerPreference: 'high-performance',
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.1,
      }}
      dpr={[1, 2]}
      camera={{ fov: 35, position: [0, 1.8, 7], near: 0.1, far: 100 }}
      shadows
      aria-hidden="true"
    >
      {/* Three-light rig */}
      <ambientLight intensity={0.35} />
      <directionalLight
        position={[4, 6, 5]}
        intensity={1.2}
        color="#FFFFFF"
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <directionalLight
        position={[-5, 3, -4]}
        intensity={0.8}
        color="#F59E0B"
      />

      {/* IBL */}
      <Environment preset="city" />

      {/* Scene */}
      <House />
      {!prefersReducedMotion && <OrbitingMaterials />}

      {/* Ground shadow */}
      <ContactShadows
        position={[0, -1.05, 0]}
        opacity={0.5}
        scale={10}
        blur={2.5}
        far={4}
      />
    </Canvas>
  );
}
