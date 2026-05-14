import { shaderMaterial } from '@react-three/drei';
import * as THREE from 'three';

// Fullscreen UV sweep — used on a PlaneGeometry quad filling the view.
// progress goes 0→1 left to right, then caller flips to exit right.
export const SweepMaterial = shaderMaterial(
  {
    progress: 0.0,
    color: new THREE.Color('#F59E0B'),
    edgeSoftness: 0.04,
  },
  /* glsl */ `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  /* glsl */ `
    uniform float progress;
    uniform vec3 color;
    uniform float edgeSoftness;
    varying vec2 vUv;
    void main() {
      float mask = smoothstep(progress - edgeSoftness, progress + edgeSoftness, vUv.x);
      gl_FragColor = vec4(color, 1.0 - mask);
    }
  `
);

SweepMaterial.key = THREE.MathUtils.generateUUID();
