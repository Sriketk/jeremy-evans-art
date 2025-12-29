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

export async function getHomePageContent() {
  try {
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


export async function getPortraitsContent() {
  const client = await createContentfulClient();
  const entry = await client.getEntries({ content_type: PORTRAITS_CONTENT_ID, include: 3 });
  const validatedData = ArtworkCategorySchema.parse(entry);
  return validatedData.items;
}

export async function getShoesContent() {
  const client = await createContentfulClient();
  const entry = await client.getEntries({ content_type: SHOES_CONTENT_ID, include: 3 });
  const validatedData = ArtworkCategorySchema.parse(entry);
  return validatedData.items;
}

export async function getBallsContent() {
  const client = await createContentfulClient();
  const entry = await client.getEntries({ content_type: BALLS_CONTENT_ID, include: 3 });
  const validatedData = ArtworkCategorySchema.parse(entry);
  return validatedData.items;
}

export async function getVehiclesContent() {
  const client = await createContentfulClient();
  const entry = await client.getEntries({ content_type: VEHICLES_CONTENT_ID, include: 3 });
  const validatedData = ArtworkCategorySchema.parse(entry);
  return validatedData.items;
}

export async function getWoodWorkContent() {
  const client = await createContentfulClient();
  const entry = await client.getEntries({ content_type: WOODWORK_CONTENT_ID, include: 3 });
  const validatedData = ArtworkCategorySchema.parse(entry);
  return validatedData.items;
}

export async function getControllersContent() {
  const client = await createContentfulClient();
  const entry = await client.getEntries({
    content_type: CONTROLLERS_CONTENT_ID,
    include: 3,
  });
  const validatedData = ArtworkCategorySchema.parse(entry);
  return validatedData.items;
}

export async function getMiscContent() {
  const client = await createContentfulClient();
  const entry = await client.getEntries({ content_type: MISC_CONTENT_ID, include: 3 });
  const validatedData = ArtworkCategorySchema.parse(entry);
  return validatedData.items;
}

export async function getAboutPageContent() {
  const client = await createContentfulClient();
  const entry = await client.getEntry(ABOUT_PAGE_ID);
  const validatedData = AboutPageSchema.parse(entry);
  return validatedData;
}
