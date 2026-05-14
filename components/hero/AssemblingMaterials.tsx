'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { damp } from 'maath/easing';
import { heroScrollProgress } from '@/lib/heroScroll';

function mapRange(p: number, inMin: number, inMax: number): number {
  return Math.min(1, Math.max(0, (p - inMin) / (inMax - inMin)));
}

// Cement Sack
function CementSack() {
  return (
    <group>
      <mesh castShadow>
        <boxGeometry args={[0.42, 0.28, 0.18]} />
        <meshPhysicalMaterial color="#D4D0C8" roughness={0.92} metalness={0.0} />
      </mesh>
      <mesh position={[0, 0.05, 0.092]}>
        <boxGeometry args={[0.3, 0.06, 0.01]} />
        <meshPhysicalMaterial color="#888" roughness={0.8} metalness={0.0} />
      </mesh>
    </group>
  );
}

// Copper Pipes
function CopperPipes() {
  return (
    <group>
      {([-0.07, 0, 0.07] as const).map((x, i) => (
        <mesh key={i} position={[x, 0, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow>
          <cylinderGeometry args={[0.028, 0.028, 0.5, 10]} />
          <meshPhysicalMaterial
            color={i === 0 ? '#B87333' : i === 1 ? '#CD7F32' : '#A0632A'}
            roughness={0.25}
            metalness={0.85}
            clearcoat={0.5}
            clearcoatRoughness={0.1}
          />
        </mesh>
      ))}
    </group>
  );
}

// Tile Stack
function TileStack() {
  return (
    <group>
      {([0, 0.07, 0.14] as const).map((y, i) => (
        <mesh key={i} position={[0, y, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.32, 0.05, 0.32]} />
          <meshPhysicalMaterial
            color={['#C2410C', '#EA580C', '#DC2626'][i]}
            roughness={0.3}
            metalness={0.0}
            clearcoat={0.6}
            clearcoatRoughness={0.2}
          />
        </mesh>
      ))}
    </group>
  );
}

// Bathtub
function Bathtub() {
  return (
    <group>
      <mesh castShadow>
        <boxGeometry args={[0.5, 0.2, 0.28]} />
        <meshPhysicalMaterial
          color="#F0F0F0"
          roughness={0.05}
          metalness={0.0}
          clearcoat={1.0}
          clearcoatRoughness={0.05}
          ior={1.45}
        />
      </mesh>
      <mesh position={[0, 0.06, 0]}>
        <boxGeometry args={[0.44, 0.1, 0.22]} />
        <meshPhysicalMaterial color="#E8E8E8" roughness={0.08} metalness={0.0} clearcoat={0.8} />
      </mesh>
    </group>
  );
}

// Electrical Spool
function ElectricalSpool() {
  return (
    <group rotation={[Math.PI / 2, 0, 0]}>
      <mesh castShadow>
        <cylinderGeometry args={[0.22, 0.22, 0.08, 16]} />
        <meshPhysicalMaterial color="#2A2A2A" roughness={0.8} metalness={0.3} />
      </mesh>
      <mesh>
        <cylinderGeometry args={[0.14, 0.14, 0.18, 16]} />
        <meshPhysicalMaterial color="#FCD34D" roughness={0.5} metalness={0.1} emissive="#7C5A00" emissiveIntensity={0.1} />
      </mesh>
      <mesh position={[0, 0.13, 0]}>
        <cylinderGeometry args={[0.22, 0.22, 0.08, 16]} />
        <meshPhysicalMaterial color="#2A2A2A" roughness={0.8} metalness={0.3} />
      </mesh>
    </group>
  );
}

// Wooden Door panel
function WoodenDoor() {
  return (
    <group>
      <mesh castShadow>
        <boxGeometry args={[0.28, 0.44, 0.04]} />
        <meshPhysicalMaterial
          color="#5D3A1A"
          roughness={0.55}
          metalness={0.0}
          clearcoat={0.3}
          clearcoatRoughness={0.3}
        />
      </mesh>
      {([-0.07, 0.07] as const).map((x, i) => (
        <mesh key={i} position={[x, 0.06, 0.022]}>
          <boxGeometry args={[0.1, 0.16, 0.01]} />
          <meshPhysicalMaterial color="#4A2E15" roughness={0.6} metalness={0.0} />
        </mesh>
      ))}
    </group>
  );
}

interface MaterialDef {
  id: string;
  start: [number, number, number];
  end: [number, number, number];
  trigger: [number, number];
}

const MATERIAL_DEFS: MaterialDef[] = [
  { id: 'cement',  start: [-4.5, 2.0, -1.0], end: [-1.8, -0.3, 0.6],  trigger: [0.55, 0.65] },
  { id: 'pipes',   start: [4.5, 2.2, -0.5],  end: [1.8, 0.2, 0.8],   trigger: [0.60, 0.70] },
  { id: 'tiles',   start: [-3.5, -1.5, 2.0], end: [-1.5, -0.5, 0.9], trigger: [0.65, 0.75] },
  { id: 'bathtub', start: [3.8, -1.8, 1.5],  end: [1.6, -0.5, 0.7],  trigger: [0.68, 0.78] },
  { id: 'spool',   start: [-4.0, 0.5, -2.0], end: [-1.4, -0.6, -0.2],trigger: [0.72, 0.82] },
  { id: 'door',    start: [4.2, 0.8, -1.5],  end: [1.2, 0.0, -0.3],  trigger: [0.75, 0.85] },
];

export default function AssemblingMaterials() {
  const ref0 = useRef<THREE.Group>(null!);
  const ref1 = useRef<THREE.Group>(null!);
  const ref2 = useRef<THREE.Group>(null!);
  const ref3 = useRef<THREE.Group>(null!);
  const ref4 = useRef<THREE.Group>(null!);
  const ref5 = useRef<THREE.Group>(null!);
  const groupRefs = [ref0, ref1, ref2, ref3, ref4, ref5];

  useFrame((_state, delta) => {
    const p = heroScrollProgress.current;

    MATERIAL_DEFS.forEach((mat, i) => {
      const ref = groupRefs[i];
      if (!ref.current) return;

      const progress = mapRange(p, mat.trigger[0], mat.trigger[1]);
      const [sx, sy, sz] = mat.start;
      const [ex, ey, ez] = mat.end;

      damp(ref.current.position, 'x', THREE.MathUtils.lerp(sx, ex, progress), 5, delta);
      damp(ref.current.position, 'y', THREE.MathUtils.lerp(sy, ey, progress), 5, delta);
      damp(ref.current.position, 'z', THREE.MathUtils.lerp(sz, ez, progress), 5, delta);

      // Slow spin decelerates as it lands
      ref.current.rotation.y += delta * (1.0 - progress) * 0.8;
    });
  });

  return (
    <group>
      <group ref={ref0} position={MATERIAL_DEFS[0].start}><CementSack /></group>
      <group ref={ref1} position={MATERIAL_DEFS[1].start}><CopperPipes /></group>
      <group ref={ref2} position={MATERIAL_DEFS[2].start}><TileStack /></group>
      <group ref={ref3} position={MATERIAL_DEFS[3].start}><Bathtub /></group>
      <group ref={ref4} position={MATERIAL_DEFS[4].start}><ElectricalSpool /></group>
      <group ref={ref5} position={MATERIAL_DEFS[5].start}><WoodenDoor /></group>
    </group>
  );
}
