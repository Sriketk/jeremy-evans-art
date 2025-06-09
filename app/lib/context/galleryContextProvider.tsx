"use client";
import { createContext, ReactNode } from "react";

export const GalleryContent = createContext<any>(null);

export const GalleryContentContextProvider = ({
  allArtWork,
  portraits,
  shoes,
  woodWork,
  vehicles,
  sports,
  controllers,
  misc,
  children,
}: {
  allArtWork: any;
  portraits: any;
  shoes: any;
  woodWork: any;
  vehicles: any;
  sports: any;
  controllers:any;
  misc:any;
  children: ReactNode;
}) => {
  return (
    <GalleryContent.Provider
      value={{ allArtWork, portraits, shoes, woodWork, vehicles, sports, controllers, misc }}
    >
      {children}
    </GalleryContent.Provider>
  );
};
