"use client";
import Image from "next/image";
import { FC } from "react";
import { useActiveColor } from "../hooks/useActiveColor";
import GoodVibes from "./GoodVibes";

const sections = [
  { initialColor: "var(--color-primary-a40)", activeColor: "var(--electric-lime)" },
  { initialColor: "var(--electric-lime)", activeColor: "var(--electric-purple)" },
  { initialColor: "var(--electric-purple)", activeColor: "var(--color-primary-a40)" },
];

const IllustrationSection: FC = () => {
  const activeColor = useActiveColor(sections); // Use the shared hook

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
            src="/images/illustration_notext.svg"
            alt="Illustration"
            className="invert-dark"
            width={800}
            height={800}
            priority
          />
          <GoodVibes color={activeColor}/>
        </div>
      </div>

      {/* Mobile Illustration with Full Screen Background and Centered Sticker */}
      <div
        className="flex h-screen items-center justify-center md:hidden"
        style={{
          backgroundColor: activeColor, // Dynamically update the background color
        }}
      >
        <div
          className="relative w-full max-w-md p-8 border-4 border-black rounded-lg shadow-sticker"
          style={{
            boxShadow: "10px 10px 0px 0px #000000", // Sticker-like bold shadow
            borderColor: "#000000",
          }}
        >
          <Image
            src="/images/illustration_notext.svg"
            alt="Illustration"
            width={800}
            height={800}
            className="invert-dark"
            priority
          />
          <GoodVibes color={activeColor} /> {/* Pass the activeColor */}
        </div>
      </div>
    </>
  );
};

export default IllustrationSection;
