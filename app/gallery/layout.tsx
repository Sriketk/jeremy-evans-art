import {
  getPortraitsContent,
  getShoesContent,
  getGalleryContent,
  getWoodWorkContent,
  getVehiclesConent,
  getBallsContent,
  getControllersContent,
  getMiscContent,
} from "@/app/lib/contentful/api";
import { GalleryContentContextProvider } from "../lib/context/galleryContextProvider";
import { ArtworkCategoryType, ArtworkCategorySchema } from "../lib/types";

export default async function galleryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const allArt = await getGalleryContent();
  const portraitsData = await getPortraitsContent();
  const shoesData = await getShoesContent();
  const woodWorkData = await getWoodWorkContent();
  const ballsData = await getBallsContent();
  const vehiclesData = await getVehiclesConent();
  const controllersData = await getControllersContent();
  const miscData = await getMiscContent();


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
