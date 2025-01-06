"use client";
import { ReusableBackground } from "../ReusableBackground/ReusableBackground";
import { MaskPath } from "../Masks/LogoMaskPath";
import { PADELKAVERIT_CONFIG } from "../Masks/logos/padelkaverit.config";

export function PadelKaverit() {
  return (
    <div className="w-full">
      <ReusableBackground
        maskId="padelkaveritMask"
        config={PADELKAVERIT_CONFIG}
      >
        <MaskPath
          id="padelkaveritMask"
          paths={PADELKAVERIT_CONFIG.paths}
          baseTransform={PADELKAVERIT_CONFIG.baseTransform}
        />
      </ReusableBackground>
    </div>
  );
}
