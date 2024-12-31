"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

type CornerCircleProps = {
  position: [number, number];
  color: [number, number, number];
  delay: number;
  geometry: THREE.CircleGeometry;
};

function AnimatedLogo() {
  const corners = useMemo(() => {
    const z = 5;
    const fov = 75;
    const offset = 0.0;
    const height = 2 * Math.tan((fov * Math.PI) / 180 / 2) * z;
    const width = height * (203.974 / 56.025726);
    const x = width;
    const y = height;

    return [
      {
        position: [-x / 2 - offset, y / 2 + offset] as [number, number],
        color: [1.0, 0.37, 0.1] as [number, number, number],
      }, // top-left
      {
        position: [x / 2 + offset, y / 2 + offset] as [number, number],
        color: [0.54, 0.17, 0.89] as [number, number, number],
      }, // top-right
      {
        position: [x / 2 + offset, -y / 2 - offset] as [number, number],
        color: [0.0, 1.0, 1.0] as [number, number, number],
      }, // bottom-right
      {
        position: [-x / 2 - offset, -y / 2 - offset] as [number, number],
        color: [0.8, 1.0, 0.0] as [number, number, number],
      }, // bottom-left
    ];
  }, []);

  const geometries = useMemo(() => {
    const z = 5;
    const fov = 75;
    const offset = 0.0;
    const height = 2 * Math.tan((fov * Math.PI) / 180 / 2) * z;
    const width = height * (203.974 / 56.025726);

    const radius = width + offset;

    const leftGeo = new THREE.CircleGeometry(radius, 32);
    leftGeo.translate(2, 0, 0);

    const rightGeo = new THREE.CircleGeometry(radius, 32);
    rightGeo.translate(-2, 0, 0);

    return { left: leftGeo, right: rightGeo };
  }, []);

  return (
    <>
      {corners.map((corner, i) => (
        <CornerCircle
          key={i}
          position={corner.position}
          color={corner.color}
          delay={0.2}
          geometry={corner.position[0] < 0 ? geometries.left : geometries.right}
        />
      ))}
    </>
  );
}

function CornerCircle({ position, color, delay, geometry }: CornerCircleProps) {
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
        vertexShader={`
          varying vec2 vUv;
          
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `}
        fragmentShader={`
          varying vec2 vUv;
          uniform float time;
          uniform float radius;
          uniform vec3 color;
          
          // Perlin noise functions
          vec4 permute(vec4 x) {
            return mod(((x*34.0)+1.0)*x, 289.0);
          }

          vec4 taylorInvSqrt(vec4 r) {
            return 1.79284291400159 - 0.85373472095314 * r;
          }

          float perlinNoise(vec3 P) {
            vec3 Pi0 = floor(P);
            vec3 Pi1 = Pi0 + vec3(1.0);
            Pi0 = mod(Pi0, 289.0);
            Pi1 = mod(Pi1, 289.0);
            vec3 Pf0 = fract(P);
            vec3 Pf1 = Pf0 - vec3(1.0);
            vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
            vec4 iy = vec4(Pi0.yy, Pi1.yy);
            vec4 iz0 = Pi0.zzzz;
            vec4 iz1 = Pi1.zzzz;

            vec4 ixy = permute(permute(ix) + iy);
            vec4 ixy0 = permute(ixy + iz0);
            vec4 ixy1 = permute(ixy + iz1);

            vec4 gx0 = ixy0 / 7.0;
            vec4 gy0 = fract(floor(gx0) / 7.0) - 0.5;
            gx0 = fract(gx0);
            vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);
            vec4 sz0 = step(gz0, vec4(0.0));
            gx0 -= sz0 * (step(0.0, gx0) - 0.5);
            gy0 -= sz0 * (step(0.0, gy0) - 0.5);

            vec4 gx1 = ixy1 / 7.0;
            vec4 gy1 = fract(floor(gx1) / 7.0) - 0.5;
            gx1 = fract(gx1);
            vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);
            vec4 sz1 = step(gz1, vec4(0.0));
            gx1 -= sz1 * (step(0.0, gx1) - 0.5);
            gy1 -= sz1 * (step(0.0, gy1) - 0.5);

            vec3 g000 = vec3(gx0.x,gy0.x,gz0.x);
            vec3 g100 = vec3(gx0.y,gy0.y,gz0.y);
            vec3 g010 = vec3(gx0.z,gy0.z,gz0.z);
            vec3 g110 = vec3(gx0.w,gy0.w,gz0.w);
            vec3 g001 = vec3(gx1.x,gy1.x,gz1.x);
            vec3 g101 = vec3(gx1.y,gy1.y,gz1.y);
            vec3 g011 = vec3(gx1.z,gy1.z,gz1.z);
            vec3 g111 = vec3(gx1.w,gy1.w,gz1.w);

            vec4 norm0 = taylorInvSqrt(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));
            g000 *= norm0.x;
            g010 *= norm0.y;
            g100 *= norm0.z;
            g110 *= norm0.w;
            vec4 norm1 = taylorInvSqrt(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));
            g001 *= norm1.x;
            g011 *= norm1.y;
            g101 *= norm1.z;
            g111 *= norm1.w;

            float n000 = dot(g000, Pf0);
            float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));
            float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));
            float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));
            float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));
            float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));
            float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));
            float n111 = dot(g111, Pf1);

            vec3 fade_xyz = Pf0 * Pf0 * Pf0 * (Pf0 * (Pf0 * 6.0 - 15.0) + 10.0);
            vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);
            vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);
            float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x);
            return 2.2 * n_xyz;
          }

          void main() {
            float dist = length(vUv - 0.5) * 2.0;

            float noise =
              perlinNoise(vec3(vUv * 32.0, time / 8.0)) * 0.5 +
              perlinNoise(vec3(vUv * 128.0, time / 2.0)) * 0.25;
            float distortedDist =
              dist + (noise * 0.25) * radius * 2.0;

            float edge = 1.0 - step(radius, distortedDist);
            
            vec3 finalColor = mix(vec3(1.0), color, edge);
            gl_FragColor = vec4(finalColor, 1.0);
          }
        `}
        uniforms={{
          time: { value: 0 },
          radius: { value: 0 },
          color: { value: color },
        }}
      />
    </mesh>
  );
}

