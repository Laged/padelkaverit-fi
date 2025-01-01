"use client";
import { Star as GeneratedStar } from "../generated/Star";
import { ReusableBackground } from "../ReusableBackground/ReusableBackground";
import { MaskPath } from "../Masks/LogoMaskPath";
import { config } from "../generated/StarMask";

export function Star() {
  return (
    <div className="w-full">
      <ReusableBackground maskId="starMask" config={config}>
        <MaskPath
          id="starMask"
          paths={config.paths}
          // If you need a base transform, you can add it here
          // baseTransform="translate(0,0)"
        />
      </ReusableBackground>
    </div>
  );
}
