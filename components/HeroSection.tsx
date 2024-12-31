import { FC } from "react";
import DarkModeToggle from "@/components/DarkModeToggle";
import AnimatedSvgThree from "./atoms/AnimatedSvgThree";

const HeroSection: FC = () => {
  return (
    <section className="fixed inset-0 w-screen h-screen overflow-hidden bg-main dark:bg-background transition-colors duration-500">
      <div className="absolute top-4 right-4 z-10">
        <DarkModeToggle />
      </div>
      <div className="w-full h-full flex items-center justify-center p-4">
        <AnimatedSvgThree />
      </div>
    </section>
  );
};

export default HeroSection;
