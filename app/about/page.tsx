import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container px-4 py-16 mx-auto max-w-6xl">
        <h1 className="text-3xl font-light text-gray-900">About</h1>

        <div className="mt-12">
          {/* Artist Intro */}
          <div className="grid grid-cols-1 gap-16 mb-24 lg:grid-cols-2">
            <div className="relative aspect-[3/4]">
              <Image
                src="/placeholder.svg?height=900&width=600"
                alt="Artist Portrait"
                fill
                className="object-cover"
                priority
              />
            </div>

            <div className="flex flex-col justify-center">
              <div className="prose max-w-none">
                <p className="text-lg text-gray-700">
                  I am a [nationality] artist based in [location], working across various media including painting,
                  drawing, and mixed media installation.
                </p>

                <p className="text-gray-700">
                  My practice explores the relationship between [theme 1] and [theme 2], examining how [specific aspect
                  of your work] can reveal [insight or perspective].
                </p>

                <p className="text-gray-700">
                  In my current body of work, I am investigating [current focus or project], using [techniques or
                  approaches] to explore [themes or questions].
                </p>
              </div>

              <Button asChild variant="outline" className="self-start mt-8 border-gray-300 hover:bg-gray-50">
                <Link href="/contact">Get in Touch</Link>
              </Button>
            </div>
          </div>

          {/* Timeline */}
          <div className="relative">
            <div className="absolute left-1/2 h-full w-px bg-gray-200 transform -translate-x-1/2"></div>

            {timelineEvents.map((event, index) => (
              <div key={index} className="relative mb-16">
                <div className="absolute left-1/2 w-4 h-4 bg-white border-2 border-gray-300 rounded-full transform -translate-x-1/2"></div>

                <div className={`flex items-center ${index % 2 === 0 ? "flex-row-reverse" : ""}`}>
                  <div className={`w-1/2 ${index % 2 === 0 ? "pr-12 text-right" : "pl-12"}`}>
                    <div className="inline-block px-3 py-1 mb-2 text-xs font-medium text-gray-600 bg-gray-100 rounded-full">
                      {event.year}
                    </div>
                    <h3 className="text-xl font-medium text-gray-900">{event.title}</h3>
                    <p className="mt-2 text-gray-600">{event.description}</p>

                    {event.image && (
                      <div className="relative mt-4 overflow-hidden rounded-md aspect-video">
                        <Image
                          src={event.image || "/placeholder.svg"}
                          alt={event.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}

                    {event.details && (
                      <ul className="mt-3 space-y-1">
                        {event.details.map((detail, i) => (
                          <li key={i} className="text-sm text-gray-500">
                            {detail}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Artist Statement */}
          <div className="max-w-3xl mx-auto mt-24 p-8 bg-gray-50">
            <h2 className="text-2xl font-light text-gray-900">Artist Statement</h2>
            <div className="mt-6 prose">
              <p>
                My work investigates the intersection of [theme/concept] and [theme/concept], exploring how [specific
                aspect of your practice] can [what it reveals or accomplishes]. Through a process of [your process], I
                create [description of your work] that [what it does or means].
              </p>
              <p>
                I am particularly interested in [specific interest], which stems from [personal experience or
                theoretical framework]. This interest has led me to develop a visual language that [description of your
                visual approach].
              </p>
              <p>
                In my current body of work, I am exploring [current focus], using [medium/technique] to [what you're
                trying to achieve]. This exploration has allowed me to [what you've discovered or developed].
              </p>
            </div>
          </div>

          {/* CV Download */}
          <div className="mt-24 text-center">
            <h2 className="text-2xl font-light text-gray-900">Curriculum Vitae</h2>
            <p className="mt-2 text-gray-500">A complete CV is available for download</p>
            <Button variant="outline" className="mt-4 border-gray-300 hover:bg-gray-50">
              Download CV (PDF)
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

const timelineEvents = [
  {
    year: "2023",
    title: "Solo Exhibition: 'Title of Exhibition'",
    description: "Description of the exhibition, its themes, and significance in your artistic development.",
    image: "/placeholder.svg?height=400&width=600",
    details: ["Gallery Name, City, Country", "Curator: Curator Name"],
  },
  {
    year: "2021",
    title: "Artist Residency",
    description:
      "Details about the residency program, what you created during this time, and how it influenced your work.",
    image: "/placeholder.svg?height=400&width=600",
    details: ["Residency Program Name, Location", "Duration: 3 months"],
  },
  {
    year: "2019",
    title: "MFA in Fine Arts",
    description: "Information about your graduate studies, thesis project, and key learnings.",
    details: ["University Name, City, Country", "Thesis: 'Title of Thesis'", "Advisor: Professor Name"],
  },
  {
    year: "2017",
    title: "First Group Exhibition",
    description: "Details about your first significant exhibition, the work you presented, and its reception.",
    image: "/placeholder.svg?height=400&width=600",
    details: ["Exhibition Title, Gallery Name, City", "Curator: Curator Name"],
  },
  {
    year: "2015",
    title: "BFA in Studio Art",
    description: "Information about your undergraduate studies, focus areas, and formative experiences.",
    details: ["University Name, City, Country", "Concentration: Medium/Focus"],
  },
  {
    year: "2012",
    title: "Artistic Beginnings",
    description: "The story of how you began your artistic journey, early influences, and pivotal moments.",
    image: "/placeholder.svg?height=400&width=600",
  },
]
