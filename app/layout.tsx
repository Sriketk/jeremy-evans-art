import "@/app/globals.css";
import { Montserrat, Playfair_Display } from "next/font/google";
import Link from "next/link";
import Image from "next/image";
import { ThemeProvider } from "@/components/theme-provider";
import * as contentful from "contentful";
import { HomeContextProvider } from "@/app/lib/context/homeContextProvider";
import { getHomePageContent } from "@/app/lib/contentful/api";

// Primary font for body text
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-montserrat",
});

// Secondary font for headings
const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-playfair",
});

export const metadata = {
  title: "JEART - Artist Portfolio",
  description: "A minimal portfolio for showcasing artwork",
  generator: "v0.dev",
};

export default async function RootLayout({ children }) {
  const homePageContent = await getHomePageContent();

  console.log(homePageContent);
  return (
    <html lang="en">
      <body className={`${montserrat.variable} ${playfair.variable} font-sans`}>
        {/* <ThemeProvider attribute="class" defaultTheme="light"> */}
        <div className="flex flex-col min-h-screen">
          <header className="py-6 bg-white">
            <div className="container px-4 mx-auto max-w-6xl">
              <div className="flex items-center justify-between">
                <Link href="/" className="flex items-center">
                  <div className="relative w-12 h-12">
                    <Image
                      src="/images/logo.jpeg"
                      alt="JEART Logo"
                      fill
                      className="object-contain"
                      priority
                    />
                  </div>
                </Link>

                {/* Centered Navigation */}
                <nav className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 space-x-8">
                  <Link
                    href="/"
                    className="text-sm text-gray-500 transition-colors hover:text-gray-900"
                  >
                    Home
                  </Link>
                  <Link
                    href="/gallery"
                    className="text-sm text-gray-500 transition-colors hover:text-gray-900"
                  >
                    Gallery
                  </Link>
                  <Link
                    href="/about"
                    className="text-sm text-gray-500 transition-colors hover:text-gray-900"
                  >
                    About
                  </Link>
                  <Link
                    href="/contact"
                    className="text-sm text-gray-500 transition-colors hover:text-gray-900"
                  >
                    Contact
                  </Link>
                </nav>

                {/* Mobile menu button */}
                <div className="md:hidden">
                  <button className="text-gray-500">Menu</button>
                </div>

                {/* Empty div to balance the layout */}
                <div className="hidden md:block w-12"></div>
              </div>
            </div>
          </header>
          <main className="flex-1">
            <HomeContextProvider value={{ homePageContent }}>
              {children}
            </HomeContextProvider>
          </main>
          <footer className="py-12 bg-white">
            <div className="container px-4 mx-auto max-w-6xl">
              <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
                <div className="text-sm text-gray-500">
                  &copy; {new Date().getFullYear()} Jeremy Evans
                </div>
                <div className="flex space-x-6">
                  <Link
                    href="#"
                    className="text-sm text-gray-500 hover:text-gray-900"
                  >
                    Instagram
                  </Link>
                  <Link
                    href="#"
                    className="text-sm text-gray-500 hover:text-gray-900"
                  >
                    LinkedIn
                  </Link>
                  <Link
                    href="mailto:artist@example.com"
                    className="text-sm text-gray-500 hover:text-gray-900"
                  >
                    Email
                  </Link>
                </div>
              </div>
            </div>
          </footer>
        </div>
        {/* </ThemeProvider> */}
      </body>
    </html>
  );
}
