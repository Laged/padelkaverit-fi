"use client";
import { FC } from "react";
import ContentCard from "./ContentCard";
import { useActiveColor } from "../hooks/useActiveColor"; // Import the hook

interface SectionData {
  title: string;
  content: string;
  initialColor: string;
  activeColor: string;
}

interface ContentSectionsProps {
  sections: SectionData[];
}

const ContentSections: FC<ContentSectionsProps> = ({ sections }) => {
  const activeColor = useActiveColor(sections);

  return (
    <section
      className="md:w-1/2 bg-dotted transition-colors duration-1000"
      style={{
        color: activeColor,
        backgroundImage: "radial-gradient(circle 20px, currentColor 20px, transparent 20px)",
        backgroundSize: "80px 80px",
        transition: "color 1s ease",
      }}
    >
      <div className="space-y-12 p-12">
        {sections.map((section, index) => (
          <div
            key={index}
            id={`content-card-${index}`}
            className="h-screen relative flex items-center justify-center"
            data-active-color={section.activeColor}
          >
            <ContentCard title={section.title}>{section.content}</ContentCard>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ContentSections;
