import Logo from "@/public/images/padelkaverit.svg";

interface AnimatedSvgProps {
  width?: number | string;
  height?: number | string;
  className?: string;
}

const AnimatedSvg = ({
  width = "100%",
  height = "100%",
  className = "",
}: AnimatedSvgProps) => {
  const blendMode = "multiply";

  const svgViewBox = "0 0 203.974 56.025726";
  const svgWidth = 203.974;
  const svgHeight = 56.025726;
  const maxRadius = Math.sqrt(svgWidth ** 2 + svgHeight ** 2);
  const centerX = svgWidth / 2;
  const centerY = svgHeight / 2;

  const config = {
    duration: 2,
    layers: {
      startOpacity: 1,
      endOpacity: 1,
      blendMode: blendMode,
      maskOpacity: 1,
      finalRevealAt: 0.4,
      finalRevealDuration: 2.0,
    },
    easing: "0.5 0 0.7 1",
    turbulence: {
      baseFrequency: 0.05,
      numOctaves: 4,
      scale: 50,
      animationDuration: 20,
    },
    corners: [
      { cx: 0, cy: 0, color: "neon-orange" },
      { cx: svgWidth, cy: 0, color: "neon-purple" },
      { cx: svgWidth, cy: svgHeight, color: "neon-cyan" },
      { cx: 0, cy: svgHeight, color: "neon-lime" },
    ],
  };

  const ids = {
    filter: `noise-${Math.random()}`,
    mask: `mask-${Math.random()}`,
    finalMask: `final-mask-${Math.random()}`,
  };

  return (
    <svg
      width={width}
      height={height}
      viewBox={svgViewBox}
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} fill-current isolate`}
      style={{ isolation: "isolate" }}
    >
      <defs>
        <filter id={ids.filter}>
          <feTurbulence
            type="fractalNoise"
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

        {config.corners.map((corner, i) => (
          <mask
            id={`${ids.mask}-${i + 1}`}
            key={`mask-${i}`}
            maskUnits="userSpaceOnUse"
          >
            <circle
              cx={corner.cx}
              cy={corner.cy}
              r="0"
              fill="white"
              filter={`url(#${ids.filter})`}
              opacity={config.layers.maskOpacity}
            >
              <animate
                attributeName="r"
                from="0"
                to={maxRadius}
                dur={`${config.duration}s`}
                begin="0s"
                calcMode="spline"
                keySplines={config.easing}
              />
            </circle>
          </mask>
        ))}

        <mask id={ids.finalMask} maskUnits="userSpaceOnUse">
          <circle
            cx={centerX}
            cy={centerY}
            r="0"
            fill="white"
            opacity="1"
            filter={`url(#${ids.filter})`}
          >
            <animate
              attributeName="r"
              from="0"
              to={maxRadius}
              dur={`${config.layers.finalRevealDuration}s`}
              begin={`${config.duration * config.layers.finalRevealAt}s`}
              fill="freeze"
              calcMode="spline"
              keySplines={config.easing}
            />
          </circle>
        </mask>
      </defs>

      {config.corners.map((corner, i) => (
        <g
          key={`layer-${i}`}
          id={`layer-${i}`}
          mask={`url(#${ids.mask}-${i + 1})`}
          fill={`hsl(var(--${corner.color}))`}
          style={{
            mixBlendMode: config.layers.blendMode,
            opacity: config.layers.startOpacity,
          }}
        >
          <Logo />
          <animate
            attributeName="opacity"
            from={config.layers.startOpacity}
            to="1"
            dur={`${config.layers.finalRevealDuration}s`}
            begin={`${config.duration * config.layers.finalRevealAt}s`}
            fill="freeze"
          />
        </g>
      ))}

      <g
        id="final-layer"
        fill="hsl(var(--foreground))"
        style={{ opacity: 1 }}
        mask={`url(#${ids.finalMask})`}
      >
        <Logo />
      </g>
    </svg>
  );
};

export default AnimatedSvg;
