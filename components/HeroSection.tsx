import Image from "next/image";
import { FC } from "react";

const HeroSection: FC = () => {
  return (
    <section className="flex flex-col md:flex-row bg-background">
      {/* Logo */}
      <div className="flex-1 flex items-center justify-center h-screen">
        <Image
          src="/images/padelkaverit.svg"
          alt="Padelkaverit"
          width={400}
          height={100}
          className="mx-auto"
          priority
        />
      </div>
      {/* Illustration */}
      <div className="flex-1 flex items-center justify-center h-screen">
        <Image
          src="/images/illustration.svg"
          alt="Illustration"
          width={400}
          height={400}
          className="mx-auto"
          priority
        />
      </div>
    </section>
  );
};

export default HeroSection;
