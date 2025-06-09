import {
  getPortraitsContent,
  getShoesContent,
  getGalleryContent,
} from "@/app/lib/contentful/api";
import { GalleryContentContextProvider } from "../lib/context/galleryContextProvider";

export default async function galleryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const allArt = await getGalleryContent();
  const portraitsData = await getPortraitsContent();
  const shoesData = await getShoesContent();

  function transformData(data: any[]) {
    const transformedData: Record<
      string,
      {
        title: string;
        artDescription: string;
        url: string;
        year: number;
        aboutThisWork: string;
      }
    > = {};

    data.forEach((image) => {
      const art = image.fields.art.fields;
      const key = art.title;
      const transformed_key = key
        .replace(/\s+/g, "_") // Replace one or more whitespace characters with underscore
        .toLowerCase();
      transformedData[transformed_key] = {
        title: art.title,
        artDescription: art.artDescription,
        url: art.image.fields.file.url,
        year: art.year,
        aboutThisWork: art.aboutThisWork,
      };
    });

    return transformedData;
  }
  const portraits = transformData(portraitsData);
  const shoes = transformData(shoesData);

  return (
    <GalleryContentContextProvider
      allArtWork={allArt}
      portraits={portraits}
      shoes={shoes}
    >
      {children}
    </GalleryContentContextProvider>
  );
}
