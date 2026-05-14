import { shaderMaterial } from '@react-three/drei';
import * as THREE from 'three';

export const FresnelRimMaterial = shaderMaterial(
  {
    rimColor: new THREE.Color('#F59E0B'),
    rimPower: 3.5,
    rimStrength: 1.8,
    opacity: 1.0,
  },
  /* glsl */ `
    varying vec3 vNormal;
    varying vec3 vViewDir;
    void main() {
      vNormal = normalize(normalMatrix * normal);
      vec4 mv = modelViewMatrix * vec4(position, 1.0);
      vViewDir = normalize(-mv.xyz);
      gl_Position = projectionMatrix * mv;
    }
  `,
  /* glsl */ `
    uniform vec3 rimColor;
    uniform float rimPower;
    uniform float rimStrength;
    uniform float opacity;
    varying vec3 vNormal;
    varying vec3 vViewDir;
    void main() {
      float rim = pow(1.0 - max(dot(vNormal, vViewDir), 0.0), rimPower) * rimStrength;
      gl_FragColor = vec4(rimColor * rim, rim * opacity);
    }
  `
);

FresnelRimMaterial.key = THREE.MathUtils.generateUUID();
