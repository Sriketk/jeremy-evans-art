import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Artwork } from "@/app/lib/types";


export default async function ArtworkDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  // In a real application, you would fetch the artwork data based on the slug
  // For this example, we'll find it in our mock data
  const artwork = allArtwork.find((art) => art.slug === slug) || allArtwork[0];

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
              src={artwork.image || "/placeholder.svg"}
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
            <p className="mt-1 text-gray-500">{artwork.category}</p>

            <Separator className="my-6" />

            <div className="prose max-w-none">
              <p className="text-gray-700">{artwork.description}</p>
              <p className="text-gray-700">
                {artwork.description ||
                  "Dimensions variable. Please inquire for availability and pricing."}
              </p>

              <h3 className="mt-8 text-xl font-light text-gray-900">
                About this Work
              </h3>
              <p className="text-gray-700">
                {artwork.about ||
                  `This piece is part of an ongoing exploration of ${
                    artwork.theme || "form and space"
                  }. 
                The work emerged from a process of ${
                  artwork.process || "layering and reduction"
                }, 
                creating a dialogue between ${
                  artwork.elements || "structure and fluidity"
                }.`}
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
            {allArtwork
              .filter(
                (art) =>
                  art.id !== artwork.id && art.category === artwork.category
              )
              .slice(0, 3)
              .map((art) => (
                <Link
                  key={art.id}
                  href={`/gallery/${art.slug}`}
                  className="group"
                >
                  <div className="overflow-hidden">
                    <div className="relative aspect-square">
                      <Image
                        src={art.image || "/placeholder.svg"}
                        alt={art.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="mt-3">
                      <h3 className="text-base font-medium text-gray-900">
                        {art.title}
                      </h3>
                      <p className="mt-1 text-sm text-gray-500">
                        {art.year} · {art.category}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
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
