import {
  getPortraitsContent,
  getShoesContent,
  getWoodWorkContent,
  getVehiclesContent,
  getBallsContent,
  getControllersContent,
  getMiscContent,
} from "@/app/lib/contentful/api";
import { GalleryContentContextProvider } from "../lib/context/galleryContextProvider";
import { ArtworkCategoryType } from "../lib/types";
import type React from "react";

export default async function galleryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const allArt = await getGalleryContent();

  const [portraitsData, shoesData, woodWorkData, ballsData, vehiclesData, controllersData, miscData] = await Promise.all([
    getPortraitsContent(),
    getShoesContent(),
    getWoodWorkContent(),
    getBallsContent(),
    getVehiclesContent(),
    getControllersContent(),
    getMiscContent(),
  ]);

  function transformData(data: ArtworkCategoryType["items"]) {
    return data.map((item) => item.fields.art.fields);
  }
  const portraits = transformData(portraitsData);
  const shoes = transformData(shoesData);
  const woodWork = transformData(woodWorkData);
  const balls = transformData(ballsData);
  const vehicles = transformData(vehiclesData);
  const controllers = transformData(controllersData);
  const misc = transformData(miscData);
  
  return (
    <GalleryContentContextProvider
      // allArtWork={allArt}
      portraits={portraits}
      shoes={shoes}
      woodWork={woodWork}
      balls={balls}
      vehicles={vehicles}
      controllers={controllers}
      misc={misc}
    >
      {children}
    </GalleryContentContextProvider>
  );
}
