import { FC } from "react";
import { PadelKaverit } from "./atoms/PadelKaverit";
import { Illustration } from "./atoms/Illustration";

const HeroSection: FC = () => {
  return (
    <section className="fixed inset-0 w-screen overflow-y-auto">
      <div className="w-full h-full flex flex-col px-4">
        <div className="min-h-screen w-full h-full flex items-center justify-center">
          <PadelKaverit />
        </div>
        <div className="min-h-screen w-full h-full flex items-center justify-center">
          <Illustration />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
