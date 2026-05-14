'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { damp } from 'maath/easing';
import { heroScrollProgress } from '@/lib/heroScroll';

// Maps a progress value from [inMin, inMax] → [0, 1]
function mapRange(p: number, inMin: number, inMax: number): number {
  return Math.min(1, Math.max(0, (p - inMin) / (inMax - inMin)));
}

// PBR concrete/plaster color
const PLASTER = '#C4BDB0';
const CONCRETE = '#3A3832';
const STEEL = '#6B7280';
const WOOD = '#6B3A1F';
const ROOF_TILE = '#B45309';
const ROOF_DARK = '#1E1A12';

export default function House() {
  const groupRef = useRef<THREE.Group>(null!);
  const foundRef = useRef<THREE.Mesh>(null!);
  const wallFRef = useRef<THREE.Mesh>(null!);
  const wallBRef = useRef<THREE.Mesh>(null!);
  const wallLRef = useRef<THREE.Mesh>(null!);
  const wallRRef = useRef<THREE.Mesh>(null!);
  const roofRef = useRef<THREE.Mesh>(null!);
  const roofCapRef = useRef<THREE.Mesh>(null!);
  const scafLRef = useRef<THREE.Group>(null!);
  const scafRRef = useRef<THREE.Group>(null!);
  const windowRef = useRef<THREE.Mesh>(null!);
  const windowGlowRef = useRef<THREE.PointLight>(null!);
  const doorRef = useRef<THREE.Mesh>(null!);

  const BELOW = -6; // off-screen start Y

  useFrame((_state, delta) => {
    const p = heroScrollProgress.current;

    // Foundation: 0.0 → 0.12
    const fp = mapRange(p, 0, 0.12);
    damp(foundRef.current.position, 'y', THREE.MathUtils.lerp(BELOW, -0.05, fp), 6, delta);

    // Walls: 0.08 → 0.22
    const wp = mapRange(p, 0.08, 0.22);
    const wallY = THREE.MathUtils.lerp(BELOW, 0.75, wp);
    damp(wallFRef.current.position, 'y', wallY, 6, delta);
    damp(wallBRef.current.position, 'y', wallY, 6, delta);
    damp(wallLRef.current.position, 'y', wallY, 6, delta);
    damp(wallRRef.current.position, 'y', wallY, 6, delta);

    // Roof: 0.18 → 0.32
    const rp = mapRange(p, 0.18, 0.32);
    damp(roofRef.current.position, 'y', THREE.MathUtils.lerp(BELOW, 1.8, rp), 6, delta);
    damp(roofCapRef.current.position, 'y', THREE.MathUtils.lerp(BELOW, 1.8, rp), 6, delta);

    // Scaffolding: 0.28 → 0.42
    const sp = mapRange(p, 0.28, 0.42);
    const scafY = THREE.MathUtils.lerp(BELOW, 0, sp);
    damp(scafLRef.current.position, 'y', scafY, 6, delta);
    damp(scafRRef.current.position, 'y', scafY, 6, delta);

    // Window: 0.40 → 0.52
    const winP = mapRange(p, 0.40, 0.52);
    damp(windowRef.current.position, 'y', THREE.MathUtils.lerp(BELOW, 0.75, winP), 8, delta);
    damp(windowGlowRef.current, 'intensity', winP * 1.2, 4, delta);

    // Door: 0.48 → 0.60
    const doorP = mapRange(p, 0.48, 0.60);
    damp(doorRef.current.position, 'y', THREE.MathUtils.lerp(BELOW, 0.4, doorP), 8, delta);
  });

  return (
    <group ref={groupRef} position={[0, -0.5, 0]}>
      {/* Foundation */}
      <mesh ref={foundRef} position={[0, BELOW, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.8, 0.18, 2.2]} />
        <meshPhysicalMaterial
          color={CONCRETE}
          roughness={0.95}
          metalness={0.05}
          clearcoat={0}
        />
      </mesh>

      {/* Front wall */}
      <mesh ref={wallFRef} position={[0, BELOW, 0.93]} castShadow receiveShadow>
        <boxGeometry args={[2.5, 1.55, 0.13]} />
        <meshPhysicalMaterial
          color={PLASTER}
          roughness={0.88}
          metalness={0.0}
          clearcoat={0.05}
          clearcoatRoughness={0.8}
        />
      </mesh>

      {/* Back wall */}
      <mesh ref={wallBRef} position={[0, BELOW, -0.93]} castShadow receiveShadow>
        <boxGeometry args={[2.5, 1.55, 0.13]} />
        <meshPhysicalMaterial color={PLASTER} roughness={0.9} metalness={0.0} />
      </mesh>

      {/* Left wall */}
      <mesh ref={wallLRef} position={[-1.18, BELOW, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.13, 1.55, 1.73]} />
        <meshPhysicalMaterial color={PLASTER} roughness={0.88} metalness={0.0} />
      </mesh>

      {/* Right wall */}
      <mesh ref={wallRRef} position={[1.18, BELOW, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.13, 1.55, 1.73]} />
        <meshPhysicalMaterial color={PLASTER} roughness={0.88} metalness={0.0} />
      </mesh>

      {/* Roof base (dark) */}
      <mesh ref={roofRef} position={[0, BELOW, 0]} castShadow>
        <coneGeometry args={[1.72, 1.0, 4, 1]} />
        <meshPhysicalMaterial
          color={ROOF_DARK}
          roughness={0.75}
          metalness={0.08}
          clearcoat={0.1}
          clearcoatRoughness={0.6}
        />
      </mesh>

      {/* Roof tile overlay (amber warm) */}
      <mesh ref={roofCapRef} position={[0, BELOW, 0]} castShadow>
        <coneGeometry args={[1.68, 0.96, 4, 1]} />
        <meshPhysicalMaterial
          color={ROOF_TILE}
          roughness={0.65}
          metalness={0.06}
          clearcoat={0.15}
          clearcoatRoughness={0.5}
          emissive="#7C4304"
          emissiveIntensity={0.08}
        />
      </mesh>

      {/* Scaffolding left */}
      <group ref={scafLRef} position={[0, BELOW, 0]}>
        {([-1.32, -1.48] as number[]).map((x, i) => (
          <mesh key={i} position={[x, 0.6, 0]}>
            <cylinderGeometry args={[0.028, 0.028, 2.0, 8]} />
            <meshPhysicalMaterial color={STEEL} roughness={0.4} metalness={0.75} />
          </mesh>
        ))}
        {([0.1, 0.65, 1.15] as number[]).map((y, i) => (
          <mesh key={i} position={[-1.4, y, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.02, 0.02, 0.24, 6]} />
            <meshPhysicalMaterial color={STEEL} roughness={0.4} metalness={0.75} />
          </mesh>
        ))}
      </group>

      {/* Scaffolding right */}
      <group ref={scafRRef} position={[0, BELOW, 0]}>
        {([1.32, 1.48] as number[]).map((x, i) => (
          <mesh key={i} position={[x, 0.6, 0]}>
            <cylinderGeometry args={[0.028, 0.028, 2.0, 8]} />
            <meshPhysicalMaterial color={STEEL} roughness={0.4} metalness={0.75} />
          </mesh>
        ))}
        {([0.1, 0.65, 1.15] as number[]).map((y, i) => (
          <mesh key={i} position={[1.4, y, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.02, 0.02, 0.24, 6]} />
            <meshPhysicalMaterial color={STEEL} roughness={0.4} metalness={0.75} />
          </mesh>
        ))}
      </group>

      {/* Window frame (front) */}
      <mesh ref={windowRef} position={[0.55, BELOW, 0.94]} castShadow>
        <boxGeometry args={[0.5, 0.45, 0.02]} />
        <meshPhysicalMaterial
          color="#F59E0B"
          emissive="#F59E0B"
          emissiveIntensity={0.5}
          roughness={0.05}
          metalness={0.2}
          transparent
          opacity={0.9}
          transmission={0.1}
          clearcoat={1.0}
          clearcoatRoughness={0.0}
          ior={1.5}
        />
      </mesh>

      {/* Window point light */}
      <pointLight
        ref={windowGlowRef}
        position={[0.55, 0.75, 0.5]}
        color="#F59E0B"
        intensity={0}
        distance={3}
        decay={2}
      />

      {/* Door */}
      <mesh ref={doorRef} position={[-0.45, BELOW, 0.94]} castShadow>
        <boxGeometry args={[0.5, 0.88, 0.03]} />
        <meshPhysicalMaterial
          color={WOOD}
          roughness={0.65}
          metalness={0.0}
          clearcoat={0.2}
          clearcoatRoughness={0.4}
        />
      </mesh>
    </group>
  );
}
