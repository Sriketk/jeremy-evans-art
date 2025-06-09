"use client";

import { useContext } from "react";
import Link from "next/link";
import Image from "next/image";
import { Artwork, HomePageContent } from "@/app/lib/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getGalleryContent } from "@/app/lib/contentful/api";
import { GalleryContent } from "@/app/lib/context/galleryContextProvider";

function contentMapping(rawContent: any) {
  const resultArray: Artwork[] = [];
  rawContent.forEach((image:any) => {
    resultArray.push({
      title: image.fields.title,
      description: image.fields.artDescription,
      image: image.fields.image.fields.file.url,
      year: image.fields.year,
      category: "Portraits",
      slug: image.fields.title
        .replace(/\s+/g, "_") // Replace one or more whitespace characters with underscore
        .toLowerCase(),
      about: image.fields.aboutThisWork,
    });
  });
  return resultArray;
}

function categoryArtMapping(rawContent: any) {
  const resultArray: Artwork[] = [];
  Object.values(rawContent).forEach((artwork:any) => {
    resultArray.push({
      title: artwork.title,
      description: artwork.artDescription,
      image: artwork.url,
      year: artwork.year,
      category: "Portraits",
      slug: artwork.title
        .replace(/\s+/g, "_") // Replace one or more whitespace characters with underscore
        .toLowerCase(),
      about: artwork.aboutThisWork,
    });
  });
  return resultArray;
}

export default function GalleryPage() {
  const galleryContent = useContext(GalleryContent);
  const allArt = galleryContent.allArtWork;
  const portraits = galleryContent.portraits;
  const shoes = galleryContent.shoes;

  console.log(allArt);
  console.log(portraits);
  console.log(shoes);
  const allArtwork: Artwork[] = contentMapping(allArt);
  const shoeDisplay: Artwork[] = categoryArtMapping(shoes);
  const portraitDisplay: Artwork[] = categoryArtMapping(portraits);
  console.log(portraitDisplay);
  console.log(shoeDisplay);

  console.log(galleryContent);
  return (
    <div className="min-h-screen bg-white">
      <div className="container px-4 py-16 mx-auto max-w-6xl">
        <h1 className="text-3xl font-light text-gray-900">Gallery</h1>
        <p className="mt-2 text-lg text-gray-500">
          A collection of selected works
        </p>

        <Tabs defaultValue="all" className="w-full mt-12">
          <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent mb-12">
            <TabsTrigger
              value="all"
              className="rounded-none border-0 border-b-2 border-transparent data-[state=active]:border-gray-900 data-[state=active]:bg-transparent text-gray-500 data-[state=active]:text-gray-900 pb-2"
            >
              All Work
            </TabsTrigger>
            <TabsTrigger
              value="painting"
              className="rounded-none border-0 border-b-2 border-transparent data-[state=active]:border-gray-900 data-[state=active]:bg-transparent text-gray-500 data-[state=active]:text-gray-900 pb-2"
            >
              Painting
            </TabsTrigger>
            <TabsTrigger
              value="shoe"
              className="rounded-none border-0 border-b-2 border-transparent data-[state=active]:border-gray-900 data-[state=active]:bg-transparent text-gray-500 data-[state=active]:text-gray-900 pb-2"
            >
              Shoes
            </TabsTrigger>
            <TabsTrigger
              value="mixed-media"
              className="rounded-none border-0 border-b-2 border-transparent data-[state=active]:border-gray-900 data-[state=active]:bg-transparent text-gray-500 data-[state=active]:text-gray-900 pb-2"
            >
              Mixed Media
            </TabsTrigger>
            <TabsTrigger
              value="digital"
              className="rounded-none border-0 border-b-2 border-transparent data-[state=active]:border-gray-900 data-[state=active]:bg-transparent text-gray-500 data-[state=active]:text-gray-900 pb-2"
            >
              Digital
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-0">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
              {allArtwork.map((artwork) => (
                <ArtworkCard key={artwork.title} artwork={artwork} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="painting" className="mt-0">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
              {portraitDisplay.map((potrait) => (
                <ArtworkCard key={potrait.title} artwork={potrait} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="shoe" className="mt-0">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
              {shoeDisplay.map((shoe) => (
                <ArtworkCard key={shoe.title} artwork={shoe} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="mixed-media" className="mt-0">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
              {allArtwork
                .filter((artwork) => artwork.category === "Mixed Media")
                .map((artwork) => (
                  <ArtworkCard key={artwork.title} artwork={artwork} />
                ))}
            </div>
          </TabsContent>

          <TabsContent value="digital" className="mt-0">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
              {allArtwork
                .filter((artwork) => artwork.category === "Digital")
                .map((artwork) => (
                  <ArtworkCard key={artwork.title} artwork={artwork} />
                ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

function ArtworkCard({ artwork }: { artwork: Artwork }) {
  return (
    <Link href={`/gallery/${artwork.slug}`} className="group">
      <div className="overflow-hidden">
        <div className="relative aspect-square">
          <Image
            src={artwork.image || "/placeholder.svg"}
            alt={artwork.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        <div className="mt-3">
          <h3 className="text-base font-medium text-gray-900">
            {artwork.title}
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            {artwork.year} · {artwork.category}
          </p>
        </div>
      </div>
    </Link>
  );
}
