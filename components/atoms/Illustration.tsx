"use client";
import { ReusableBackground } from "../ReusableBackground/ReusableBackground";
import { MaskPath } from "../Masks/LogoMaskPath";
import { config as STAR_CONFIG } from "../generated/StarMask";
import { config as GOGOGO_CONFIG } from "../generated/GogogoMask";
import { config as HIMMELI_CONFIG } from "../generated/HimmeliMask";
import { config as SUPERDUPER_CONFIG } from "../generated/SuperduperMask";
import { config as TUNNUS_CONFIG } from "../generated/TunnusMask";
import { SVGConfig } from "../types";

interface MaskLayerProps {
  config: SVGConfig;
  maskId: string;
  delay: number;
}

const MaskLayer = ({ config, maskId, delay }: MaskLayerProps) => (
  <div key={maskId} className="absolute inset-4 mix-blend-multiply opacity-100">
    <ReusableBackground maskId={maskId} config={config} delay={delay}>
      <MaskPath
        id={maskId}
        paths={config.paths}
        baseTransform={config.baseTransform}
      />
    </ReusableBackground>
  </div>
);

const MASK_CONFIGS = [
  { config: TUNNUS_CONFIG, id: "tunnusMask" },
  { config: STAR_CONFIG, id: "starMask" },
  { config: GOGOGO_CONFIG, id: "gogogoMask" },
  { config: HIMMELI_CONFIG, id: "himmeliMask" },
  { config: SUPERDUPER_CONFIG, id: "superduperMask" },
];

export function Illustration() {
  const { viewBox } = MASK_CONFIGS[0].config;
  const aspectRatio = viewBox.width / viewBox.height;

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div
        className="relative w-full max-h-screen"
        style={{
          aspectRatio,
          maxWidth: `${100 * aspectRatio + 1}vh`,
        }}
      >
        {MASK_CONFIGS.map(({ config, id }, index) => (
          <MaskLayer key={id} config={config} maskId={id} delay={0.2 * index} />
        ))}
      </div>
    </div>
  );
}
