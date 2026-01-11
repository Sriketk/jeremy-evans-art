import { z } from "zod";

export interface Artwork {
  title: string;
  description: string;
  image: string;
  year: number;
  category: string;
  slug: string;
  about: string;
  width: number;
  height: number;
}

export const imageSchema = z.object({
  metadata: z.object({}),
  sys: z.object({}),
  fields: z.object({
    file: z.object({
      contentType: z.string(),
      details: z.object({
        size: z.number(),
        image: z.object({
          width: z.number(),
          height: z.number(),
        }),
      }),
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
    angles: z.array(z.object({
      fields: z.object({
        title: z.string(),
        year: z.number(),
        artDescription: z.string(),
        aboutThisWork: z.string().optional(),
        image: imageSchema,
      }).optional(),
    }).optional()).optional(),
  }),
});

export type ArtworkType = z.infer<typeof ArtworkSchema>;

export const HomePageSchema = z.object({
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
export type HomePageType = z.infer<typeof HomePageSchema>;

export const ArtworkCategorySchema = z.object({
  includes: z.object({}),
  items: z.array(
    z.object({
      fields: z.object({
        title: z.string(),
        art: ArtworkSchema,
      }),
    })
  ),
  limit: z.number(),
  skip: z.number(),
  sys: z.object({}),
  total: z.number(),
});

export type ArtworkCategoryType = z.infer<typeof ArtworkCategorySchema>;

export const TimeLineEventSchema = z.object({
  metadata: z.object({}),
  sys: z.object({}),
  fields: z.object({
    year: z.number(),
    title: z.string(),
    description: z.string(),
    image: imageSchema,
    details: z.array(z.string()),
  }),
});

export type TimeLineEventType = z.infer<typeof TimeLineEventSchema>;

export const AboutPageSchema = z.object({
  metadata: z.object({}),
  sys: z.object({}),
  fields: z.object({
    jeremyEvansPicture: imageSchema,
    about: z.string(),
    timelineEvents: z.array(TimeLineEventSchema),
    name: z.string(),
    artistStatement: z.string(),
  }),
});

export type AboutPageType = z.infer<typeof AboutPageSchema>;
