"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"

export function NavigationMenu() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={toggleMenu}
        className="md:hidden text-gray-500 hover:text-gray-900 focus:outline-none"
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 space-x-8">
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

      {/* Mobile Navigation Overlay */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-white">
          <div className="flex flex-col h-full">
            <div className="flex justify-between items-center p-6 border-b">
              <span className="font-playfair text-xl">Menu</span>
              <button
                onClick={toggleMenu}
                className="text-gray-500 hover:text-gray-900 focus:outline-none"
                aria-label="Close menu"
              >
                <X size={24} />
              </button>
            </div>
            <nav className="flex flex-col p-6 space-y-6">
              <Link href="/" className="text-lg text-gray-800 hover:text-gray-900 font-medium" onClick={toggleMenu}>
                Home
              </Link>
              <Link
                href="/gallery"
                className="text-lg text-gray-800 hover:text-gray-900 font-medium"
                onClick={toggleMenu}
              >
                Gallery
              </Link>
              <Link
                href="/about"
                className="text-lg text-gray-800 hover:text-gray-900 font-medium"
                onClick={toggleMenu}
              >
                About
              </Link>
              <Link
                href="/contact"
                className="text-lg text-gray-800 hover:text-gray-900 font-medium"
                onClick={toggleMenu}
              >
                Contact
              </Link>
            </nav>
          </div>
        </div>
      )}
    </>
  )
}
