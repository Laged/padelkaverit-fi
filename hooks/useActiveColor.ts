import { useEffect, useState } from "react";

interface SectionData {
  initialColor: string;
  activeColor: string;
}

const colorRotation = [
  "var(--color-primary-a40)", // Orange
  "var(--electric-lime)",     // Lime
  "var(--electric-purple)",   // Purple
];

export const useActiveColor = (sections: SectionData[]) => {
  const [activeColor, setActiveColor] = useState<string | undefined>("var(--background)");

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const targetIndex = Number(entry.target.getAttribute("data-index"));
          const newColor = colorRotation[targetIndex % colorRotation.length];
          setActiveColor(newColor);
        }
      });
    };

    const options = {
      threshold: 0.8,
    };

    sections.forEach((_, index) => {
      const section = document.getElementById(`content-card-${index}`);
      if (section) {
        section.setAttribute("data-index", String(index));
        const observer = new IntersectionObserver(handleIntersection, options);
        observer.observe(section);
        observers.push(observer);
      }
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, [sections]);

  return activeColor;
};
