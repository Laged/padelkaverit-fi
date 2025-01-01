import { Canvas } from "@react-three/fiber";
import { ReactNode } from "react";

interface AnimatedSceneProps {
  children: ReactNode;
  aspectRatio?: number;
}

export function AnimatedScene({
  children,
  aspectRatio = 203.974 / 56.025726,
}: AnimatedSceneProps) {
  return (
    <Canvas
      style={{ width: "100%", height: "100%" }}
      camera={{
        position: [0, 0, 5],
        aspect: aspectRatio,
      }}
      gl={{ alpha: true }}
    >
      <color attach="background" args={["transparent"]} />
      {children}
    </Canvas>
  );
}
