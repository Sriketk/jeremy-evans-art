"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import useMobile from "@/hooks/use-mobile"

interface GalleryNavigationProps {
  categories: {
    key: string
    label: string
    count?: number
  }[]
  activeCategory: string
  onCategoryChange: (category: string) => void
}

export default function GalleryNavigation({ categories, activeCategory, onCategoryChange }: GalleryNavigationProps) {
  const isMobile = useMobile()
  const [isOpen, setIsOpen] = useState(false)

  const activeLabel = categories.find((cat) => cat.key === activeCategory)?.label || "Shoes"

  return (
    <>
      {/* Mobile Navigation - Always rendered but conditionally visible */}
      <div className={`w-full mb-8 ${isMobile ? 'block' : 'hidden'}`}>
        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-full justify-between h-12 text-left font-medium">
              <span>{activeLabel}</span>
              <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-full min-w-[var(--radix-dropdown-menu-trigger-width)]">
            {categories.map((category) => (
              <DropdownMenuItem
                key={category.key}
                onClick={() => {
                  onCategoryChange(category.key)
                  setIsOpen(false)
                }}
                className={`cursor-pointer py-3 px-4 ${
                  activeCategory === category.key ? "bg-gray-100 font-medium" : "hover:bg-gray-50"
                }`}
              >
                <div className="flex justify-between items-center w-full">
                  <span>{category.label}</span>
                  {category.count && <span className="text-sm text-gray-500 ml-2">({category.count})</span>}
                </div>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Desktop Navigation - Always rendered but conditionally visible */}
      <div className={`flex flex-wrap gap-2 mb-8 justify-center ${isMobile ? 'hidden' : 'flex'}`}>
        {categories.map((category) => (
          <Button
            key={category.key}
            variant={activeCategory === category.key ? "default" : "outline"}
            onClick={() => onCategoryChange(category.key)}
            className={`transition-all duration-300 hover:scale-105 ${
              activeCategory === category.key
                ? "bg-gray-900 text-white shadow-lg"
                : "border-gray-300 hover:bg-gray-50 hover:border-gray-400"
            }`}
          >
            {category.label}
            {category.count && <span className="ml-2 text-sm opacity-75">({category.count})</span>}
          </Button>
        ))}
      </div>
    </>
  )
}
