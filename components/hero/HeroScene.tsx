'use client';

import { useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, ContactShadows, AdaptiveDpr, AdaptiveEvents } from '@react-three/drei';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import * as THREE from 'three';
import { damp } from 'maath/easing';
import House from './House';
import AssemblingMaterials from './AssemblingMaterials';
import { heroScrollProgress } from '@/lib/heroScroll';

// Camera waypoints: [position, lookAt]
const WAYPOINTS = [
  { pos: [0, 1.8, 7.5],  look: [0, 0.3, 0] },   // 0.0 – face-on
  { pos: [2.8, 2.0, 6.0], look: [0, 0.4, 0] },    // 0.2 – right orbit
  { pos: [0, 2.8, 5.5],  look: [0, 0.8, 0] },     // 0.4 – overhead
  { pos: [-2.5, 2.0, 6.0], look: [0, 0.4, 0] },   // 0.6 – left orbit
  { pos: [0, 1.2, 6.5],  look: [0, 0.0, 0] },     // 0.8 – low angle
  { pos: [0, 1.8, 7.5],  look: [0, 0.3, 0] },     // 1.0 – settle back
] as const;

function lerp3(
  a: readonly [number, number, number],
  b: readonly [number, number, number],
  t: number
): [number, number, number] {
  return [
    a[0] + (b[0] - a[0]) * t,
    a[1] + (b[1] - a[1]) * t,
    a[2] + (b[2] - a[2]) * t,
  ];
}

function CameraRig() {
  const { camera } = useThree();
  const camPos = useRef<THREE.Vector3>(new THREE.Vector3(0, 1.8, 7.5));
  const lookTarget = useRef<THREE.Vector3>(new THREE.Vector3(0, 0.3, 0));

  useFrame((_state, delta) => {
    const p = heroScrollProgress.current;
    const n = WAYPOINTS.length - 1;
    const idx = Math.min(Math.floor(p * n), n - 1);
    const t = (p * n) - idx;

    const wp1 = WAYPOINTS[idx];
    const wp2 = WAYPOINTS[idx + 1] ?? WAYPOINTS[n];
    const targetPos = lerp3(wp1.pos, wp2.pos, t);
    const targetLook = lerp3(wp1.look as readonly [number,number,number], wp2.look as readonly [number,number,number], t);

    // Critically-damped motion toward waypoint
    damp(camPos.current, 'x', targetPos[0], 3.5, delta);
    damp(camPos.current, 'y', targetPos[1], 3.5, delta);
    damp(camPos.current, 'z', targetPos[2], 3.5, delta);
    damp(lookTarget.current, 'x', targetLook[0], 4, delta);
    damp(lookTarget.current, 'y', targetLook[1], 4, delta);
    damp(lookTarget.current, 'z', targetLook[2], 4, delta);

    camera.position.copy(camPos.current);
    camera.lookAt(lookTarget.current);
  });

  return null;
}

function Scene({ reduced }: { reduced: boolean }) {
  const isDesktop =
    typeof window !== 'undefined' && window.innerWidth >= 768 && !reduced;

  return (
    <>
      <CameraRig />
      <AdaptiveDpr pixelated />
      <AdaptiveEvents />

      {/* Lights */}
      <ambientLight intensity={0.3} />
      <directionalLight
        position={[4, 7, 5]}
        intensity={1.3}
        color="#FFFFFF"
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.0001}
      />
      <directionalLight position={[-5, 3, -4]} intensity={0.9} color="#F59E0B" />
      <directionalLight position={[0, -2, 3]} intensity={0.15} color="#FBBF24" />

      {/* IBL */}
      <Environment preset="city" />

      {/* Objects */}
      <House />
      {!reduced && <AssemblingMaterials />}

      {/* Ground shadow */}
      <ContactShadows position={[0, -1.05, 0]} opacity={0.55} scale={12} blur={2.8} far={4} />

      {/* Postprocessing — desktop only */}
      {isDesktop && (
        <EffectComposer>
          <Bloom luminanceThreshold={0.85} luminanceSmoothing={0.025} intensity={1.4} mipmapBlur />
          <Vignette eskil={false} offset={0.2} darkness={0.7} />
        </EffectComposer>
      )}
    </>
  );
}

interface HeroSceneProps {
  reduced?: boolean;
}

export default function HeroScene({ reduced = false }: HeroSceneProps) {
  return (
    <Canvas
      gl={{
        antialias: true,
        powerPreference: 'high-performance',
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.15,
      }}
      dpr={[1, 2]}
      camera={{ fov: 35, position: [0, 1.8, 7.5], near: 0.1, far: 120 }}
      shadows
      aria-hidden="true"
      style={{ position: 'fixed', inset: 0, zIndex: 0 }}
    >
      <Scene reduced={reduced} />
    </Canvas>
  );
}
