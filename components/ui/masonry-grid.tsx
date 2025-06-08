"use client"

import { useEffect, useState, useRef } from "react"
import Image from "next/image"
import Link from "next/link"

interface MasonryItem {
  title: string
  description: string
  image: string
  year: number
  category: string
  slug: string
}

interface MasonryGridProps {
  items: MasonryItem[]
  isVisible: boolean
  columns?: number
  gap?: number
}

interface PositionedItem extends MasonryItem {
  width: number
  height: number
  x: number
  y: number
  index: number
}

export default function MasonryGrid({ items, isVisible, columns = 3, gap = 16 }: MasonryGridProps) {
  const [positionedItems, setPositionedItems] = useState<PositionedItem[]>([])
  const [containerHeight, setContainerHeight] = useState(0)
  const [containerWidth, setContainerWidth] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  // Calculate masonry layout
  const calculateLayout = async (containerWidth: number) => {
    if (!containerWidth || items.length === 0) return

    const columnWidth = (containerWidth - gap * (columns - 1)) / columns
    const columnHeights = new Array(columns).fill(0)
    const positioned: PositionedItem[] = []

    // Load all images to get their dimensions
    const imagePromises = items.map((item, index) => {
      return new Promise<{ width: number; height: number; index: number }>((resolve) => {
        const img = new window.Image()
        img.crossOrigin = "anonymous"
        img.onload = () => {
          // Calculate scaled height to fit column width
          const aspectRatio = img.height / img.width
          const scaledHeight = columnWidth * aspectRatio
          resolve({ width: columnWidth, height: scaledHeight, index })
        }
        img.onerror = () => {
          // Fallback dimensions
          resolve({ width: columnWidth, height: columnWidth * 1.2, index })
        }
        img.src = item.image.startsWith("//") ? `https:${item.image}` : item.image
      })
    })

    try {
      const imageDimensions = await Promise.all(imagePromises)

      // Sort by original index to maintain order
      imageDimensions.sort((a, b) => a.index - b.index)

      imageDimensions.forEach(({ width, height, index }) => {
        // Find the shortest column
        const shortestColumnIndex = columnHeights.indexOf(Math.min(...columnHeights))

        const x = shortestColumnIndex * (columnWidth + gap)
        const y = columnHeights[shortestColumnIndex]

        positioned.push({
          ...items[index],
          width,
          height,
          x,
          y,
          index,
        })

        // Update column height
        columnHeights[shortestColumnIndex] += height + gap
      })

      setPositionedItems(positioned)
      setContainerHeight(Math.max(...columnHeights) - gap)
    } catch (error) {
      console.error("Error calculating masonry layout:", error)
    }
  }

  // Handle resize
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const width = containerRef.current.offsetWidth
        setContainerWidth(width)
        calculateLayout(width)
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [items, columns, gap])

  return (
    <div ref={containerRef} className="relative w-full" style={{ height: containerHeight }}>
      {positionedItems.map((item, index) => (
        <Link
          key={item.title}
          href={`/gallery/${item.slug}`}
          className={`absolute group overflow-hidden transition-all duration-1000 ease-out hover:z-10 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{
            left: item.x,
            top: item.y,
            width: item.width,
            height: item.height,
            transitionDelay: `${800 + index * 100}ms`,
          }}
        >
          <div className="relative w-full h-full rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
            <Image
              src={item.image.startsWith("//") ? `https:${item.image}` : item.image}
              alt={item.title}
              fill
              sizes={`${100 / columns}vw`}
              className="object-cover transition-all duration-700 ease-in-out group-hover:scale-105"
            />

            {/* Overlay with artwork info */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 transition-all duration-500 group-hover:opacity-100">
              <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <h3 className="text-white font-medium text-lg mb-1 drop-shadow-lg">{item.title}</h3>
                <p className="text-white/90 text-sm drop-shadow-lg">
                  {item.year} · {item.category}
                </p>
              </div>
            </div>

            {/* Subtle border glow on hover */}
            <div className="absolute inset-0 border-2 border-white/0 group-hover:border-white/20 transition-all duration-500 rounded-lg pointer-events-none"></div>
          </div>
        </Link>
      ))}
    </div>
  )
}
