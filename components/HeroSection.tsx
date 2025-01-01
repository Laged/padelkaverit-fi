import { FC } from "react";
import { PadelKaverit } from "./atoms/PadelKaverit";
import { Illustration } from "./atoms/Illustration";

const HeroSection: FC = () => {
  return (
    <section className="fixed inset-0 w-screen bg-main dark:bg-background transition-colors duration-500 px-4 md:px-8 overflow-y-auto md:overflow-hidden">
      <div className="min-h-screen w-full flex flex-col md:flex-row md:h-full">
        {/* First block */}
        <div className="w-full md:w-1/2 min-h-screen md:h-full flex items-center justify-center relative border-0 border-red-500">
          <PadelKaverit />
        </div>

        {/* Second block */}
        <div className="w-full md:w-1/2 min-h-screen md:h-full flex items-center justify-center relative border-0 border-blue-500">
          <Illustration />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
