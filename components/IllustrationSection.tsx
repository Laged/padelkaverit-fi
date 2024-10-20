// components/IllustrationSection.tsx

import Image from "next/image";
import { FC } from "react";

const IllustrationSection: FC = () => {
  return (
    <>
      {/* Desktop Illustration - Sticky on left side */}
      <div className="hidden md:block md:sticky md:top-0 md:h-screen md:w-1/2 p-12">
        <div className="relative h-full w-full max-w-md mx-auto">
          <Image
            src="/images/illustration.svg"
            alt="Illustration"
            layout="fill"
            objectFit="contain"
            className="invert-dark"
            priority
          />
        </div>
      </div>

      {/* Mobile Illustration - Full Screen Height */}
      <div className="flex h-screen items-center justify-center md:hidden p-8">
        <div className="relative h-full w-full max-w-md mx-auto">
          <Image
            src="/images/illustration.svg"
            alt="Illustration"
            width={800}
            height={800}
            objectFit="contain"
            className="invert-dark"
            priority
          />
        </div>
      </div>
    </>
  );
};

export default IllustrationSection;
