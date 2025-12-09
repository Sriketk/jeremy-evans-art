"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { useContext } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Artwork, ArtworkType } from "@/app/lib/types";
import { Slug } from "@/app/lib/context/slugContextProvider";
import { GalleryContent } from "@/app/lib/context/galleryContextProvider";
import MasonryGrid from "@/components/ui/masonry-grid";
import ArtworkNotFound from "@/components/ui/artwork-not-found";
import useMobile from "@/hooks/use-mobile";

export default function ArtworkDetailPage() {
  const slugContext = useContext(Slug);
  const slug = slugContext.slug;
  const galleryContent = useContext(GalleryContent);
  const isMobile = useMobile();

  if (!galleryContent || !slug) {
    return <div>Loading...</div>; // Or some other loading state
  }

  const { portraits, shoes, woodWork, vehicles, balls, controllers, misc } =
    galleryContent;

  const allArtCategories = [
    ...portraits,
    ...shoes,
    ...woodWork,
    ...vehicles,
    ...balls,
    ...controllers,
    ...misc,
  ];

  const artworkMap = new Map<string, ArtworkType["fields"]>(
    allArtCategories.map((art) => [
      art.title.replace(/\s+/g, "_").toLowerCase(),
      art,
    ])
  );

  const artwork = artworkMap.get(slug);

  const mapToArtwork = (data: ArtworkType['fields']['angles'], category: string): Artwork[] => {
    if (!data || data.length === 0) {
      return [];
    }
    return data.map((item) => ({
      title: item?.fields?.title ?? "",
      description: item?.fields?.artDescription ?? "",
      image: item?.fields?.image.fields.file.url
        ? (item.fields.image.fields.file.url.startsWith("//")
            ? `https:${item.fields.image.fields.file.url}`
            : item.fields.image.fields.file.url)
        : "",
      year: item?.fields?.year ?? 2025,
      category: category ?? "",
      slug: item?.fields?.title?.replace(/\s+/g, "_").toLowerCase() ?? "",
      about: item?.fields?.aboutThisWork ?? "",
    }));
  };  


    const angles = mapToArtwork(artwork?.angles ?? [], "Angles");
  

  // In a real application, you would fetch the artwork data based on the slug
  // For this example, we'll find it in our mock data
  // const artwork = allArtwork.find((art) => art.slug === slug) || allArtwork[0];

  return (
    <div className="min-h-screen bg-white">
      <div className="container px-4 py-16 mx-auto max-w-6xl">
        <Button
          asChild
          variant="ghost"
          size="sm"
          className="mb-8 hover:bg-transparent hover:text-gray-900 p-0 h-auto"
        >
          <Link href="/gallery">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Gallery
          </Link>
        </Button>
        {artwork ? (
          <>
            <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
              <div className="relative">
                <Image
                  src={
                    artwork.image.fields.file.url.startsWith("//")
                      ? `https:${artwork.image.fields.file.url}`
                      : artwork.image.fields.file.url
                  }
                  alt={artwork.title}
                  width={800}
                  height={800}
                  className="object-contain w-full"
                  priority
                />
              </div>

              <div>
                <h1 className="text-3xl font-light text-gray-900">
                  {artwork.title}
                </h1>
                <p className="mt-2 text-gray-500">{artwork.year}</p>

                <Separator className="my-6" />

                <div className="prose max-w-none">
                  <p className="text-gray-700">{artwork.artDescription}</p>

                  <h3 className="mt-8 text-xl font-light text-gray-900">
                    About this Work
                  </h3>
                  <p className="text-gray-700">
                    {artwork.aboutThisWork ||
                      `This piece is part of an ongoing exploration of `}
                  </p>
                </div>

                <Separator className="my-6" />

                <div className="mt-8">
                  <h3 className="text-xl font-light text-gray-900">Inquire</h3>
                  <p className="mt-2 text-gray-600">
                    For information about availability, pricing, or to schedule a
                    viewing, please get in touch.
                  </p>
                  <Button
                    asChild
                    variant="outline"
                    className="mt-4 border-gray-300 hover:bg-gray-50"
                  >
                    <Link href="/contact">Contact</Link>
                  </Button>
                </div>
              </div>
            </div>

            {angles.length > 0 && (
              <div className="mt-24">
                <h2 className="mb-8 text-2xl font-light text-gray-900">
                  Angles
                </h2>
                <div className="relative">
                  <MasonryGrid
                    key={angles.length}
                    items={angles}
                    columns={isMobile ? 1 : 3}
                    gap={16}
                  />
                </div>
              </div>
            )}
          </>
        ) : (
          <ArtworkNotFound />
        )}
      </div>
    </div>
  );
}
