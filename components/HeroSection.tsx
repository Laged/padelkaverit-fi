import { FC } from "react";
import { PadelKaverit } from "./atoms/PadelKaverit";
import { Illustration } from "./atoms/Illustration";
import FullScreenSection from "./atoms/FullScreenSection";

const HeroSection: FC = () => {
  return (
    <section className="fixed inset-0 w-screen overflow-y-auto">
      <div className="w-full h-full flex flex-col px-4">
        <FullScreenSection>
          <PadelKaverit />
        </FullScreenSection>
        <FullScreenSection>
          <Illustration />
        </FullScreenSection>
      </div>
    </section>
  );
};

export default HeroSection;
