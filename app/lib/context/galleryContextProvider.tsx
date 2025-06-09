"use client";
import { createContext, ReactNode } from "react";

export const GalleryContent = createContext<any>(null);

export const GalleryContentContextProvider = ({
  allArtWork,
  portraits,
  shoes,
  children,
}: {
  allArtWork: any;
  portraits: any;
  shoes: any;
  children: ReactNode;
}) => {
  return (
    <GalleryContent.Provider value={{ allArtWork, portraits, shoes }}>
      {children}
    </GalleryContent.Provider>
  );
};
