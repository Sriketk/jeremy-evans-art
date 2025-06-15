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

// TRICKING NEXT JS INTO NOT CACHING 
export async function getHomePageContent() {
  await fetch("https://example.com/trigger", { cache: "no-store" });
  const client = await createContentfulClient();
  const entry = await client.getEntry(HOME_PAGE_CONTENT_ID);
  return entry.fields;
}

export async function getGalleryContent() {
  await fetch("https://example.com/trigger", { cache: "no-store" });
  const client = await createContentfulClient();
  const entry = await client.getEntries({ content_type: GALLERY_CONTENT_ID });
  return entry.items;
}

export async function getPortraitsContent() {
  await fetch("https://example.com/trigger", { cache: "no-store" });
  const client = await createContentfulClient();
  const entry = await client.getEntries({ content_type: PORTRAITS_CONTENT_ID });
  return entry.items;
}

export async function getShoesContent() {
  await fetch("https://example.com/trigger", { cache: "no-store" });
  const client = await createContentfulClient();
  const entry = await client.getEntries({ content_type: SHOES_CONTENT_ID });
  return entry.items;
}

export async function getBallsContent() {
  await fetch("https://example.com/trigger", { cache: "no-store" });
  const client = await createContentfulClient();
  const entry = await client.getEntries({ content_type: BALLS_CONTENT_ID });
  return entry.items;
}

export async function getVehiclesConent() {
  await fetch("https://example.com/trigger", { cache: "no-store" });
  const client = await createContentfulClient();
  const entry = await client.getEntries({ content_type: VEHICLES_CONTENT_ID });
  return entry.items;
}

export async function getWoodWorkContent() {
  await fetch("https://example.com/trigger", { cache: "no-store" });
  const client = await createContentfulClient();
  const entry = await client.getEntries({ content_type: WOODWORK_CONTENT_ID });
  return entry.items;
}

export async function getControllersContent() {
  await fetch("https://example.com/trigger", { cache: "no-store" });
  const client = await createContentfulClient();
  const entry = await client.getEntries({
    content_type: CONTROLLERS_CONTENT_ID,
  });
  return entry.items;
}

export async function getMiscContent() {
  await fetch("https://example.com/trigger", { cache: "no-store" });
  const client = await createContentfulClient();
  const entry = await client.getEntries({ content_type: MISC_CONTENT_ID });
  return entry.items;
}

export async function getAboutPageContent() {
  await fetch("https://example.com/trigger", { cache: "no-store" });
  const client = await createContentfulClient();
  const entry = await client.getEntry(ABOUT_PAGE_ID);
  return entry.fields;
}
