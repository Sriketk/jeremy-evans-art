import { createClient } from "contentful";

export async function createContentfulClient() {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_KEY || "",
    accessToken: process.env.CONTENTFUL_DELIVERY_KEY || "",
  });
  return client;
}

