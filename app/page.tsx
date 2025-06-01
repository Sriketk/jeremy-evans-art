"use client"

import Link from "next/link"
import Image from "next/image"
import { useEffect, useRef } from "react"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useMobile } from "@/hooks/use-mobile"

export default function Home() {
  const isMobile = useMobile()
  const galleryRef = useRef(null)

  // Simple parallax effect on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const gallery = galleryRef.current

      if (gallery) {
        const items = gallery.querySelectorAll(".gallery-item")
        items.forEach((item, index) => {
          const speed = 1 + (index % 3) * 0.1
          const yPos = scrollY * speed * 0.03
          item.style.transform = `translateY(${-yPos}px)`
        })
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-white">
      {/* Minimal Hero Section */}
      <section className="container px-4 py-16 mx-auto max-w-6xl">
        <div className="flex flex-col items-start max-w-2xl">
          <h1 className="text-4xl font-light tracking-tight text-gray-900 md:text-5xl">
            <span className="block">Artist Name</span>
            <span className="block mt-2 font-normal text-gray-500">Visual Artist & Illustrator</span>
          </h1>
          <p className="max-w-xl mt-6 text-lg text-gray-600">
            A collection of artwork exploring form, color, and texture through various mediums.
          </p>
          <div className="flex gap-4 mt-8">
            <Button asChild variant="outline" className="border-gray-300 hover:bg-gray-50">
              <Link href="/gallery">
                View Gallery <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
            <Button asChild variant="ghost" className="text-gray-600 hover:text-gray-900 hover:bg-gray-50">
              <Link href="/about">About the Artist</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Animated Gallery */}
      <section ref={galleryRef} className="py-8 overflow-hidden">
        <div className="container px-4 mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0.5 md:gap-1">
            {featuredArtwork.map((artwork, index) => (
              <Link
                key={artwork.id}
                href={`/gallery/${artwork.slug}`}
                className={`gallery-item group overflow-hidden transition-all duration-700 ease-in-out ${
                  index === 0 ? "md:col-span-2 md:row-span-2" : ""
                }`}
                style={{
                  transitionDelay: `${index * 100}ms`,
                }}
              >
                <div className={`relative ${index === 0 ? "aspect-square" : "aspect-[3/4]"}`}>
                  <Image
                    src={artwork.image || "/placeholder.svg"}
                    alt={artwork.title}
                    fill
                    className="object-cover transition-all duration-700 ease-in-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 transition-all duration-500 group-hover:bg-opacity-20"></div>
                  <div className="absolute inset-0 flex flex-col justify-end p-4 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                    <h3 className="text-lg font-medium text-white drop-shadow-md">{artwork.title}</h3>
                    <p className="text-sm text-white drop-shadow-md">
                      {artwork.year} · {artwork.category}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Brief About Preview */}
      <section className="container px-4 py-16 mx-auto max-w-6xl">
        <div className="flex flex-col items-center text-center">
          <h2 className="text-2xl font-light text-gray-900">About the Artist</h2>
          <p className="max-w-2xl mt-4 text-gray-600">
            I'm an artist exploring the boundaries between traditional and contemporary techniques, focusing on themes
            of memory, identity, and the natural world.
          </p>
          <Button asChild variant="outline" className="mt-6 border-gray-300 hover:bg-gray-50">
            <Link href="/about">Learn More</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}

const featuredArtwork = [
  {
    id: 1,
    title: "Untitled No. 7",
    slug: "untitled-no-7",
    description: "Mixed media on canvas.",
    image: "/placeholder.svg?height=800&width=800",
    category: "Mixed Media",
    year: "2023",
  },
  {
    id: 2,
    title: "Composition in Blue",
    slug: "composition-in-blue",
    description: "Oil on canvas.",
    image: "/placeholder.svg?height=600&width=450",
    category: "Painting",
    year: "2022",
  },
  {
    id: 3,
    title: "Study of Light",
    slug: "study-of-light",
    description: "Charcoal and pastel on paper.",
    image: "/placeholder.svg?height=600&width=450",
    category: "Drawing",
    year: "2023",
  },
  {
    id: 4,
    title: "Fragments",
    slug: "fragments",
    description: "Digital collage.",
    image: "/placeholder.svg?height=600&width=450",
    category: "Digital",
    year: "2022",
  },
  {
    id: 5,
    title: "Intersection",
    slug: "intersection",
    description: "Acrylic on panel.",
    image: "/placeholder.svg?height=600&width=450",
    category: "Painting",
    year: "2023",
  },
]
