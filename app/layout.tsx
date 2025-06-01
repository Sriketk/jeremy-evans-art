import "@/app/globals.css"
import { Inter } from "next/font/google"
import Link from "next/link"

import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"], weight: ["300", "400", "500"] })

export const metadata = {
  title: "Artist Portfolio",
  description: "A minimal portfolio for showcasing artwork",
    generator: 'v0.dev'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light">
          <div className="flex flex-col min-h-screen">
            <header className="py-6 bg-white">
              <div className="container px-4 mx-auto max-w-6xl">
                <div className="flex items-center justify-between">
                  <Link href="/" className="text-xl font-light text-gray-900">
                    Artist Name
                  </Link>
                  <nav className="hidden space-x-8 md:flex">
                    <Link href="/" className="text-sm text-gray-500 transition-colors hover:text-gray-900">
                      Home
                    </Link>
                    <Link href="/gallery" className="text-sm text-gray-500 transition-colors hover:text-gray-900">
                      Gallery
                    </Link>
                    <Link href="/about" className="text-sm text-gray-500 transition-colors hover:text-gray-900">
                      About
                    </Link>
                    <Link href="/contact" className="text-sm text-gray-500 transition-colors hover:text-gray-900">
                      Contact
                    </Link>
                  </nav>
                  <div className="md:hidden">
                    {/* Mobile menu button would go here */}
                    <button className="text-gray-500">Menu</button>
                  </div>
                </div>
              </div>
            </header>
            <main className="flex-1">{children}</main>
            <footer className="py-12 bg-white">
              <div className="container px-4 mx-auto max-w-6xl">
                <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
                  <div className="text-sm text-gray-500">
                    &copy; {new Date().getFullYear()} Artist Name. All rights reserved.
                  </div>
                  <div className="flex space-x-6">
                    <Link href="#" className="text-sm text-gray-500 hover:text-gray-900">
                      Instagram
                    </Link>
                    <Link href="#" className="text-sm text-gray-500 hover:text-gray-900">
                      LinkedIn
                    </Link>
                    <Link href="mailto:artist@example.com" className="text-sm text-gray-500 hover:text-gray-900">
                      Email
                    </Link>
                  </div>
                </div>
              </div>
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
