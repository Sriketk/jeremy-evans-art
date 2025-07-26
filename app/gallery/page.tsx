"use client";

import { useState, useContext, useEffect } from "react";
import { GalleryContent } from "@/app/lib/context/galleryContextProvider";
import GalleryNavigation from "@/components/ui/gallery-navigation";
import MasonryGrid from "@/components/ui/masonry-grid";
import useMobile from "@/hooks/use-mobile";
import type { Artwork, ArtworkType } from "@/app/lib/types";

const LAST_CATEGORY_KEY = "lastGalleryCategory";

export default function GalleryPage() {
  const context = useContext(GalleryContent);
  const [mounted, setMounted] = useState(false);

  if (!context) {
    return <div>Loading...</div>;
  }

  const { portraits, shoes, woodWork, balls, vehicles, controllers, misc } = context;

  const [activeCategory, setActiveCategory] = useState("portraits");

  const isMobile = useMobile();

  useEffect(() => {
    setMounted(true);
    // Load from localStorage only after mounting
    const savedCategory = localStorage.getItem(LAST_CATEGORY_KEY);
    if (savedCategory) {
      setActiveCategory(savedCategory);
    }
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem(LAST_CATEGORY_KEY, activeCategory);
    }
  }, [activeCategory, mounted]);

  const mapToArtwork = (data: ArtworkType["fields"][], category: string): Artwork[] => {
    return data.map((item) => ({
      title: item.title,
      description: item.artDescription,
      image: item.image.fields.file.url.startsWith("//")
        ? `https:${item.image.fields.file.url}`
        : item.image.fields.file.url,
      year: item.year,
      category: category,
      slug: item.title.replace(/\s+/g, "_").toLowerCase(),
      about: item.aboutThisWork || "",
    }));
  };

  const allArtworks = {
    portraits: mapToArtwork(portraits, "Portraits"),
    shoes: mapToArtwork(shoes, "Shoes"),
    woodwork: mapToArtwork(woodWork, "Wood Work"),
    balls: mapToArtwork(balls, "Balls"),
    vehicles: mapToArtwork(vehicles, "Vehicles"),
    controllers: mapToArtwork(controllers, "Controllers"),
    misc: mapToArtwork(misc, "Miscellaneous"),
  };

  const categories = [
    { key: "portraits", label: "Portraits", count: allArtworks.portraits.length },
    { key: "shoes", label: "Shoes", count: allArtworks.shoes.length },
    { key: "woodwork", label: "Wood Work", count: allArtworks.woodwork.length },
    { key: "balls", label: "Balls", count: allArtworks.balls.length },
    { key: "vehicles", label: "Vehicles", count: allArtworks.vehicles.length },
    { key: "controllers", label: "Controllers", count: allArtworks.controllers.length },
    { key: "misc", label: "Miscellaneous", count: allArtworks.misc.length },
  ];

  const currentArtworks = allArtworks[activeCategory as keyof typeof allArtworks] || [];

  return (
    <div className="min-h-screen bg-white">
      <div className="container px-4 py-16 mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-light text-gray-900 mb-4">Gallery</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore my collection of artwork across different categories and mediums.
          </p>
        </div>

        <GalleryNavigation
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />

        <div className="relative">
          <MasonryGrid
            key={activeCategory}
            items={currentArtworks}
            columns={isMobile ? 1 : 3}
            gap={16}
          />
        </div>

        {currentArtworks.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">No artwork found in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
}
