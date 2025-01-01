import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import { vertexShader, fragmentShader } from "../Shaders/NoiseCircleShader";

interface CornerCircleProps {
  position: [number, number];
  color: [number, number, number];
  delay: number;
  geometry: THREE.CircleGeometry;
}

export function CornerCircle({
  position,
  color,
  delay,
  geometry,
}: CornerCircleProps) {
  const meshRef = useRef<THREE.Mesh | null>(null);
  const startTime = useRef(Date.now());

  useFrame(() => {
    if (!meshRef.current) return;

    const elapsedTime = (Date.now() - startTime.current) / 1000 - delay;
    if (elapsedTime < 0) return;

    const material = meshRef.current.material as THREE.ShaderMaterial;
    material.uniforms.time.value = elapsedTime * 2;

    const duration = 15;
    const tLinear = Math.min(elapsedTime / duration, 1);
    const tEased = tLinear * tLinear * (3 - 2 * tLinear);
    const newRadius = tEased * geometry.parameters.radius;
    material.uniforms.radius.value = newRadius;
  });

  return (
    <mesh ref={meshRef} geometry={geometry} position={[...position, 0]}>
      <shaderMaterial
        transparent
        blending={THREE.MultiplyBlending}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={{
          time: { value: 0 },
          radius: { value: 0 },
          color: { value: color },
        }}
      />
    </mesh>
  );
}
