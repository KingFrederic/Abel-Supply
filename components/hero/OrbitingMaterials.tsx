'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import type * as THREE from 'three';

interface OrbitConfig {
  speed: number;
  phase: number;
  rx: number;
  ry: number;
  rz: number;
  spinSpeed: number;
  yOffset: number;
}

const ORBITS: OrbitConfig[] = [
  { speed: 0.18, phase: 0,           rx: 3.2, ry: 0.15, rz: 1.6, spinSpeed: 0.3, yOffset: 0.3 },
  { speed: 0.24, phase: Math.PI / 3, rx: 3.5, ry: 0.12, rz: 1.4, spinSpeed: 0.4, yOffset: 0.1 },
  { speed: 0.15, phase: Math.PI * 2 / 3, rx: 3.0, ry: 0.18, rz: 1.7, spinSpeed: 0.22, yOffset: 0.5 },
  { speed: 0.30, phase: Math.PI,     rx: 3.3, ry: 0.10, rz: 1.5, spinSpeed: 0.35, yOffset: 0.2 },
  { speed: 0.20, phase: Math.PI * 4 / 3, rx: 3.6, ry: 0.14, rz: 1.6, spinSpeed: 0.28, yOffset: 0.4 },
  { speed: 0.35, phase: Math.PI * 5 / 3, rx: 3.1, ry: 0.20, rz: 1.4, spinSpeed: 0.45, yOffset: 0.0 },
];

function CementSack({ orb }: { orb: OrbitConfig }) {
  const ref = useRef<THREE.Group>(null!);
  useFrame(({ clock }) => {
    if (document.visibilityState === 'hidden') return;
    const t = clock.getElapsedTime() * orb.speed + orb.phase;
    ref.current.position.x = Math.cos(t) * orb.rx;
    ref.current.position.z = Math.sin(t) * orb.rz;
    ref.current.position.y = Math.sin(t * 0.8) * 0.15 + orb.yOffset;
    ref.current.rotation.y += 0.008;
  });
  return (
    <group ref={ref}>
      <mesh castShadow>
        <boxGeometry args={[0.32, 0.4, 0.22]} />
        <meshStandardMaterial color="#E5E7EB" roughness={0.9} metalness={0} />
      </mesh>
      <mesh position={[0, 0.22, 0]}>
        <boxGeometry args={[0.28, 0.06, 0.18]} />
        <meshStandardMaterial color="#D1D5DB" roughness={0.95} />
      </mesh>
    </group>
  );
}

function CopperPipes({ orb }: { orb: OrbitConfig }) {
  const ref = useRef<THREE.Group>(null!);
  useFrame(({ clock }) => {
    if (document.visibilityState === 'hidden') return;
    const t = clock.getElapsedTime() * orb.speed + orb.phase;
    ref.current.position.x = Math.cos(t) * orb.rx;
    ref.current.position.z = Math.sin(t) * orb.rz;
    ref.current.position.y = Math.sin(t * 0.8) * 0.15 + orb.yOffset;
    ref.current.rotation.z += 0.006;
  });
  return (
    <group ref={ref} rotation={[Math.PI / 2, 0, 0]}>
      {[-0.1, 0, 0.1].map((x, i) => (
        <mesh key={i} position={[x, 0, 0]} castShadow>
          <cylinderGeometry args={[0.035, 0.035, 0.5, 8]} />
          <meshStandardMaterial
            color={i === 1 ? '#B45309' : '#D97706'}
            roughness={0.3}
            metalness={0.85}
          />
        </mesh>
      ))}
    </group>
  );
}

function Bathtub({ orb }: { orb: OrbitConfig }) {
  const ref = useRef<THREE.Group>(null!);
  useFrame(({ clock }) => {
    if (document.visibilityState === 'hidden') return;
    const t = clock.getElapsedTime() * orb.speed + orb.phase;
    ref.current.position.x = Math.cos(t) * orb.rx;
    ref.current.position.z = Math.sin(t) * orb.rz;
    ref.current.position.y = Math.sin(t * 0.8) * 0.15 + orb.yOffset;
    ref.current.rotation.y += 0.007;
  });
  return (
    <group ref={ref}>
      {/* tub body */}
      <mesh position={[0, 0, 0]} castShadow>
        <boxGeometry args={[0.42, 0.18, 0.22]} />
        <meshStandardMaterial color="#F9FAFB" roughness={0.05} metalness={0.1} />
      </mesh>
      {/* rim */}
      <mesh position={[0, 0.1, 0]}>
        <boxGeometry args={[0.44, 0.04, 0.24]} />
        <meshStandardMaterial color="#FFFFFF" roughness={0.1} metalness={0.05} />
      </mesh>
      {/* inner bowl */}
      <mesh position={[0, 0.08, 0]}>
        <boxGeometry args={[0.36, 0.1, 0.18]} />
        <meshStandardMaterial color="#E0F2FE" roughness={0.05} transparent opacity={0.6} />
      </mesh>
    </group>
  );
}

