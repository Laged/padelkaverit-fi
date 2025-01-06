import { useRef } from "react";
import { useInView } from "framer-motion";
import { AnimatedScene } from "../AnimatedScene/AnimatedScene";
import { CornerCircles } from "../CornerCircles/CornerCircles";
import { SVGConfig } from "../Masks/types";
interface ReusableBackgroundProps {
  maskId: string;
  config: SVGConfig;
  children: React.ReactNode;
  delay?: number;
}

export function ReusableBackground({
  maskId,
  config,
  children,
  delay = 0.2,
}: ReusableBackgroundProps) {
  const { viewBox } = config;
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.5 });

  return (
    <div
      ref={containerRef}
      className="relative w-full mx-auto bg-transparent"
      style={{ aspectRatio: viewBox.width / viewBox.height }}
    >
      <div className="absolute inset-0">
        <AnimatedScene aspectRatio={viewBox.width / viewBox.height}>
          {isInView && <CornerCircles delay={delay} />}
        </AnimatedScene>
      </div>

      <svg
        className="absolute inset-0"
        viewBox={`0 0 ${viewBox.width} ${viewBox.height}`}
        preserveAspectRatio="xMidYMid slice"
        style={{
          width: "100%",
          height: "100%",
          shapeRendering: "geometricPrecision",
          textRendering: "geometricPrecision",
        }}
      >
        {children}
        <rect
          width="100%"
          height="100%"
          fill="white"
          mask={`url(#${maskId})`}
          style={{
            shapeRendering: "crispEdges",
            vectorEffect: "non-scaling-stroke",
          }}
        />
      </svg>
    </div>
  );
}
