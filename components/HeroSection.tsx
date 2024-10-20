// components/HeroSection.tsx

import Image from "next/image";
import { FC } from "react";

const HeroSection: FC = () => {
  return (
    <section className="flex h-screen items-center justify-center bg-background">
      <Image
        src="/images/padelkaverit.svg"
        alt="Padelkaverit Logo"
        width={800}
        height={200}
        className="invert-dark"
        priority
      />
    </section>
  );
};

export default HeroSection;
