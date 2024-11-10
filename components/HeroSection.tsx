import { FC } from "react";
import DarkModeToggle from "@/components/DarkModeToggle";
import AnimatedSvg from "@/components/atoms/AnimatedSvg";

const HeroSection: FC = () => {
  return (
    <section className="flex min-h-screen w-full bg-main dark:bg-background transition-colors duration-500 flex flex-col items-center justify-center relative p-4">
      <div className="absolute top-4 right-4">
        <DarkModeToggle />
      </div>
      <div className="w-full h-full">
        <AnimatedSvg />
      </div>
    </section>
  );
};

export default HeroSection;
