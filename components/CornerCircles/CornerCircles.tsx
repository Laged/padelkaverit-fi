import { useCornerCircleGeometry } from "./useCornerCircleGeometry";
import { CornerCircle } from "./CornerCircle";

interface CornerCirclesProps {
  delay?: number;
}

export function CornerCircles({ delay = 0.2 }: CornerCirclesProps) {
  const { corners, geometries } = useCornerCircleGeometry();

  return (
    <>
      {corners.map((corner, i) => (
        <CornerCircle
          key={i}
          position={corner.position}
          color={corner.color}
          delay={delay}
          geometry={corner.position[0] < 0 ? geometries.left : geometries.right}
        />
      ))}
    </>
  );
}
