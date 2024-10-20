// components/ContentSection.tsx

import { FC, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface ContentSectionProps {
  title: string;
  children: ReactNode;
  color: string
}

const ContentSection: FC<ContentSectionProps> = ({ title, color, children }) => {
  return (
    <section className="h-screen flex items-center justify-center p-4 md:p-12">
      <div className={`bg-background border-2  shadow-light p-8 max-w-md w-full`}>
        <h2 className="mb-6 font-heading text-6xl text-foreground">{title}</h2>
        <p className="font-base text-lg leading-relaxed text-foreground">{children}</p>
      </div>
    </section>
  );
};

export default ContentSection;