function WoodenDoor({ orb }: { orb: OrbitConfig }) {
  const ref = useRef<THREE.Group>(null!);
  useFrame(({ clock }) => {
    if (document.visibilityState === 'hidden') return;
    const t = clock.getElapsedTime() * orb.speed + orb.phase;
    ref.current.position.x = Math.cos(t) * orb.rx;
    ref.current.position.z = Math.sin(t) * orb.rz;
    ref.current.position.y = Math.sin(t * 0.8) * 0.15 + orb.yOffset;
    ref.current.rotation.y += 0.009;
  });
  return (
    <group ref={ref}>
      <mesh castShadow>
        <boxGeometry args={[0.22, 0.44, 0.04]} />
        <meshStandardMaterial color="#92400E" roughness={0.75} metalness={0.0} />
      </mesh>
      {/* Panel lines */}
      <mesh position={[0, 0.08, 0.022]}>
        <boxGeometry args={[0.15, 0.16, 0.01]} />
        <meshStandardMaterial color="#7C3A1A" roughness={0.8} />
      </mesh>
      <mesh position={[0, -0.1, 0.022]}>
        <boxGeometry args={[0.15, 0.16, 0.01]} />
        <meshStandardMaterial color="#7C3A1A" roughness={0.8} />
      </mesh>
      {/* Knob */}
      <mesh position={[0.08, 0, 0.028]}>
        <sphereGeometry args={[0.025, 8, 8]} />
        <meshStandardMaterial color="#D97706" roughness={0.2} metalness={0.9} />
      </mesh>
    </group>
  );
}

function ElectricalSpool({ orb }: { orb: OrbitConfig }) {
  const ref = useRef<THREE.Group>(null!);
  useFrame(({ clock }) => {
    if (document.visibilityState === 'hidden') return;
    const t = clock.getElapsedTime() * orb.speed + orb.phase;
    ref.current.position.x = Math.cos(t) * orb.rx;
    ref.current.position.z = Math.sin(t) * orb.rz;
    ref.current.position.y = Math.sin(t * 0.8) * 0.15 + orb.yOffset;
    ref.current.rotation.x += 0.01;
  });
  return (
    <group ref={ref} rotation={[Math.PI / 2, 0, 0]}>
      {/* Flanges */}
      <mesh position={[0, -0.12, 0]} castShadow>
        <cylinderGeometry args={[0.2, 0.2, 0.04, 12]} />
        <meshStandardMaterial color="#374151" roughness={0.6} metalness={0.3} />
      </mesh>
      <mesh position={[0, 0.12, 0]} castShadow>
        <cylinderGeometry args={[0.2, 0.2, 0.04, 12]} />
        <meshStandardMaterial color="#374151" roughness={0.6} metalness={0.3} />
      </mesh>
      {/* Barrel */}
      <mesh position={[0, 0, 0]} castShadow>
        <cylinderGeometry args={[0.09, 0.09, 0.22, 12]} />
        <meshStandardMaterial color="#FCD34D" roughness={0.4} metalness={0.1} />
      </mesh>
    </group>
  );
}

function TileStack({ orb }: { orb: OrbitConfig }) {
  const ref = useRef<THREE.Group>(null!);
  useFrame(({ clock }) => {
    if (document.visibilityState === 'hidden') return;
    const t = clock.getElapsedTime() * orb.speed + orb.phase;
    ref.current.position.x = Math.cos(t) * orb.rx;
    ref.current.position.z = Math.sin(t) * orb.rz;
    ref.current.position.y = Math.sin(t * 0.8) * 0.15 + orb.yOffset;
    ref.current.rotation.y += 0.008;
  });
  const colors = ['#C2410C', '#EA580C', '#DC2626'];
  return (
    <group ref={ref}>
      {colors.map((c, i) => (
        <mesh key={i} position={[0, i * 0.075 - 0.075, 0]} castShadow>
          <boxGeometry args={[0.32, 0.055, 0.32]} />
          <meshStandardMaterial color={c} roughness={0.5} metalness={0.1} />
        </mesh>
      ))}
    </group>
  );
}

export default function OrbitingMaterials() {
  return (
    <>
      <CementSack orb={ORBITS[0]} />
      <CopperPipes orb={ORBITS[1]} />
      <Bathtub orb={ORBITS[2]} />
      <WoodenDoor orb={ORBITS[3]} />
      <ElectricalSpool orb={ORBITS[4]} />
      <TileStack orb={ORBITS[5]} />
    </>
  );
}
