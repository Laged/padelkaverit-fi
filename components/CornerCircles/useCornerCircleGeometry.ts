import { useMemo } from "react";
import * as THREE from "three";

interface Corner {
  position: [number, number];
  color: [number, number, number];
}

interface Geometries {
  left: THREE.CircleGeometry;
  right: THREE.CircleGeometry;
}

interface ViewportConfig {
  fov?: number;
  z?: number;
  aspectRatio?: number;
  offset?: number;
}

export function useCornerCircleGeometry(config: ViewportConfig = {}) {
  const {
    fov = 75,
    z = 5,
    aspectRatio = 203.974 / 56.025726,
    offset = 0.0,
  } = config;

  return useMemo(() => {
    const height = 2 * Math.tan((fov * Math.PI) / 180 / 2) * z;
    const width = height * aspectRatio;
    const radius = width + offset;

    // Create geometries
    const leftGeo = new THREE.CircleGeometry(radius, 32);
    leftGeo.translate(2, 0, 0);

    const rightGeo = new THREE.CircleGeometry(radius, 32);
    rightGeo.translate(-2, 0, 0);

    // Define corners with positions and colors
    const corners: Corner[] = [
      {
        position: [-width / 2 - offset, height / 2 + offset],
        color: [1.0, 0.37, 0.1],
      },
      {
        position: [width / 2 + offset, height / 2 + offset],
        color: [0.54, 0.17, 0.89],
      },
      {
        position: [width / 2 + offset, -height / 2 - offset],
        color: [0.0, 1.0, 1.0],
      },
      {
        position: [-width / 2 - offset, -height / 2 - offset],
        color: [0.8, 1.0, 0.0],
      },
    ];

    return {
      corners,
      geometries: { left: leftGeo, right: rightGeo } as Geometries,
      dimensions: { width, height },
    };
  }, [fov, z, aspectRatio, offset]);
}
