import type React from "react"
import "@/app/globals.css"
import { Montserrat, Playfair_Display } from "next/font/google"
import Link from "next/link"
import Image from "next/image"
import { HomeContextProvider } from "@/app/lib/context/homeContextProvider"
import { siInstagram, siFacebook, siGmail } from "simple-icons"
import { NavigationMenu } from "@/components/ui/navigation-menu"

import { getAboutPageContent, getHomePageContent } from "@/app/lib/contentful/api"

// Primary font for body text
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"], 
  variable: "--font-montserrat",
})

// Secondary font for headings
const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-playfair",
})

export const metadata = {
  title: "JEART - Artist Portfolio",
  description: "A minimal portfolio for showcasing artwork",
  generator: "v0.dev",
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const homePageContent = await getHomePageContent()
  const aboutPageContent = await getAboutPageContent()

  return (
    
    <html lang="en">
      <link rel="icon" href="/images/bng.png" sizes="any" />
      <body className={`${montserrat.variable} ${playfair.variable} font-sans`}>
        {/* <ThemeProvider attribute="class" defaultTheme="light"> */}
        <div className="flex flex-col min-h-screen">
          <header className="py-6 bg-white">
            <div className="container px-4 mx-auto max-w-6xl">
              <div className="flex items-center justify-between">
                <Link href="/" className="flex items-center">
                  <div className="relative w-16 h-16">
                    <Image src="/images/bng.png" alt="JEART Logo" fill className="object-contain" priority />
                  </div>
                </Link>

                {/* Navigation Menu Component */}
                <NavigationMenu />

                {/* Empty div to balance the layout */}
                <div className="hidden md:block w-12"></div>
              </div>
            </div>
          </header>
          <main className="flex-1">
            <HomeContextProvider homePageContent={homePageContent} aboutPageContent={aboutPageContent}>
              {children}
            </HomeContextProvider>
          </main>
          <footer className="py-12 bg-white">
            <div className="container px-4 mx-auto max-w-6xl">
              <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
                <div className="text-sm text-gray-500">&copy; {new Date().getFullYear()} Jeremy Evans</div>
                <div className="flex space-x-6">
                  <Link
                    href="https://www.instagram.com/evansart21/?hl=en"
                    className="text-gray-500 hover:text-gray-900"
                    target="_blank"
                  >
                    <div
                      dangerouslySetInnerHTML={{ __html: siInstagram.svg }}
                      className="w-6 h-6"
                      style={{ fill: "currentColor" }}
                    />
                  </Link>
                  <Link
                    href="https://www.facebook.com/jeremy.evans.5055/"
                    className="text-gray-500 hover:text-gray-900"
                    target="_blank"
                  >
                    <div
                      dangerouslySetInnerHTML={{ __html: siFacebook.svg }}
                      className="w-6 h-6"
                      style={{ fill: "currentColor" }}
                    />
                  </Link>
                  <Link
                    href="mailto:jeremyevansart@gmail.com"
                    target="_blank"
                    className="text-gray-500 hover:text-gray-900"
                  >
                    <div
                      dangerouslySetInnerHTML={{ __html: siGmail.svg }}
                      className="w-6 h-6"
                      style={{ fill: "currentColor" }}
                    />
                  </Link>
                </div>
              </div>
            </div>
          </footer>
        </div>
        {/* </ThemeProvider> */}
      </body>
    </html>
  )
}
