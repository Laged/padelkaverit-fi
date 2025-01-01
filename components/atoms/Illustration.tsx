"use client";
import { ReusableBackground } from "../ReusableBackground/ReusableBackground";
import { MaskPath } from "../Masks/LogoMaskPath";
import { config as STAR_CONFIG } from "../generated/StarMask";
import { config as GOGOGO_CONFIG } from "../generated/GogogoMask";
import { config as GOODVIBES_CONFIG } from "../generated/GoodvibesMask";
import { config as HIMMELI_CONFIG } from "../generated/HimmeliMask";
import { config as SUPERDUPER_CONFIG } from "../generated/SuperduperMask";
import { config as VIBES_CONFIG } from "../generated/VibesMask";
import { config as UNDEFINED_CONFIG } from "../generated/UndefinedMask";
import { config as TUNNUS_CONFIG } from "../generated/TunnusMask";
import { SVGConfig } from "../types";

interface MaskLayerProps {
  config: SVGConfig;
  maskId: string;
  delay: number;
}

const MaskLayer = ({ config, maskId, delay }: MaskLayerProps) => (
  <ReusableBackground maskId={maskId} config={config} delay={delay}>
    <MaskPath
      id={maskId}
      paths={config.paths}
      baseTransform={config.baseTransform}
    />
  </ReusableBackground>
);

const MASK_CONFIGS = [
  { config: TUNNUS_CONFIG, id: "tunnusMask" },
  { config: STAR_CONFIG, id: "starMask" },
  { config: GOGOGO_CONFIG, id: "gogogoMask" },
  { config: GOODVIBES_CONFIG, id: "goodvibesMask" },
  { config: HIMMELI_CONFIG, id: "himmeliMask" },
  { config: SUPERDUPER_CONFIG, id: "superduperMask" },
  { config: VIBES_CONFIG, id: "vibesMask" },
  { config: UNDEFINED_CONFIG, id: "undefinedMask" },
];

export function Illustration() {
  const { viewBox } = MASK_CONFIGS[0].config;
  const aspectRatio = viewBox.width / viewBox.height;

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div
        className="w-[100%] max-w-4xl relative"
        style={{
          aspectRatio: `${aspectRatio}`,
        }}
      >
        {MASK_CONFIGS.map(({ config, id }, index) => (
          <div
            key={id}
            className="absolute inset-0 mix-blend-multiply opacity-100"
          >
            <MaskLayer config={config} maskId={id} delay={0.2 * index} />
          </div>
        ))}
      </div>
    </div>
  );
}