function LogoMaskPath() {
  return (
    <defs>
      <mask id="logoMask" maskUnits="userSpaceOnUse" mask-type="luminance">
        <rect width="100%" height="101%" fill="white" />
        <g transform="translate(-268.46735,-422.84293)">
          <path
            d="m 0,0 c 0.604,0 1.074,0.146 1.413,0.439 0.338,0.293 0.508,0.649 0.508,1.07 0,0.421 -0.17,0.778 -0.508,1.07 C 1.074,2.872 0.604,3.019 0,3.019 H -1.921 V 0 Z M -10.153,-10.565 V 8.644 H 0.96 c 1.994,0 3.705,-0.32 5.132,-0.961 C 7.519,7.043 8.598,6.178 9.33,5.09 10.061,4.002 10.427,2.808 10.427,1.509 10.427,0.21 10.061,-0.984 9.33,-2.072 8.598,-3.16 7.519,-4.025 6.092,-4.665 4.665,-5.305 2.954,-5.625 0.96,-5.625 h -2.607 v -4.94 z"
            fill="black"
            transform="matrix(1.3333333,0,0,-1.3333333,318.1348,434.36853)"
          />
          {/* Path 2 - A */}
          <path
            d="M 0,0 -1.482,-5.324 H 1.591 L 0.11,0 Z M -4.116,-13.309 H -12.76 L -4.802,5.9 h 9.879 l 7.957,-19.209 H 4.226 l -1.043,3.183 h -6.256 z"
            fill="black"
            transform="matrix(1.3333333,0,0,-1.3333333,347.77067,430.7096)"
          />
          {/* Path 3 - D */}
          <path
            d="M 0,0 C 1.116,0 2.058,0.357 2.826,1.07 3.595,1.784 3.979,2.707 3.979,3.842 3.979,4.976 3.595,5.9 2.826,6.613 2.058,7.327 1.116,7.683 0,7.683 H -1.235 V 0 Z M -9.742,-5.762 V 13.446 H 0 c 2.616,0 4.866,-0.43 6.75,-1.29 1.884,-0.86 3.311,-2.017 4.281,-3.471 C 12,7.231 12.485,5.616 12.485,3.842 12.485,2.067 12,0.453 11.031,-1.002 10.061,-2.456 8.634,-3.613 6.75,-4.473 4.866,-5.333 2.616,-5.762 0,-5.762 Z"
            fill="black"
            transform="matrix(1.3333333,0,0,-1.3333333,380.88187,440.77133)"
          />
          {/* Path 4 - E */}
          <path
            d="m 0,0 h -19.071 v 19.208 h 18.797 v -5.625 h -10.291 v -1.646 h 7.684 V 7.272 h -7.684 V 5.625 H 0 Z"
            fill="black"
            transform="matrix(1.3333333,0,0,-1.3333333,426.98147,448.45453)"
          />
          {/* Path 5 - L */}
          <path
            d="M 0,0 H -17.836 V 19.208 H -9.33 V 6.723 H 0 Z"
            fill="black"
            transform="matrix(1.3333333,0,0,-1.3333333,455.70213,448.45453)"
          />
          {/* Path 6 - K */}
          <path
            d="M 0,0 H -8.507 V 19.208 H 0 v -6.036 l 5.762,6.036 h 9.056 L 6.86,11.113 15.367,0 H 6.174 L 1.647,6.064 0,4.391 Z"
            fill="black"
            transform="matrix(1.3333333,0,0,-1.3333333,279.81,478.8684)"
          />
          {/* Path 7 - A */}
          <path
            d="M 0,0 -1.482,-5.324 H 1.591 L 0.11,0 Z M -4.116,-13.309 H -12.76 L -4.802,5.9 h 9.878 l 7.958,-19.209 H 4.226 l -1.043,3.183 h -6.256 z"
            fill="black"
            transform="matrix(1.3333333,0,0,-1.3333333,316.3972,461.12333)"
          />
          {/* Path 8 - V */}
          <path
            d="m 0,0 h -9.879 l -7.683,19.208 h 8.726 L -4.939,6.805 h 0.137 l 3.924,12.403 h 8.561 z"
            fill="black"
            transform="matrix(1.3333333,0,0,-1.3333333,354.44787,478.8684)"
          />
          {/* Path 9 - E */}
          <path
            d="m 0,0 h -19.071 v 19.208 h 18.797 v -5.625 h -10.291 v -1.646 h 7.684 V 7.272 h -7.684 V 5.625 H 0 Z"
            fill="black"
            transform="matrix(1.3333333,0,0,-1.3333333,393.04693,478.8684)"
          />
          {/* Path 10 - R */}
          <path
            d="m 0,0 v -2.744 h 2.195 c 0.604,0 1.075,0.123 1.414,0.37 0.338,0.247 0.507,0.581 0.507,1.002 0,0.421 -0.169,0.755 -0.507,1.001 C 3.27,-0.124 2.799,0 2.195,0 Z M 13.583,-13.583 H 4.445 l -2.881,5.214 h -1.29 v -5.214 H -8.232 V 5.625 H 3.156 c 2.085,0 3.837,-0.301 5.255,-0.905 1.417,-0.604 2.474,-1.432 3.169,-2.484 0.695,-1.052 1.043,-2.254 1.043,-3.608 0,-1.244 -0.288,-2.356 -0.865,-3.334 -0.576,-0.979 -1.431,-1.77 -2.565,-2.374 z"
            fill="black"
            transform="matrix(1.3333333,0,0,-1.3333333,408.9624,460.7576)"
          />
          {/* Path 11 - I */}
          <path
            d="m 331.281,66.046 h -8.507 v 19.208 h 8.507 z"
            fill="black"
            transform="matrix(1.3333333,0,0,-1.3333333,0,566.92933)"
          />
          {/* Path 12 - T */}
          <path
            d="m 0,0 h -8.507 v 12.486 h -5.899 v 6.722 H 5.9 V 12.486 H 0 Z"
            fill="black"
            transform="matrix(1.3333333,0,0,-1.3333333,464.57467,478.8684)"
          />
        </g>
      </mask>
    </defs>
  );
}

export default function AnimatedSvgThree() {
  return (
    <div className="relative w-full mx-auto bg-transparent aspect-[203.974/56.025726] max-w-full">
      <div className="absolute inset-0">
        <Canvas
          style={{ width: "100%", height: "100%" }}
          camera={{
            position: [0, 0, 5],
            aspect: 203.974 / 56.025726,
          }}
          gl={{ alpha: true }}
        >
          <color attach="background" args={["transparent"]} />
          <AnimatedLogo />
        </Canvas>
      </div>

      <svg
        className="absolute inset-0"
        viewBox="0 0 203.974 56.025726"
        preserveAspectRatio="xMidYMid slice"
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        <LogoMaskPath />
        <rect
          width="100%"
          height="110%"
          fill="white"
          mask="url(#logoMask)"
          style={{ shapeRendering: "crispEdges" }}
        />
      </svg>
    </div>
  );
}
