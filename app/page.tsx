"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState, useContext } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import useMobile from "@/hooks/use-mobile";
import { HomeContext } from "@/app/lib/context/homeContextProvider";


export default function Home() {
  const { homePageContent } = useContext(HomeContext);
  console.log(homePageContent);
  const isMobile = useMobile();
  const galleryRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  const featuredArtwork = [];
  const images = homePageContent.homePageImages;
  images.forEach((image) => {
    featuredArtwork.push({
      title: image.fields.title,
      description: image.fields.artDescription,
      image: image.fields.image.fields.file.url,
      year: image.fields.year,
      category: "Portraits",
      slug: image.fields.title,
    });
  });

  console.log(homePageContent.homePageImages);

  useEffect(() => {
    // Trigger entrance animations
    const timer = setTimeout(() => setIsVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      {/* Hero Section with Larger Centered Logo */}
      <section className="container px-4 mx-auto max-w-7xl">
        <div className="flex flex-col items-center text-center">
          <div
            className={`relative w-[40rem] h-[40rem] -my-24 transition-all duration-1000 ease-out ${
              isVisible ? "opacity-100 scale-100" : "opacity-0 scale-75"
            }`}
          >
            <Image src="/images/logo.jpeg" alt="JEART Logo" fill />
          </div>

          {/* Artist name and title with staggered animation */}
          <div
            className={`mb-8 transition-all duration-1000 delay-300 ease-out ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
          >
            <h1 className="text-4xl font-medium tracking-tight text-gray-900 md:text-5xl mb-2">
              {homePageContent.name}
            </h1>
            <p className="text-lg font-light text-gray-500">
              {homePageContent.occupationDescription}
            </p>
          </div>

          {/* Description with animation */}
          <p
            className={`max-w-2xl text-lg text-gray-600 mb-8 transition-all duration-1000 delay-500 ease-out ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
          >
            {homePageContent.aboutWebsite}
          </p>

          {/* Action buttons with animation */}
          <div
            className={`flex gap-4 transition-all duration-1000 delay-700 ease-out ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
          >
            <Button
              asChild
              variant="outline"
              className="border-gray-300 hover:bg-gray-50 hover:scale-105 transition-all duration-300"
            >
              <Link href="/gallery">
                View Gallery <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
            <Button
              asChild
              variant="ghost"
              className="text-gray-600 hover:text-gray-900 hover:bg-gray-50 hover:scale-105 transition-all duration-300"
            >
              <Link href="/about">About the Artist</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Enhanced Animated Gallery */}
      <section ref={galleryRef} className="py-8 relative">
        <div className="container px-4 mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {featuredArtwork.map((artwork, index) => (
              <Link
                key={artwork.title}
                href={`/gallery/${artwork.slug}`}
                className={`gallery-item group overflow-hidden transition-all duration-1000 ease-out hover:z-10 relative ${
                  index === 0 ? "md:col-span-2" : ""
                } ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{
                  transitionDelay: `${800 + index * 150}ms`,
                }}
              >
                <div
                  className={`relative ${
                    index === 0 ? "aspect-[3/2]" : "aspect-[3/4]"
                  } rounded-lg overflow-hidden`}
                >
                  <Image
                    src={artwork.image || "/placeholder.svg"}
                    alt={artwork.title}
                    fill
                    className="object-cover transition-all duration-700 ease-in-out group-hover:scale-110 group-hover:rotate-1"
                  />

                  {/* Floating animation on hover */}
                  <div className="absolute inset-0 flex flex-col justify-end p-4 opacity-0 transition-all duration-500 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0">
                    <h3 className="text-lg font-medium text-white drop-shadow-lg">
                      {artwork.title}
                    </h3>
                    <p className="text-sm text-white/90 drop-shadow-lg">
                      {artwork.year} · {artwork.category}
                    </p>
                  </div>

                  {/* Subtle border glow on hover */}
                  <div className="absolute inset-0 border-2 border-white/0 group-hover:border-white/20 transition-all duration-500 rounded-lg"></div>
                </div>

                {/* Floating shadow effect */}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
