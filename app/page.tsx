"use client"

import Link from "next/link"
import Image from "next/image"
import { useContext } from "react"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import useMobile from "@/hooks/use-mobile"
import { HomeContext } from "@/app/lib/context/homeContextProvider"
import MasonryGrid from "@/components/ui/masonry-grid"
import type { Artwork, ArtworkType } from "@/app/lib/types"

export default function Home() {
  const { homePageContent } = useContext(HomeContext)
  const isMobile = useMobile()
  console.log(homePageContent)
  const featuredArtwork: Artwork[] = homePageContent["homePageImages"]?.map((image: ArtworkType) => ({
    title: image.fields.title,
    description: image.fields.artDescription,
    image: image.fields.image.fields.file.url,
    year: image.fields.year,
    category: "Portraits",
    slug: image.fields.title.replace(/\s+/g, "_").toLowerCase(),
    about: image.fields.aboutThisWork || "",
  })) || []

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      {/* Hero Section */}
      <section className="container px-4 mx-auto max-w-7xl">
        <div className="flex flex-col items-center text-center">
          <div className="relative w-[40rem] h-[40rem] -my-24 ">
            <Image 
              src="/images/logo.jpeg" 
              alt="JEART Logo" 
              fill 
              priority
              className="object-contain"
            />
          </div>

          <div className="mt-24 mb-8">
            <h1 className="text-4xl font-medium tracking-tight text-gray-900 md:text-5xl mb-2">
              {homePageContent.name}
            </h1>
            <p className="text-lg font-light text-gray-500">{homePageContent?.occupationDescription}</p>
          </div>

          <p className="max-w-2xl text-lg text-gray-600 mb-8">
            {homePageContent?.aboutWebsite}
          </p>

          <div className="flex gap-4">
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

      {/* Masonry Gallery */}
      <section className="py-8 relative">
        <div className="container px-4 mx-auto max-w-6xl">
          <MasonryGrid
            items={featuredArtwork}
            columns={isMobile ? 1 : 3}
            gap={16}
          />
        </div>
      </section>
    </div>
  )
}
