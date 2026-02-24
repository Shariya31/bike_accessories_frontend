"use client"

import Image from "next/image"
import Link from "next/link"

const bikes = [
  {
    name: "Mountain Bike",
    slug: "mountain-bike",
    image: "/assets/images/banner/banner1.jpg",
  },
  {
    name: "Road Bike",
    slug: "road-bike",
    image: "/assets/images/banner/banner1.jpg",
  },
  {
    name: "Hybrid Bike",
    slug: "hybrid-bike",
    image: "/assets/images/banner/banner1.jpg",
  },
  {
    name: "Electric Bike",
    slug: "electric-bike",
    image: "/assets/images/banner/banner1.jpg",
  },
  {
    name: "Kids Bike",
    slug: "kids-bike",
    image: "/assets/images/banner/banner1.jpg",
  },
  {
    name: "City Bike",
    slug: "city-bike",
    image: "/assets/images/banner/banner1.jpg",
  },
]

export function ShopByBike() {
  return (
    <section className="w-full py-10">
      <div className="px-4 md:px-8">
        <h2 className="text-2xl font-semibold mb-6">Shop by Bike</h2>

        <div className="relative">
          <div className="flex gap-5 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-4">
            {bikes.map((bike) => (
              <Link
                key={bike.slug}
                href={`/category/${bike.slug}`}
                className="min-w-[180px] md:min-w-[220px] snap-start"
              >
                <div className="rounded-2xl border bg-card hover:shadow-lg transition p-4 flex flex-col items-center">
                  <div className="relative w-full h-[140px]">
                    <Image
                      src={bike.image}
                      alt={bike.name}
                      fill
                      className="object-contain"
                    />
                  </div>

                  <p className="mt-3 font-medium text-center">
                    {bike.name}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}