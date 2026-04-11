'use client'

import { useState } from 'react'
import Image from 'next/image'

interface Props {
  primary: string
  title: string
  extras: string[]
  captionLabel?: string
}

export default function ItemGallery({ primary, title, extras, captionLabel }: Props) {
  const [active, setActive] = useState(primary)

  return (
    <>
      {/* Hero */}
      <div className="overflow-hidden w-full">
        <Image
          src={active}
          alt={title}
          width={1400}
          height={1400}
          className="w-full h-auto saturate-[0.85] contrast-[1.03]"
          style={{ display: 'block' }}
          priority
        />
        {captionLabel && (
          <span className="absolute bottom-4 right-5 label opacity-50 text-white"
            style={{ fontSize: '0.5rem' }}>
            {captionLabel}
          </span>
        )}
      </div>

      {/* Thumbnails */}
      {extras.length > 0 && (
        <div className="grid gap-px bg-[var(--rule)] mt-5" style={{ gridTemplateColumns: '1fr 1fr' }}>
          {[primary, ...extras].map((src) => (
            <button key={src} onClick={() => setActive(src)}
              className={`overflow-hidden relative block border-2 transition-all ${
                active === src ? 'border-[var(--accent)]' : 'border-transparent'
              }`}
              style={{ height: 70 }}>
              <Image src={src} alt={title} fill className="object-cover saturate-75 hover:saturate-100 transition-all" />
            </button>
          ))}
        </div>
      )}
    </>
  )
}
