"use client"

import Link from "next/link"
import Image from "next/image"
import { useEffect, useRef, useState, useContext } from "react"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import useMobile from "@/hooks/use-mobile"
import { HomeContext } from "@/app/lib/context/homeContextProvider"
import MasonryGrid from "@/components/ui/masonry-grid"
import type { HomePageContent, Artwork } from "@/app/lib/types"

export default function Home() {
  const { homePageContent } = useContext(HomeContext)
  const isMobile = useMobile()
  const galleryRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)
  const [visibleGalleryItems, setVisibleGalleryItems] = useState<Set<number>>(new Set())

  const featuredArtwork: Artwork[] = []
  const images = homePageContent["homePageImages"]
  images.forEach((image: any) => {
    featuredArtwork.push({
      title: image.fields.title,
      description: image.fields.artDescription,
      image: image.fields.image.fields.file.url,
      year: image.fields.year,
      category: "Portraits",
      slug: image.fields.title
        .replace(/\s+/g, "_") // Replace one or more whitespace characters with underscore
        .toLowerCase(),
      about: image.fields.aboutThisWork,
      relatedWork: image.fields.relatedWork
    })
  })


  useEffect(() => {
    // Trigger entrance animations
    const timer = setTimeout(() => setIsVisible(true), 300)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    // Intersection Observer for gallery items animations
    const observerOptions = {
      threshold: 0.1, // Trigger when 10% of the element is visible
      rootMargin: "0px 0px -5% 0px", // Start animation slightly before element is fully in view
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const itemIndex = Number.parseInt(entry.target.getAttribute("data-gallery-index") || "0")

        if (entry.isIntersecting) {
          setVisibleGalleryItems((prev) => new Set([...prev, itemIndex]))
        }
      })
    }, observerOptions)

    // Small delay to ensure DOM is ready
    const timeoutId = setTimeout(() => {
      const galleryItems = document.querySelectorAll(".gallery-item")
      galleryItems.forEach((element) => {
        observer.observe(element)
      })
    }, 100)

    return () => {
      clearTimeout(timeoutId)
      observer.disconnect()
    }
  }, [featuredArtwork.length])

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
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <h1 className="text-4xl font-medium tracking-tight text-gray-900 md:text-5xl mb-2">
              {homePageContent.name}
            </h1>
            <p className="text-lg font-light text-gray-500">{homePageContent.occupationDescription}</p>
          </div>

          {/* Description with animation */}
          <p
            className={`max-w-2xl text-lg text-gray-600 mb-8 transition-all duration-1000 delay-500 ease-out ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            {homePageContent.aboutWebsite}
          </p>

          {/* Action buttons with animation */}
          <div
            className={`flex gap-4 transition-all duration-1000 delay-700 ease-out ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
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

      {/* Enhanced Masonry Gallery */}
      <section ref={galleryRef} className="py-8 relative">
        <div className="container px-4 mx-auto max-w-6xl">
          <MasonryGrid
            items={featuredArtwork}
            isVisible={isVisible}
            columns={isMobile ? 1 : 3}
            gap={16}
            visibleItems={visibleGalleryItems}
          />
        </div>
      </section>
    </div>
  )
}
