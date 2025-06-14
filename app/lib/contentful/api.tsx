import { createContentfulClient } from "./client";
import {
  HOME_PAGE_CONTENT_ID,
  GALLERY_CONTENT_ID,
  PORTRAITS_CONTENT_ID,
  SHOES_CONTENT_ID,
  ABOUT_PAGE_ID,
  SPORTS_CONTENT_ID,
  VEHICLES_CONTENT_ID,
  WOODWORK_CONTENT_ID,
  CONTROLLERS_CONTENT_ID,
  MISC_CONTENT_ID
} from "./constants";

export async function getHomePageContent() {
  const client = await createContentfulClient();
  const entry = await client.getEntry(HOME_PAGE_CONTENT_ID);
  return entry.fields;
}

export async function getGalleryContent() {
  const client = await createContentfulClient();
  const entry = await client.getEntries({ content_type: GALLERY_CONTENT_ID });
  return entry.items;
}

export async function getPortraitsContent() {
  const client = await createContentfulClient();
  const entry = await client.getEntries({ content_type: PORTRAITS_CONTENT_ID });
  return entry.items;
}

export async function getShoesContent() {
  const client = await createContentfulClient();
  const entry = await client.getEntries({ content_type: SHOES_CONTENT_ID });
  return entry.items;
}

export async function getSportsContent() {
  const client = await createContentfulClient();
  const entry = await client.getEntries({ content_type: SPORTS_CONTENT_ID });
  return entry.items;
}

export async function getVehiclesConent() {
  const client = await createContentfulClient();
  const entry = await client.getEntries({ content_type: VEHICLES_CONTENT_ID });
  return entry.items;
}

export async function getWoodWorkContent() {
  const client = await createContentfulClient();
  const entry = await client.getEntries({ content_type: WOODWORK_CONTENT_ID });
  return entry.items;
}

export async function getControllersContent() {
  const client = await createContentfulClient();
  const entry = await client.getEntries({ content_type: CONTROLLERS_CONTENT_ID });
  return entry.items;
}

export async function getMiscContent() {
  const client = await createContentfulClient();
  const entry = await client.getEntries({ content_type: MISC_CONTENT_ID });
  return entry.items;
}

export async function getAboutPageContent() {
  const client = await createContentfulClient();
  const entry = await client.getEntry(ABOUT_PAGE_ID);
  return entry.fields;
}

