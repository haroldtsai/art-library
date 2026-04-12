'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'

interface Props {
  primary: string
  title: string
  extras: string[]
}

export default function ItemGallery({ primary, title, extras }: Props) {
  const all = [primary, ...extras]
  const [index, setIndex] = useState(0)
  const touchStartX = useRef<number | null>(null)

  function prev() { setIndex((i) => (i - 1 + all.length) % all.length) }
  function next() { setIndex((i) => (i + 1) % all.length) }

  function onTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX
  }

  function onTouchEnd(e: React.TouchEvent) {
    if (touchStartX.current === null) return
    const dx = e.changedTouches[0].clientX - touchStartX.current
    if (dx > 50) prev()
    else if (dx < -50) next()
    touchStartX.current = null
  }

  return (
    <div
      className="relative select-none"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* Main image */}
      <Image
        src={all[index]}
        alt={`${title} ${index + 1}`}
        width={1400}
        height={1400}
        className="w-full h-auto saturate-[0.85] contrast-[1.03] block"
        priority={index === 0}
      />

      {/* Dots — only shown when multiple images */}
      {all.length > 1 && (
        <div className="flex justify-center gap-[7px] py-4">
          {all.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              aria-label={`Photo ${i + 1}`}
              className="rounded-full transition-all duration-200"
              style={{
                width: i === index ? 20 : 6,
                height: 6,
                background: i === index ? 'var(--accent)' : 'var(--rule)',
              }}
            />
          ))}
        </div>
      )}
    </div>
  )
}
