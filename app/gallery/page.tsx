import Link from "next/link";
import Image from "next/image";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function GalleryPage() {
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
              value="drawing"
              className="rounded-none border-0 border-b-2 border-transparent data-[state=active]:border-gray-900 data-[state=active]:bg-transparent text-gray-500 data-[state=active]:text-gray-900 pb-2"
            >
              Drawing
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
                <ArtworkCard key={artwork.id} artwork={artwork} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="painting" className="mt-0">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
              {allArtwork
                .filter((artwork) => artwork.category === "Painting")
                .map((artwork) => (
                  <ArtworkCard key={artwork.id} artwork={artwork} />
                ))}
            </div>
          </TabsContent>

          <TabsContent value="drawing" className="mt-0">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
              {allArtwork
                .filter((artwork) => artwork.category === "Drawing")
                .map((artwork) => (
                  <ArtworkCard key={artwork.id} artwork={artwork} />
                ))}
            </div>
          </TabsContent>

          <TabsContent value="mixed-media" className="mt-0">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
              {allArtwork
                .filter((artwork) => artwork.category === "Mixed Media")
                .map((artwork) => (
                  <ArtworkCard key={artwork.id} artwork={artwork} />
                ))}
            </div>
          </TabsContent>

          <TabsContent value="digital" className="mt-0">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
              {allArtwork
                .filter((artwork) => artwork.category === "Digital")
                .map((artwork) => (
                  <ArtworkCard key={artwork.id} artwork={artwork} />
                ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

function ArtworkCard({ artwork }) {
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

const allArtwork = [
  {
    id: 1,
    title: "Untitled No. 7",
    slug: "untitled-no-7",
    description: "Mixed media on canvas.",
    image: "/placeholder.svg?height=600&width=600",
    category: "Mixed Media",
    year: "2023",
  },
  {
    id: 2,
    title: "Composition in Blue",
    slug: "composition-in-blue",
    description: "Oil on canvas.",
    image: "/placeholder.svg?height=600&width=600",
    category: "Painting",
    year: "2022",
  },
  {
    id: 3,
    title: "Study of Light",
    slug: "study-of-light",
    description: "Charcoal and pastel on paper.",
    image: "/placeholder.svg?height=600&width=600",
    category: "Drawing",
    year: "2023",
  },
  {
    id: 4,
    title: "Fragments",
    slug: "fragments",
    description: "Digital collage.",
    image: "/placeholder.svg?height=600&width=600",
    category: "Digital",
    year: "2022",
  },
  {
    id: 5,
    title: "Intersection",
    slug: "intersection",
    description: "Acrylic on panel.",
    image: "/placeholder.svg?height=600&width=600",
    category: "Painting",
    year: "2023",
  },
  {
    id: 6,
    title: "Gesture Series #3",
    slug: "gesture-series-3",
    description: "Ink on paper.",
    image: "/placeholder.svg?height=600&width=600",
    category: "Drawing",
    year: "2022",
  },
  {
    id: 7,
    title: "Spatial Construct",
    slug: "spatial-construct",
    description: "Mixed media installation, variable dimensions.",
    image: "/placeholder.svg?height=600&width=600",
    category: "Mixed Media",
    year: "2023",
  },
  {
    id: 8,
    title: "Digital Landscape",
    slug: "digital-landscape",
    description: "Digital painting.",
    image: "/placeholder.svg?height=600&width=600",
    category: "Digital",
    year: "2022",
  },
  {
    id: 9,
    title: "Monochrome Study",
    slug: "monochrome-study",
    description: "Oil on linen.",
    image: "/placeholder.svg?height=600&width=600",
    category: "Painting",
    year: "2023",
  },
];
