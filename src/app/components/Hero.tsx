'use client'

import { useEffect } from 'react'
import { ChevronDown } from 'lucide-react'

export default function Hero() {
  useEffect(() => {
    // Initialize UnicornStudio after script load
    if ((window as any).UnicornStudio) {
      (window as any).UnicornStudio.init()
    }
  }, [])

  return (
    <section id="hero" className="relative h-screen overflow-hidden">
      {/* NEW HOMEPAGE THEME */}
      <div
        data-us-project="iiz8L42RtpZaTOyA1y6Y"
        className="absolute inset-0 w-full h-full z-0"
      />

      {/* Search/Scroll hint or other content would go here if it was in the original, but the original only had the chevron */}
      {/* Minimal scroll hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 animate-bounce">
        <ChevronDown className="w-6 h-6 text-white/50" />
      </div>
    </section>
  )
}
