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

  if (!context) {
    // Handle the case where context is null, maybe return a loading spinner
    return <div>Loading...</div>;
  }

  const { portraits, shoes, woodWork, balls, vehicles, controllers, misc } =
    context;

  // Initialize with localStorage value if available, otherwise default to "portraits"
  const [activeCategory, setActiveCategory] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem(LAST_CATEGORY_KEY) || "portraits";
    }
    return "portraits";
  });

  const [visibleGalleryItems, setVisibleGalleryItems] = useState<Set<number>>(
    new Set()
  );
  const isMobile = useMobile();

  // Save category to localStorage when it changes
  useEffect(() => {
    localStorage.setItem(LAST_CATEGORY_KEY, activeCategory);
  }, [activeCategory]);

  const mapToArtwork = (
    data: ArtworkType["fields"][],
    category: string
  ): Artwork[] => {
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

  // Prepare all artworks by category
  const allArtworks = {
    portraits: mapToArtwork(portraits, "Portraits"),
    shoes: mapToArtwork(shoes, "Shoes"),
    woodwork: mapToArtwork(woodWork, "Wood Work"),
    balls: mapToArtwork(balls, "Balls"),
    vehicles: mapToArtwork(vehicles, "Vehicles"),
    controllers: mapToArtwork(controllers, "Controllers"),
    misc: mapToArtwork(misc, "Miscellaneous"),
  };

  // Category configuration
  const categories = [
    {
      key: "portraits",
      label: "Portraits",
      count: allArtworks.portraits.length,
    },
    { key: "shoes", label: "Shoes", count: allArtworks.shoes.length },
    { key: "woodwork", label: "Wood Work", count: allArtworks.woodwork.length },
    { key: "balls", label: "Balls", count: allArtworks.balls.length },
    { key: "vehicles", label: "Vehicles", count: allArtworks.vehicles.length },
    {
      key: "controllers",
      label: "Controllers",
      count: allArtworks.controllers.length,
    },
    { key: "misc", label: "Miscellaneous", count: allArtworks.misc.length },
  ];

  // Get current artworks based on active category
  const currentArtworks =
    allArtworks[activeCategory as keyof typeof allArtworks] || [];

  // Reset visible items when category changes
  useEffect(() => {
    setVisibleGalleryItems(new Set());
  }, [activeCategory]);

  // Intersection Observer for gallery items
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -5% 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const itemIndex = Number.parseInt(
          entry.target.getAttribute("data-gallery-index") || "0"
        );

        if (entry.isIntersecting) {
          setVisibleGalleryItems((prev) => new Set([...prev, itemIndex]));
        }
      });
    }, observerOptions);

    // Multiple attempts to find and observe gallery items
    const observeItems = () => {
      const galleryItems = document.querySelectorAll(".gallery-item");
      if (galleryItems.length > 0) {
        galleryItems.forEach((element) => {
          observer.observe(element);
        });
        return true;
      }
      return false;
    };

    // Try immediately
    if (!observeItems()) {
      // If no items found, try again after short delays
      const timeouts = [100, 300, 500, 1000];
      timeouts.forEach((delay) => {
        setTimeout(() => {
          if (document.querySelectorAll(".gallery-item").length > 0) {
            observeItems();
          }
        }, delay);
      });
    }

    return () => {
      observer.disconnect();
    };
  }, [currentArtworks.length, activeCategory]);

  return (
    <div className="min-h-screen bg-white">
      <div className="container px-4 py-16 mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-light text-gray-900 mb-4">Gallery</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore my collection of artwork across different categories and
            mediums.
          </p>
        </div>

        {/* Responsive Navigation */}
        <GalleryNavigation
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />

        {/* Gallery Grid with key to force re-render */}
        <div className="relative">
          <MasonryGrid
            key={activeCategory} // Simple key based on category
            items={currentArtworks}
            isVisible={true}
            columns={isMobile ? 1 : 3}
            gap={16}
            visibleItems={visibleGalleryItems}
          />
        </div>

        {/* Empty state */}
        {currentArtworks.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">
              No artwork found in this category.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
