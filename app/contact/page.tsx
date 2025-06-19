
import ContactForm  from "./contact-form";

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
            <ContactForm />
          </div>

          <div>
            <h2 className="text-2xl font-light text-gray-900">
              Contact Information
            </h2>

            <div className="mt-6 space-y-6">
              <div>
                <h3 className="text-base font-medium text-gray-900">Email</h3>
                <p className="mt-1 text-gray-600">
                  <a
                    href="mailto:jeremyevansart@gmail.com"
                    className="hover:underline"
                  >
                    jeremyevansart@gmail.com
                  </a>
                </p>
              </div>

              <div>
                <h3 className="text-base font-medium text-gray-900">Studio</h3>
                <p className="mt-1 text-gray-600">By appointment only</p>
              </div>

              <div>
                <h3 className="text-base font-medium text-gray-900">
                  Instagram
                </h3>
                <p className="mt-1 text-gray-600">
                  <a
                    href="https://www.instagram.com/evansart21/?hl=en"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    @evansart21
                  </a>
                </p>
              </div>

              <div>
                <h3 className="text-base font-medium text-gray-900">
                  Facebook
                </h3>
                <p className="mt-1 text-gray-600">
                  <a
                    href="https://www.facebook.com/jeremy.evans.5055/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"

                  
                  >
                    Jeremy Evans
                  </a>
                </p>
              </div>
            </div>

            <div className="mt-8">
              <h2 className="text-2xl font-light text-gray-900">Commissions</h2>
              <p className="mt-2 text-gray-600">
                I am available for select commission work. Please include the
                following information in your inquiry:
              </p>
              <ul className="mt-4 ml-5 space-y-2 text-gray-600 list-disc">
                <li>Desired size and medium</li>
                <li>Timeline</li>
                <li>Budget range</li>
                <li>Any specific themes or references</li>
              </ul>
              <p className="mt-4 text-gray-600">
                Commission pricing varies based on size, medium, and complexity.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
