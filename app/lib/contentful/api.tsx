import { createContentfulClient } from "./client";
import { HOME_PAGE_CONTENT_ID } from "./constants";

export async function getHomePageContent() {
  const client = await createContentfulClient();
  const entry = await client.getEntry(HOME_PAGE_CONTENT_ID);
  return entry.fields;
}