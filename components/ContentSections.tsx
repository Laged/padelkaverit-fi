// components/ContentSections.tsx
"use client";
import { FC, useRef, useEffect, useState } from "react";
import ContentCard from "./ContentCard";

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
  const [activeColor, setActiveColor] = useState(
    sections[0]?.initialColor || "var(--color-primary-a40)"
  );

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const target = entry.target as HTMLElement;
          const color =
            target.getAttribute("data-active-color") ||
            "var(--color-primary-a40)";
          setActiveColor(color);
        }
      });
    };

    const options = {
      threshold: 0.5,
    };

    sections.forEach((_, index) => {
      const section = document.getElementById(`content-card-${index}`);
      if (section) {
        const observer = new IntersectionObserver(handleIntersection, options);
        observer.observe(section);
        observers.push(observer);
      }
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, [sections]);

  return (
    <section
      className="md:w-1/2 bg-dotted transition-colors duration-1000"
      style={{
        color: activeColor,
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
