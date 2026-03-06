"use client"

import Image from "next/image"
import Link from "next/link"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

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
    <section className="w-full py-12">
      <div className="px-4 md:px-8">

        {/* TITLE */}
        <h2 className="text-2xl font-semibold mb-8">
          Shop by Bike
        </h2>

        <div className="relative">

          {/* GRADIENT EDGES */}
          <div className="pointer-events-none absolute left-0 top-0 h-full w-12 bg-gradient-to-r from-background to-transparent z-10" />
          <div className="pointer-events-none absolute right-0 top-0 h-full w-12 bg-gradient-to-l from-background to-transparent z-10" />

          <Carousel
            opts={{
              align: "start",
              dragFree: true,
            }}
            className="w-full"
          >

            <CarouselContent className="-ml-4">

              {bikes.map((bike) => (
                <CarouselItem
                  key={bike.slug}
                  className="pl-4 basis-[180px] md:basis-[220px]"
                >
                  <Link href={`/category/${bike.slug}`}>

                    <div
                      className="
                      group
                      rounded-2xl
                      border
                      bg-card
                      p-5
                      flex flex-col items-center
                      transition-all
                      duration-300
                      hover:shadow-xl
                      hover:-translate-y-1
                      "
                    >

                      {/* IMAGE */}
                      <div className="relative w-full h-[140px] overflow-hidden">

                        <Image
                          src={bike.image}
                          alt={bike.name}
                          fill
                          className="
                          object-contain
                          transition-transform
                          duration-300
                          group-hover:scale-110
                          "
                        />

                      </div>

                      {/* TITLE */}
                      <p className="mt-4 font-medium text-center">
                        {bike.name}
                      </p>

                    </div>

                  </Link>
                </CarouselItem>
              ))}

            </CarouselContent>

            {/* NAVIGATION BUTTONS */}

            <CarouselPrevious
              className="
              -left-4
              shadow-md
              bg-background
              border
              hover:bg-accent
              "
            />

            <CarouselNext
              className="
              -right-4
              shadow-md
              bg-background
              border
              hover:bg-accent
              "
            />

          </Carousel>

        </div>

      </div>
    </section>
  )
}