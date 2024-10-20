"use client";
import Image from "next/image";
import { FC } from "react";

const IllustrationSection: FC = () => {

  return (
    <>
      {/* Desktop Illustration with Full Screen Background and Centered Sticker */}
      <div
        className="hidden md:flex md:sticky md:top-0 md:h-screen md:w-1/2 items-center justify-center bg-background"
      >
        <div
          className="relative w-full max-w-md p-8 border-4 border-black rounded-lg shadow-sticker"
          style={{
            boxShadow: `10px 10px 0px 0px #000000`,
            borderColor: "#000000",
          }}
        >
          <Image
            src="/images/illustration.svg"
            alt="Illustration"
            className="invert-dark"
            width={800}
            height={800}
            priority
          />
        </div>
      </div>

      {/* Mobile Illustration with Full Screen Background and Centered Sticker */}
      <div
        className="flex h-screen items-center justify-center md:hidden p-4 bg-background" // Added padding here
      >
        <div
          className="relative w-full max-w-md p-8 border-4 border-black rounded-lg shadow-sticker"
          style={{
            boxShadow: "10px 10px 0px 0px #000000", // Sticker-like bold shadow
            borderColor: "#000000",
          }}
        >
          <Image
            src="/images/illustration.svg"
            alt="Illustration"
            width={800}
            height={800}
            className="invert-dark"
            priority
          />
        </div>
      </div>
    </>
  );
};

export default IllustrationSection;
