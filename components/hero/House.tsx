'use client';

import { useRef } from 'react';
import * as THREE from 'three';

export default function House() {
  return (
    <group position={[0, -0.5, 0]}>
      {/* Foundation */}
      <mesh position={[0, -0.05, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.6, 0.15, 2.0]} />
        <meshStandardMaterial color="#3D3D3D" roughness={0.9} metalness={0.1} />
      </mesh>

      {/* Front wall */}
      <mesh position={[0, 0.75, 0.925]} castShadow>
        <boxGeometry args={[2.4, 1.5, 0.12]} />
        <meshStandardMaterial color="#C8C2B6" roughness={0.85} metalness={0.02} />
      </mesh>

      {/* Back wall */}
      <mesh position={[0, 0.75, -0.925]} castShadow>
        <boxGeometry args={[2.4, 1.5, 0.12]} />
        <meshStandardMaterial color="#BDB7AB" roughness={0.85} metalness={0.02} />
      </mesh>

      {/* Left wall */}
      <mesh position={[-1.14, 0.75, 0]} castShadow>
        <boxGeometry args={[0.12, 1.5, 1.73]} />
        <meshStandardMaterial color="#C8C2B6" roughness={0.85} metalness={0.02} />
      </mesh>

      {/* Right wall */}
      <mesh position={[1.14, 0.75, 0]} castShadow>
        <boxGeometry args={[0.12, 1.5, 1.73]} />
        <meshStandardMaterial color="#C8C2B6" roughness={0.85} metalness={0.02} />
      </mesh>

      {/* Roof — two angled halves forming a hip */}
      <mesh position={[0, 1.8, 0]} rotation={[0, 0, 0]} castShadow>
        <coneGeometry args={[1.65, 0.9, 4, 1]} />
        <meshStandardMaterial color="#D97706" roughness={0.6} metalness={0.05} />
      </mesh>

      {/* Window — emissive amber glow */}
      <mesh position={[0.55, 0.75, 0.932]}>
        <boxGeometry args={[0.45, 0.42, 0.01]} />
        <meshStandardMaterial
          color="#F59E0B"
          emissive="#F59E0B"
          emissiveIntensity={0.6}
          roughness={0.1}
          metalness={0.3}
          transparent
          opacity={0.85}
        />
      </mesh>

      {/* Door */}
      <mesh position={[-0.4, 0.42, 0.932]}>
        <boxGeometry args={[0.46, 0.84, 0.02]} />
        <meshStandardMaterial color="#7C3A1A" roughness={0.7} metalness={0.05} />
      </mesh>

      {/* Scaffolding — left side */}
      {[-1.28, -1.42].map((x, i) => (
        <mesh key={`sl${i}`} position={[x, 0.6, 0]} castShadow>
          <cylinderGeometry args={[0.025, 0.025, 1.8, 6]} />
          <meshStandardMaterial color="#6B7280" roughness={0.5} metalness={0.6} />
        </mesh>
      ))}
      {/* Horizontal bars left */}
      {[0.1, 0.7, 1.2].map((y, i) => (
        <mesh key={`hlb${i}`} position={[-1.35, y, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.018, 0.018, 0.22, 6]} />
          <meshStandardMaterial color="#6B7280" roughness={0.5} metalness={0.6} />
        </mesh>
      ))}

      {/* Scaffolding — right side */}
      {[1.28, 1.42].map((x, i) => (
        <mesh key={`sr${i}`} position={[x, 0.6, 0]} castShadow>
          <cylinderGeometry args={[0.025, 0.025, 1.8, 6]} />
          <meshStandardMaterial color="#6B7280" roughness={0.5} metalness={0.6} />
        </mesh>
      ))}
      {/* Horizontal bars right */}
      {[0.1, 0.7, 1.2].map((y, i) => (
        <mesh key={`hrb${i}`} position={[1.35, y, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.018, 0.018, 0.22, 6]} />
          <meshStandardMaterial color="#6B7280" roughness={0.5} metalness={0.6} />
        </mesh>
      ))}
    </group>
  );
}
