"use client";

import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const slides = [
  {
    image: "/assets/images/banner/banner1.jpg",
    title: "Premium Bike Crash Guards",
    subtitle: "Ride Protected",
  },
  {
    image: "/assets/images/banner/banner2.jpg",
    title: "Fog Lights & Lighting",
    subtitle: "See Beyond Limits",
  },
  {
    image: "/assets/images/banner/banner3.jpg",
    title: "Accessories for Every Bike",
    subtitle: "Yamaha • KTM • RE",
  },
];

export function HeroCarousel() {
  return (
    <div className="relative">
      <Carousel
        opts={{ loop: true }}
        plugins={[Autoplay({ delay: 4000 })]}
        className="w-full"
      >
        <CarouselContent>
          {slides.map((slide, i) => (
            <CarouselItem key={i}>
              <div className="relative w-full h-[260px] md:h-[360px] lg:h-[460px] rounded-xl overflow-hidden bg-black">
            
                {/* main image */}
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  priority
                  className="object-cover object-center"
                />

                {/* overlay text */}
                <div className="absolute inset-0 flex items-center">
                  <div className="px-6 md:px-12">
                    <h2 className="text-white text-xl md:text-3xl lg:text-4xl font-bold">
                      {slide.title}
                    </h2>
                    <p className="text-white/90 mt-2 md:text-lg">
                      {slide.subtitle}
                    </p>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="left-3 md:left-6" />
        <CarouselNext className="right-3 md:right-6" />
      </Carousel>
    </div>
  );
}