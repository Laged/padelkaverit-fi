import { useEffect, useState } from "react";

interface AnimatedSvgProps {
  svgPath: string;
  width?: number | string;
  height?: number | string;
  className?: string;
}

const AnimatedSvg = ({
  svgPath,
  width = "100%",
  height = "100%",
  className = "",
}: AnimatedSvgProps) => {
  const [svgContent, setSvgContent] = useState<string>("");
  const filterId = `noise-${Math.random()}`;
  const maskId = `mask-${Math.random()}`;

  // Configuration object for animation settings
  const config = {
    duration: 5,
    corners: [
      { cx: 0, cy: 56, color: "neon-orange" },
      { cx: 204, cy: 56, color: "neon-purple" },
      { cx: 204, cy: 0, color: "neon-cyan" },
      { cx: 0, cy: 0, color: "neon-lime" },
    ],
    layers: {
      startOpacity: 0.85,
      endOpacity: 1,
      blendMode: "multiply",
    },
    glitch: {
      enabled: true,
      duration: 5,
      startAt: 0,
    },
    easing: "0.25 0.1 0.25 1",
    turbulence: {
      baseFrequency: 0.05,
      numOctaves: 2,
      scale: 50,
      animationDuration: 20,
    },
  };

  useEffect(() => {
    fetch(svgPath)
      .then((response) => response.text())
      .then((content) => {
        const svgMatch = content.match(/<svg[^>]*>([\s\S]*?)<\/svg>/);
        if (svgMatch && svgMatch[1]) {
          setSvgContent(svgMatch[1]);
        }
      });
  }, [svgPath]);

  const generateLayers = () => (
    <>
      {/* Colored layers */}
      {config.corners.map((corner, i) => (
        <g
          key={`layer-${i}`}
          mask={`url(#${maskId}-${i + 1})`}
          fill={`hsl(var(--${corner.color}))`}
          style={{
            mixBlendMode: config.layers
              .blendMode as React.CSSProperties["mixBlendMode"],
          }}
          dangerouslySetInnerHTML={{ __html: svgContent }}
        />
      ))}

      {/* Final foreground layer */}
      <g
        id="final-layer"
        fill="hsl(var(--foreground))"
        style={{ opacity: 0 }}
        dangerouslySetInnerHTML={{ __html: svgContent }}
      />

      {/* Masks and filters */}
      <defs>
        {/* Turbulence filter */}
        <filter id={filterId}>
          <feTurbulence
            type="turbulence"
            baseFrequency={config.turbulence.baseFrequency}
            numOctaves={config.turbulence.numOctaves}
            result="turbulence"
          >
            <animate
              attributeName="baseFrequency"
              dur={`${config.turbulence.animationDuration}s`}
              values="0.05;0.1;0.05"
              repeatCount="indefinite"
            />
          </feTurbulence>
          <feDisplacementMap
            in="SourceGraphic"
            in2="turbulence"
            scale={config.turbulence.scale}
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>

        {/* Corner masks */}
        {config.corners.map((corner, i) => (
          <mask id={`${maskId}-${i + 1}`} key={`mask-${i}`}>
            <circle
              cx={corner.cx}
              cy={corner.cy}
              r="0"
              fill="white"
              style={{ filter: `url(#${filterId})` }}
              opacity={i === 0 ? "1" : "0.7"}
            >
              <animate
                attributeName="r"
                from="0"
                to="300"
                dur={`${config.duration}s`}
                begin="0s"
                fill="freeze"
                calcMode="spline"
                keySplines={config.easing}
              />
            </circle>
          </mask>
        ))}
      </defs>
    </>
  );

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 203.974 56.025726"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} fill-current`}
    >
      {generateLayers()}
    </svg>
  );
};

export default AnimatedSvg;
