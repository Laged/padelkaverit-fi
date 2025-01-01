import { FC } from "react";
import { PadelKaverit } from "./atoms/PadelKaverit";

const HeroSection: FC = () => {
  return (
    <section className="fixed inset-0 w-screen h-screen overflow-hidden bg-main dark:bg-background transition-colors duration-500">
      <div className="w-full h-full flex items-center justify-center p-4">
        <PadelKaverit />
      </div>
    </section>
  );
};

export default HeroSection;
