import { createContentfulClient } from "./client";
import {
  HOME_PAGE_CONTENT_ID,
  GALLERY_CONTENT_ID,
  PORTRAITS_CONTENT_ID,
  SHOES_CONTENT_ID,
  ABOUT_PAGE_ID,
  BALLS_CONTENT_ID,
  VEHICLES_CONTENT_ID,
  WOODWORK_CONTENT_ID,
  CONTROLLERS_CONTENT_ID,
  MISC_CONTENT_ID,
} from "./constants";
import { HomePageSchema, ArtworkCategorySchema, AboutPageSchema } from "../types";

// TRICKING NEXT JS INTO NOT CACHING 
export async function getHomePageContent() {
  try {
    await fetch("https://example.com/trigger", { cache: "no-store" });
    const client = await createContentfulClient();
    const entry = await client.getEntry(HOME_PAGE_CONTENT_ID);
    const validatedData = HomePageSchema.parse(entry);
    return validatedData;
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error fetching home page content:", error.message);
    }
    throw error; // Re-throw to be handled by error boundary
  }
}

//NOT GETTING USED; DONT NEED ALL THE ART AT ONCE JUST FETCHING SEPERATELY
export async function getGalleryContent() {
  await fetch("https://example.com/trigger", { cache: "no-store" });
  const client = await createContentfulClient();
  const entry = await client.getEntries({ content_type: GALLERY_CONTENT_ID });
  return entry.items;
}

export async function getPortraitsContent() {
  await fetch("https://example.com/trigger", { cache: "no-store" });
  const client = await createContentfulClient();
  const entry = await client.getEntries({ content_type: PORTRAITS_CONTENT_ID, include: 3 });
  const validatedData = ArtworkCategorySchema.parse(entry);
  return validatedData.items;
}

export async function getShoesContent() {
  await fetch("https://example.com/trigger", { cache: "no-store" });
  const client = await createContentfulClient();
  const entry = await client.getEntries({ content_type: SHOES_CONTENT_ID });
  const validatedData = ArtworkCategorySchema.parse(entry);
  return validatedData.items;
}

export async function getBallsContent() {
  await fetch("https://example.com/trigger", { cache: "no-store" });
  const client = await createContentfulClient();
  const entry = await client.getEntries({ content_type: BALLS_CONTENT_ID });
  const validatedData = ArtworkCategorySchema.parse(entry);
  return validatedData.items;
}

export async function getVehiclesContent() {
  await fetch("https://example.com/trigger", { cache: "no-store" });
  const client = await createContentfulClient();
  const entry = await client.getEntries({ content_type: VEHICLES_CONTENT_ID });
  const validatedData = ArtworkCategorySchema.parse(entry);
  return validatedData.items;
}

export async function getWoodWorkContent() {
  await fetch("https://example.com/trigger", { cache: "no-store" });
  const client = await createContentfulClient();
  const entry = await client.getEntries({ content_type: WOODWORK_CONTENT_ID });
  const validatedData = ArtworkCategorySchema.parse(entry);
  return validatedData.items;
}

export async function getControllersContent() {
  await fetch("https://example.com/trigger", { cache: "no-store" });
  const client = await createContentfulClient();
  const entry = await client.getEntries({
    content_type: CONTROLLERS_CONTENT_ID,
  });
  const validatedData = ArtworkCategorySchema.parse(entry);
  return validatedData.items;
}

export async function getMiscContent() {
  await fetch("https://example.com/trigger", { cache: "no-store" });
  const client = await createContentfulClient();
  const entry = await client.getEntries({ content_type: MISC_CONTENT_ID });
  const validatedData = ArtworkCategorySchema.parse(entry);
  return validatedData.items;
}

export async function getAboutPageContent() {
  await fetch("https://example.com/trigger", { cache: "no-store" });
  const client = await createContentfulClient();
  const entry = await client.getEntry(ABOUT_PAGE_ID);
  const validatedData = AboutPageSchema.parse(entry);
  return validatedData;
}
