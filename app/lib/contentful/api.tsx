import { createContentfulClient } from "./client";
import { HOME_PAGE_CONTENT_ID, GALLERY_CONTENT_ID, PORTRAITS_CONTENT_ID, SHOES_CONTENT_ID} from "./constants";

export async function getHomePageContent() {
  const client = await createContentfulClient();
  const entry = await client.getEntry(HOME_PAGE_CONTENT_ID);
  return entry.fields;
}

export async function getGalleryContent() {
  const client = await createContentfulClient();
  const entry = await client.getEntries({'content_type': GALLERY_CONTENT_ID});
  return entry.items;
}

export async function getPortraitsContent(){
  const client = await createContentfulClient();
  const entry = await client.getEntries({'content_type': PORTRAITS_CONTENT_ID});
  return entry.items;
}

export async function getShoesContent(){
  const client = await createContentfulClient();
  const entry = await client.getEntries({'content_type': SHOES_CONTENT_ID});
  return entry.items;
}




