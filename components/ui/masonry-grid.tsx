"use client"

import { useEffect, useState, useRef } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import type { Artwork } from "@/app/lib/types"

interface MasonryGridProps {
  items: Artwork[]
  columns?: number
  gap?: number
}

interface PositionedItem extends Artwork {
  width: number
  height: number
  x: number
  y: number
  index: number
}

export default function MasonryGrid({
  items,
  columns = 3,
  gap = 16,
}: MasonryGridProps) {
  const [positionedItems, setPositionedItems] = useState<PositionedItem[]>([])
  const [containerHeight, setContainerHeight] = useState(0)
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set())
  const containerRef = useRef<HTMLDivElement>(null)

  const calculateLayout = async (containerWidth: number) => {
    if (!containerWidth || items.length === 0) return

    const columnWidth = (containerWidth - gap * (columns - 1)) / columns
    const columnHeights = new Array(columns).fill(0)
    const positioned: PositionedItem[] = []

    const imagePromises = items.map((item, index) => {
      return new Promise<{ width: number; height: number; index: number }>((resolve) => {
        const img = new window.Image()
        img.crossOrigin = "anonymous"
        img.onload = () => {
          const aspectRatio = img.height / img.width
          const scaledHeight = columnWidth * aspectRatio
          resolve({ width: columnWidth, height: scaledHeight, index })
        }
        img.onerror = () => resolve({ width: columnWidth, height: columnWidth * 1.2, index })
        img.src = item.image.startsWith("//") ? `https:${item.image}` : item.image
      })
    })

    try {
      const imageDimensions = await Promise.all(imagePromises)
      imageDimensions.sort((a, b) => a.index - b.index)

      imageDimensions.forEach(({ width, height, index }) => {
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

        columnHeights[shortestColumnIndex] += height + gap
      })

      setPositionedItems(positioned)
      setContainerHeight(Math.max(...columnHeights) - gap)
    } catch (error) {
      console.error("Error calculating masonry layout:", error)
    }
  }

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        calculateLayout(containerRef.current.offsetWidth)
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [items, columns, gap])

  return (
    <div ref={containerRef} className="relative w-full" style={{ height: containerHeight }}>
      {positionedItems.map((item) => (
        <motion.div
          key={item.title}
          initial={{ opacity: 0, y: 60, scale: 0.8 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ 
            duration: 0.6, 
            delay: item.index * 0.1,
            ease: [0.21, 1.11, 0.81, 0.99]
          }}
          style={{
            position: "absolute",
            left: item.x,
            top: item.y,
            width: item.width,
            height: item.height,
          }}
        >
          <Link
            href={`/gallery/${item.slug}`}
            className="block group relative w-full h-full rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
              className="relative w-full h-full"
            >
              <Image
                src={item.image.startsWith("//") ? `https:${item.image}` : item.image}
                alt={item.title}
                fill
                sizes={`${100 / columns}vw`}
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                onLoad={() => setLoadedImages(prev => new Set([...prev, item.index]))}
                priority={item.index < 3}
              />

              {!loadedImages.has(item.index) && (
                <div className="absolute inset-0 bg-gray-100 animate-pulse flex items-center justify-center">
                  <div className="w-6 h-6 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
                </div>
              )}

              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-white font-medium text-lg mb-1 drop-shadow-lg">{item.title}</h3>
                  <p className="text-white/90 text-sm drop-shadow-lg">{item.year} · {item.category}</p>
                </div>
              </div>
            </motion.div>
          </Link>
        </motion.div>
      ))}
    </div>
  )
}

