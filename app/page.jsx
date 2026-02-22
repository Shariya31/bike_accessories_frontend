import { HeroCarousel } from '@/components/application/Carousel/HeroCarousel';
import { Button } from '@/components/ui/button'
import React from 'react'

const page = () => {
  return (
    <div className="space-y-8">
      {/* HERO */}
      <HeroCarousel />

      {/* POPULAR BIKES */}
      <section>
        <h2 className="text-xl font-semibold mb-4">
          Popular Bikes
        </h2>
      </section>

      {/* CATEGORIES */}
      <section>
        <h2 className="text-xl font-semibold mb-4">
          Shop by Category
        </h2>
      </section>
    </div>
  );
}

export default page
