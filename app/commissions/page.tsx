import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, HelpCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function CommissionsPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container px-4 py-12 mx-auto max-w-7xl">
        <Button asChild variant="ghost" size="sm" className="mb-8">
          <Link href="/">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
        </Button>

        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900">Commission Artwork</h1>
          <p className="max-w-2xl mx-auto mt-4 text-lg text-gray-600">
            Get a unique, custom-made piece of art created specifically for you
          </p>
        </div>

        <div className="grid grid-cols-1 gap-12 mt-12 lg:grid-cols-2">
          <div>
            <div className="relative overflow-hidden rounded-lg shadow-lg aspect-video">
              <Image
                src="/placeholder.svg?height=400&width=600"
                alt="Commission Artwork"
                fill
                className="object-cover"
                priority
              />
            </div>

            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="relative overflow-hidden rounded-lg shadow-md aspect-square">
                <Image
                  src="/placeholder.svg?height=300&width=300"
                  alt="Commission Example 1"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative overflow-hidden rounded-lg shadow-md aspect-square">
                <Image
                  src="/placeholder.svg?height=300&width=300"
                  alt="Commission Example 2"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-900">Commission Process</h2>
            <p className="mt-2 text-gray-600">
              I offer custom artwork commissions tailored to your specific needs and preferences. Here's how the process
              works:
            </p>

            <div className="mt-6 space-y-6">
              {commissionSteps.map((step) => (
                <div key={step.id} className="flex">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-purple-100 text-purple-600">
                    {step.id}
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">{step.title}</h3>
                    <p className="mt-1 text-gray-600">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <Separator className="my-8" />

            <div>
              <h2 className="text-2xl font-semibold text-gray-900">Commission Types</h2>
              <p className="mt-2 text-gray-600">
                I offer various types of commissions across different mediums and styles:
              </p>

              <div className="grid grid-cols-1 gap-4 mt-6 sm:grid-cols-2">
                {commissionTypes.map((type) => (
                  <div key={type.id} className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg">
                    <h3 className="text-lg font-medium text-gray-900">{type.title}</h3>
                    <p className="mt-1 text-sm text-gray-600">{type.description}</p>
                    <p className="mt-2 text-sm font-medium text-purple-600">Starting at ${type.startingPrice}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 mt-8 bg-gradient-to-br from-pink-100 to-purple-100 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-900">Ready to Commission a Piece?</h3>
              <p className="mt-2 text-gray-700">
                Contact me to discuss your ideas and get started on your custom artwork.
              </p>
              <div className="flex flex-wrap gap-4 mt-4">
                <Button
                  asChild
                  className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
                >
                  <Link href="/contact">Contact Me</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/gallery">View My Work</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-20">
          <h2 className="text-2xl font-semibold text-center text-gray-900">Frequently Asked Questions</h2>

          <div className="max-w-3xl mx-auto mt-8">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq) => (
                <AccordionItem key={faq.id} value={`faq-${faq.id}`}>
                  <AccordionTrigger className="text-left">
                    <div className="flex items-center">
                      <HelpCircle className="w-5 h-5 mr-2 text-purple-500" />
                      {faq.question}
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600">{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>

        <div className="p-8 mt-20 text-center bg-gradient-to-r from-pink-100 via-purple-100 to-blue-100 rounded-lg">
          <h2 className="text-2xl font-semibold text-gray-900">Testimonials</h2>
          <p className="max-w-2xl mx-auto mt-2 text-gray-600">
            Here's what clients are saying about their commissioned artwork
          </p>

          <div className="grid grid-cols-1 gap-8 mt-8 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="p-6 bg-white rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <div className="relative w-12 h-12 overflow-hidden rounded-full">
                    <Image
                      src="/placeholder.svg?height=100&width=100"
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">{testimonial.name}</h3>
                    <p className="text-sm text-gray-500">{testimonial.location}</p>
                  </div>
                </div>
                <p className="text-gray-600">{testimonial.quote}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

const commissionSteps = [
  {
    id: 1,
    title: "Initial Consultation",
    description: "We'll discuss your vision, preferences, and requirements for the commissioned piece.",
  },
  {
    id: 2,
    title: "Proposal & Quote",
    description:
      "I'll provide a detailed proposal including timeline, size, medium, and pricing based on your requirements.",
  },
  {
    id: 3,
    title: "Concept Development",
    description: "Once the proposal is approved, I'll create initial sketches or concepts for your review.",
  },
  {
    id: 4,
    title: "Creation Process",
    description: "After concept approval, I'll begin creating your artwork, providing progress updates along the way.",
  },
  {
    id: 5,
    title: "Final Review & Delivery",
    description:
      "You'll review the completed artwork, and once approved, I'll prepare it for delivery or installation.",
  },
]

const commissionTypes = [
  {
    id: 1,
    title: "Digital Artwork",
    description: "Custom digital illustrations, concept art, and digital paintings.",
    startingPrice: 250,
  },
  {
    id: 2,
    title: "Oil Paintings",
    description: "Traditional oil paintings on canvas in various sizes.",
    startingPrice: 500,
  },
  {
    id: 3,
    title: "Watercolor Illustrations",
    description: "Delicate watercolor illustrations and paintings.",
    startingPrice: 300,
  },
  {
    id: 4,
    title: "Mixed Media Art",
    description: "Experimental pieces combining various materials and techniques.",
    startingPrice: 400,
  },
]

const faqs = [
  {
    id: 1,
    question: "How long does a commission typically take?",
    answer:
      "The timeline varies depending on the complexity, size, and medium of the artwork. Simple digital pieces may take 1-2 weeks, while more complex paintings could take 4-8 weeks. I'll provide a specific timeline during our initial consultation.",
  },
  {
    id: 2,
    question: "Do you require a deposit?",
    answer:
      "Yes, I typically require a 50% non-refundable deposit to begin work, with the remaining balance due upon completion before delivery.",
  },
  {
    id: 3,
    question: "Can I request revisions to the artwork?",
    answer:
      "The commission process includes one round of minor revisions after the concept phase and one round after the work is nearly complete. Additional revisions may incur extra charges.",
  },
  {
    id: 4,
    question: "Do you ship internationally?",
    answer:
      "Yes, I ship worldwide. Shipping costs will be calculated based on the size of the artwork and your location.",
  },
  {
    id: 5,
    question: "What rights do I have to the commissioned artwork?",
    answer:
      "You will own the physical artwork (for traditional mediums) or a high-resolution file (for digital work). I retain copyright and the right to use images of the work in my portfolio, but will not sell reproductions without your permission.",
  },
]

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    location: "New York, NY",
    quote:
      "The commissioned piece exceeded all my expectations. The artist perfectly captured the feeling I was looking for, and the artwork has become the centerpiece of my living room.",
  },
  {
    id: 2,
    name: "Michael Chen",
    location: "San Francisco, CA",
    quote:
      "Working with this artist was a pleasure from start to finish. They were responsive, professional, and delivered a stunning piece that perfectly matched my vision.",
  },
  {
    id: 3,
    name: "Emma Rodriguez",
    location: "Chicago, IL",
    quote:
      "I commissioned a portrait as a gift, and it brought tears to the recipient's eyes. The attention to detail and emotional depth in the artwork is remarkable.",
  },
]
