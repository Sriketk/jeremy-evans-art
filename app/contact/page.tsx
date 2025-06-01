import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container px-4 py-16 mx-auto max-w-6xl">
        <h1 className="text-3xl font-light text-gray-900">Contact</h1>
        <p className="mt-2 text-lg text-gray-500">
          Get in touch for inquiries about artwork, commissions, or exhibitions
        </p>

        <div className="grid grid-cols-1 gap-16 mt-12 lg:grid-cols-2">
          <div>
            <form className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-gray-700">
                  Name
                </Label>
                <Input id="name" placeholder="Your name" className="border-gray-300 focus-visible:ring-gray-400" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-700">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Your email address"
                  className="border-gray-300 focus-visible:ring-gray-400"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject" className="text-gray-700">
                  Subject
                </Label>
                <Input
                  id="subject"
                  placeholder="What is this regarding?"
                  className="border-gray-300 focus-visible:ring-gray-400"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message" className="text-gray-700">
                  Message
                </Label>
                <Textarea
                  id="message"
                  placeholder="Your message"
                  rows={5}
                  className="border-gray-300 focus-visible:ring-gray-400"
                />
              </div>

              <Button type="submit" variant="outline" className="border-gray-300 hover:bg-gray-50">
                Send Message
              </Button>
            </form>
          </div>

          <div>
            <h2 className="text-2xl font-light text-gray-900">Contact Information</h2>

            <div className="mt-6 space-y-6">
              <div>
                <h3 className="text-base font-medium text-gray-900">Email</h3>
                <p className="mt-1 text-gray-600">
                  <a href="mailto:artist@example.com" className="hover:underline">
                    artist@example.com
                  </a>
                </p>
              </div>

              <div>
                <h3 className="text-base font-medium text-gray-900">Studio</h3>
                <p className="mt-1 text-gray-600">
                  By appointment only
                  <br />
                  123 Studio Street
                  <br />
                  City, State 12345
                </p>
              </div>

              <div>
                <h3 className="text-base font-medium text-gray-900">Representation</h3>
                <p className="mt-1 text-gray-600">
                  Gallery Name
                  <br />
                  <a
                    href="https://www.gallery-website.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    www.gallery-website.com
                  </a>
                  <br />
                  gallery@example.com
                </p>
              </div>
            </div>

            <div className="mt-12">
              <h2 className="text-2xl font-light text-gray-900">Commissions</h2>
              <p className="mt-2 text-gray-600">
                I am available for select commission work. Please include the following information in your inquiry:
              </p>
              <ul className="mt-4 ml-5 space-y-2 text-gray-600 list-disc">
                <li>Desired size and medium</li>
                <li>Timeline</li>
                <li>Budget range</li>
                <li>Any specific themes or references</li>
              </ul>
              <p className="mt-4 text-gray-600">
                Commission pricing varies based on size, medium, and complexity. I typically require a 50% deposit to
                begin work.
              </p>
            </div>

            <div className="mt-12">
              <h2 className="text-2xl font-light text-gray-900">Newsletter</h2>
              <p className="mt-2 text-gray-600">
                Sign up to receive updates about new work, exhibitions, and studio news.
              </p>
              <div className="flex mt-4 space-x-4">
                <Input placeholder="Your email address" className="border-gray-300 focus-visible:ring-gray-400" />
                <Button variant="outline" className="border-gray-300 hover:bg-gray-50">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
