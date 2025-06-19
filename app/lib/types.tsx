import { z } from "zod";

export interface HomePageContent {
  homePageImages: {
    fields: {
      title: string;
      artDescription: string;
      image: {
        fields: {
          file: {
            url: string;
          };
        };
      };
      year: string;
      category: string;
      slug: string;
      aboutThisWork: string;
    };
  }[];
}

export interface Artwork {
  title: string;
  description: string;
  image: string;
  year: number;
  category: string;
  slug: string;
  about: string;
  // relatedWork: any;
}

export const imageSchema = z.object({
  metadata: z.object({}),
  sys: z.object({}),
  fields: z.object({
    file: z.object({
      contentType: z.string(),
      details: z.object({}),
      fileName: z.string(),
      url: z.string(),
    }),
    title: z.string(),
    description: z.string(),
  }),
});



// Zod schemas for validation
export const ArtworkSchema = z.object({
  metadata: z.object({}),
  sys: z.object({}),
  fields: z.object({
    title: z.string(),
    year: z.number(),
    artDescription: z.string(),
    aboutThisWork: z.string().optional(),
    image: imageSchema,
  }),
})

export type ArtworkType = z.infer<typeof ArtworkSchema>;


export const ContentfulResponseSchema = z.object({
  metadata: z.object({}),
  sys: z.object({}),
  fields: z.object({
    name: z.string(),
    occupationDescription: z.string(),
    aboutWebsite: z.string(),
    homePageImages: z.array(ArtworkSchema),
  }),
});

// Type inference from schema
export type ContentfulResponse = z.infer<typeof ContentfulResponseSchema>;
