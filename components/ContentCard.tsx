// components/ContentCard.tsx
import { FC, ReactNode } from "react";

interface ContentCardProps {
  title: string;
  children: ReactNode;
}

const ContentCard: FC<ContentCardProps> = ({ title, children }) => {
  return (
    <div className="border-2 border-foreground shadow-light p-8 max-w-md w-full space-y-6 bg-background">
      <h2 className="font-heading text-4xl text-foreground">{title}</h2>
      <p className="font-base text-lg leading-relaxed text-foreground">{children}</p>
    </div>
  );
};

export default ContentCard;
