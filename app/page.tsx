"use client"

import Link from "next/link"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import useMobile from "@/hooks/use-mobile"

export default function Home() {
  const isMobile = useMobile()
  const galleryRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Trigger entrance animations
    const timer = setTimeout(() => setIsVisible(true), 300)
    return () => clearTimeout(timer)
  }, [])

  // Enhanced parallax and animation effects
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const gallery = galleryRef.current

      if (gallery) {
        const items = gallery.querySelectorAll(".gallery-item")
        items.forEach((item, index) => {
          const rect = item.getBoundingClientRect()
          const isInView = rect.top < window.innerHeight && rect.bottom > 0

          if (isInView) {
            // Enhanced parallax with rotation and scale
            const speed = 1 + (index % 3) * 0.1
            const yPos = scrollY * speed * 0.02
            const rotation = scrollY * 0.01 * (index % 2 === 0 ? 1 : -1)
            const scale = 1 + scrollY * 0.0001

            item.style.transform = `translateY(${-yPos}px) rotate(${rotation}deg) scale(${Math.min(scale, 1.05)})`
          }
        })
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      {/* Hero Section with Larger Centered Logo */}
      <section className="container px-4 py-16 mx-auto max-w-6xl">
        <div className="flex flex-col items-center text-center">
          {/* Much Larger Logo with entrance animation */}
          <div
            className={`relative w-48 h-48 md:w-64 md:h-64 mb-8 transition-all duration-1000 ease-out ${
              isVisible ? "opacity-100 scale-100" : "opacity-0 scale-75"
            }`}
          >
            <Image
              src="/images/logo.jpeg"
              alt="JEART Logo"
              fill
              className="object-contain animate-pulse-slow"
              priority
            />
          </div>

          {/* Artist name and title with staggered animation */}
          <div
            className={`mb-8 transition-all duration-1000 delay-300 ease-out ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <h1 className="text-4xl font-medium tracking-tight text-gray-900 md:text-5xl mb-2">JEART</h1>
            <p className="text-lg font-light text-gray-500">Visual Artist & Illustrator</p>
          </div>

          {/* Description with animation */}
          <p
            className={`max-w-2xl text-lg text-gray-600 mb-8 transition-all duration-1000 delay-500 ease-out ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            A collection of artwork exploring form, color, and texture through various mediums.
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

      {/* Enhanced Animated Gallery */}
      <section ref={galleryRef} className="py-8 relative">
        <div className="container px-4 mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-1 md:gap-2">
            {featuredArtwork.map((artwork, index) => (
              <Link
                key={artwork.id}
                href={`/gallery/${artwork.slug}`}
                className={`gallery-item group overflow-hidden transition-all duration-1000 ease-out hover:z-10 relative ${
                  index === 0 ? "md:col-span-2 md:row-span-2" : ""
                } ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                style={{
                  transitionDelay: `${800 + index * 150}ms`,
                }}
              >
                <div
                  className={`relative ${index === 0 ? "aspect-square" : "aspect-[3/4]"} rounded-lg overflow-hidden`}
                >
                  <Image
                    src={artwork.image || "/placeholder.svg"}
                    alt={artwork.title}
                    fill
                    className="object-cover transition-all duration-700 ease-in-out group-hover:scale-110 group-hover:rotate-1"
                  />

                  {/* Enhanced overlay effects */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-all duration-500 group-hover:opacity-100"></div>
                  <div className="absolute inset-0 bg-black bg-opacity-0 transition-all duration-500 group-hover:bg-opacity-10"></div>

                  {/* Floating animation on hover */}
                  <div className="absolute inset-0 flex flex-col justify-end p-4 opacity-0 transition-all duration-500 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0">
                    <h3 className="text-lg font-medium text-white drop-shadow-lg">{artwork.title}</h3>
                    <p className="text-sm text-white/90 drop-shadow-lg">
                      {artwork.year} · {artwork.category}
                    </p>
                  </div>

                  {/* Subtle border glow on hover */}
                  <div className="absolute inset-0 border-2 border-white/0 group-hover:border-white/20 transition-all duration-500 rounded-lg"></div>
                </div>

                {/* Floating shadow effect */}
                <div className="absolute inset-0 shadow-lg opacity-0 group-hover:opacity-30 transition-all duration-500 transform translate-y-2 group-hover:translate-y-4 -z-10 bg-black/20 blur-xl rounded-lg"></div>
              </Link>
            ))}
          </div>
        </div>

        {/* Background decorative elements */}
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gray-100 rounded-full opacity-20 animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-gray-200 rounded-full opacity-30 animate-float-delayed"></div>
      </section>

      {/* Brief About Preview */}
      <section className="container px-4 py-16 mx-auto max-w-6xl">
        <div className="flex flex-col items-center text-center">
          <h2 className="text-2xl font-medium text-gray-900">About the Artist</h2>
          <p className="max-w-2xl mt-4 text-gray-600">
            I'm an artist exploring the boundaries between traditional and contemporary techniques, focusing on themes
            of memory, identity, and the natural world.
          </p>
          <Button
            asChild
            variant="outline"
            className="mt-6 border-gray-300 hover:bg-gray-50 hover:scale-105 transition-all duration-300"
          >
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
