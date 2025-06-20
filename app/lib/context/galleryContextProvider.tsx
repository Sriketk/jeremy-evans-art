"use client";
import { createContext, ReactNode } from "react";
import { ArtworkType } from "../types";

export const GalleryContent = createContext<any>(null);

export const GalleryContentContextProvider = ({
  // allArtWork,
  portraits,
  shoes,
  woodWork,
  vehicles,
  balls,
  controllers,
  misc,
  children,
}: {
  // allArtWork: any;
  portraits: ArtworkType["fields"][];
  shoes: ArtworkType["fields"][];
  woodWork: ArtworkType["fields"][];
  vehicles: ArtworkType["fields"][];
  balls: ArtworkType["fields"][];
  controllers: ArtworkType["fields"][];
  misc: ArtworkType["fields"][];
  children: ReactNode;
}) => {
  return (
    <GalleryContent.Provider
      value={{ portraits, shoes, woodWork, vehicles, balls, controllers, misc }}
    >
      {children}
    </GalleryContent.Provider>
  );
};
