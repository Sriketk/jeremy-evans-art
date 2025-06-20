"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { useContext } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ArtworkType } from "@/app/lib/types";
import { Slug } from "@/app/lib/context/slugContextProvider";
import { GalleryContent } from "@/app/lib/context/galleryContextProvider";

export default function ArtworkDetailPage() {
  const slugContext = useContext(Slug);
  const slug = slugContext.slug;
  const galleryContent = useContext(GalleryContent);

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

  if (!artwork) {
    return <div>Artwork not found</div>; // Handle case where slug is invalid
  }

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

        <div className="mt-24">
          <h2 className="mb-8 text-2xl font-light text-gray-900">
            Related Works
          </h2>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
            {/* This part needs to be refactored as `allArtwork` is not available in the same way */}
          </div>
        </div>
      </div>
    </div>
  );
}

const allArtwork = [
  {
    id: 1,
    title: "Untitled No. 7",
    slug: "untitled-no-7",
    description: "Mixed media on canvas, 36 × 48 inches.",
    details:
      "Materials include acrylic, charcoal, and found paper on stretched canvas.",
    image: "/placeholder.svg?height=800&width=600",
    category: "Mixed Media",
    year: "2023",
    theme: "memory and materiality",
    process: "intuitive mark-making and collage",
    elements: "texture and negative space",
    about: "Mixed media on canvas, 36 × 48 inches.",
  },
  {
    id: 2,
    title: "Composition in Blue",
    slug: "composition-in-blue",
    description: "Oil on canvas, 24 × 30 inches.",
    details: "Framed in natural wood.",
    image: "/placeholder.svg?height=800&width=600",
    category: "Painting",
    year: "2022",
    theme: "color relationships and spatial perception",
    process: "layering transparent glazes",
    elements: "geometric forms and atmospheric color",
    about: "Oil on canvas, 24 × 30 inches.",
  },
  {
    id: 3,
    title: "Study of Light",
    slug: "study-of-light",
    description: "Charcoal and pastel on paper, 18 × 24 inches.",
    details: "Mounted and framed under museum glass.",
    image: "/placeholder.svg?height=600&width=600",
    category: "Drawing",
    year: "2023",
    theme: "light and shadow",
    process: "observation and tonal rendering",
    elements: "contrast and subtle gradation",
    about: "Charcoal and pastel on paper, 18 × 24 inches.",
  },
  {
    id: 4,
    title: "Fragments",
    slug: "fragments",
    description: "Digital collage, dimensions variable.",
    details:
      "Limited edition of 10 prints available, archival pigment on cotton rag paper.",
    image: "/placeholder.svg?height=600&width=600",
    category: "Digital",
    year: "2022",
    theme: "fragmentation and reconstruction",
    process: "digital manipulation of found imagery",
    elements: "juxtaposition and repetition",
    about: "Digital collage, dimensions variable.",
  },
  {
    id: 5,
    title: "Intersection",
    slug: "intersection",
    description: "Acrylic on panel, 16 × 16 inches.",
    details: "Floated in white frame.",
    image: "/placeholder.svg?height=600&width=600",
    category: "Painting",
    year: "2023",
    theme: "urban environments",
    process: "hard-edge painting techniques",
    elements: "line and planar relationships",
    about: "Acrylic on panel, 16 × 16 inches.",
  },
  {
    id: 6,
    title: "Gesture Series #3",
    slug: "gesture-series-3",
    description: "Ink on paper, 11 × 14 inches.",
    details: "Unframed.",
    image: "/placeholder.svg?height=600&width=600",
    category: "Drawing",
    year: "2022",
    theme: "movement and gesture",
    process: "spontaneous mark-making",
    elements: "line weight and rhythm",
    about: "Ink on paper, 11 × 14 inches.",
  },
  {
    id: 7,
    title: "Spatial Construct",
    slug: "spatial-construct",
    description: "Mixed media installation, variable dimensions.",
    details: "Materials include wood, metal, and found objects.",
    image: "/placeholder.svg?height=600&width=600",
    category: "Mixed Media",
    year: "2023",
    theme: "architectural space and perception",
    process: "assemblage and site-specific installation",
    elements: "physical presence and viewer interaction",
    about: "Mixed media installation, variable dimensions.",
  },
  {
    id: 8,
    title: "Digital Landscape",
    slug: "digital-landscape",
    description: "Digital painting, dimensions variable.",
    details:
      "Limited edition of 5 prints available, archival pigment on aluminum.",
    image: "/placeholder.svg?height=600&width=600",
    category: "Digital",
    year: "2022",
    theme: "natural and artificial environments",
    process: "digital painting and compositing",
    elements: "organic forms and synthetic color",
    about: "Digital painting, dimensions variable.",
  },
  {
    id: 9,
    title: "Monochrome Study",
    slug: "monochrome-study",
    description: "Oil on linen, 20 × 20 inches.",
    details: "Floated in natural wood frame.",
    image: "/placeholder.svg?height=600&width=600",
    category: "Painting",
    year: "2023",
    theme: "reduction and minimalism",
    process: "building up and scraping back paint",
    elements: "subtle tonal variation and surface texture",
    about: "Oil on linen, 20 × 20 inches.",
  },
  {
    id: 10,
    title: "ads",
    slug: "monochrome-study",
    description: "Oil on linen, 20 × 20 inches.",
    details: "Floated in natural wood frame.",
    image: "/placeholder.svg?height=600&width=600",
    category: "Painting",
    year: "2023",
    theme: "reduction and minimalism",
    process: "building up and scraping back paint",
    elements: "subtle tonal variation and surface texture",
    about: "Oil on linen, 20 × 20 inches.",
  },
];
