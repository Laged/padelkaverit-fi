"use client";
import { FC, PropsWithChildren, useRef } from "react";

const FullScreenSection: FC<PropsWithChildren> = ({ children }) => {
  const ref = useRef(null);
  return (
    <div
      ref={ref}
      className="min-h-screen w-full h-full flex items-center justify-center"
    >
      {children}
    </div>
  );
};

export default FullScreenSection;
