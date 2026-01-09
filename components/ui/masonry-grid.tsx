"use client"

import { useEffect, useState, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
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
  const containerRef = useRef<HTMLDivElement>(null)

  const calculateLayout = (containerWidth: number) => {
    if (!containerWidth || items.length === 0) return

    const columnWidth = (containerWidth - gap * (columns - 1)) / columns
    const columnHeights = new Array(columns).fill(0)
    const positioned: PositionedItem[] = []

    items.forEach((item, index) => {
      // Calculate scaled height based on aspect ratio from Contentful dimensions
      const aspectRatio = item.height / item.width
      const scaledHeight = columnWidth * aspectRatio

      const shortestColumnIndex = columnHeights.indexOf(Math.min(...columnHeights))
      const x = shortestColumnIndex * (columnWidth + gap)
      const y = columnHeights[shortestColumnIndex]

      positioned.push({
        ...item,
        width: columnWidth,
        height: scaledHeight,
        x,
        y,
        index,
      })

      columnHeights[shortestColumnIndex] += scaledHeight + gap
    })

    setPositionedItems(positioned)
    setContainerHeight(Math.max(...columnHeights) - gap)
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
      {positionedItems.map((item, idx) => (
        <motion.div
          key={item.title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{
            duration: 0.5,
            delay: idx * 0.025,
            ease: [0.25, 0.4, 0.25, 1],
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
            <div className="relative w-full h-full">
              <Image
                src={item.image.startsWith("//") ? `https:${item.image}` : item.image}
                alt={item.title}
                fill
                sizes={`${100 / columns}vw`}
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                priority={item.index < 6}
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-white font-medium text-lg mb-1 drop-shadow-lg">{item.title}</h3>
                  <p className="text-white/90 text-sm drop-shadow-lg">{item.year} · {item.category}</p>
                </div>
              </div>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  )
}

