"use client";

import Link from "next/link";
import { Menu, ShoppingCart } from "lucide-react";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetHeader,
} from "@/components/ui/sheet";

import { bikeSidebarData } from "@/components/application/Sidebar/sidebarData";

export function Navbar() {
  const bikeBrands = bikeSidebarData.filter(
    (item) =>
      !["Protections", "Lighting", "Accessories"].includes(item.title)
  );

  const categories = bikeSidebarData.filter((item) =>
    ["Protections", "Lighting", "Accessories"].includes(item.title)
  );

  return (
    <header className="border-b bg-background">
      <div className="container mx-auto flex h-14 items-center justify-between px-4">
      <div className="flex items-center gap-3">

        {/* LOGO */}
        <Link href="/" className="font-bold text-lg">
          BikeStore
        </Link>

        {/* DESKTOP */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>

            {/* BIKES */}
            <NavigationMenuItem>
              <NavigationMenuTrigger>
                Bikes
              </NavigationMenuTrigger>

              <NavigationMenuContent>
                <div className="p-6 w-[80vw] max-h-[60vh] overflow-y-auto">
                  <div className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-6">
                    {bikeBrands.map((brand) => (
                      <div key={brand.title}>
                        <p className="font-semibold mb-2">
                          {brand.title}
                        </p>

                        <div className="flex flex-col gap-1">
                          {brand.links.map((link) => (
                            <NavigationMenuLink key={link.href} asChild>
                              <Link
                                href={link.href}
                                className="text-sm hover:underline"
                              >
                                {link.label}
                              </Link>
                            </NavigationMenuLink>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>

            {/* ACCESSORIES */}
            <NavigationMenuItem>
              <NavigationMenuTrigger>
                Accessories
              </NavigationMenuTrigger>

              <NavigationMenuContent>
                <div className="p-6 w-[80vw] max-h-[60vh] overflow-y-auto">
                  <div className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-6">
                    {categories.map((cat) => (
                      <div key={cat.title}>
                        <p className="font-semibold mb-2">
                          {cat.title}
                        </p>

                        <div className="flex flex-col gap-1">
                          {cat.links.map((link) => (
                            <NavigationMenuLink key={link.href} asChild>
                              <Link
                                href={link.href}
                                className="text-sm hover:underline"
                              >
                                {link.label}
                              </Link>
                            </NavigationMenuLink>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>

          </NavigationMenuList>
        </NavigationMenu>
      </div>

        {/* RIGHT */}
        <div className="flex items-center gap-3">
          <ShoppingCart className="w-5 h-5" />

          {/* MOBILE */}
          <Sheet>
            <SheetTrigger className="md:hidden">
              <Menu className="w-6 h-6" />
            </SheetTrigger>

            <SheetContent side="left" className="w-80 overflow-y-auto">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>

              <div className="mt-6">
                <Accordion type="single" collapsible>

                  {/* BIKES */}
                  <AccordionItem value="bikes">
                    <AccordionTrigger className="font-semibold">
                      Bikes
                    </AccordionTrigger>

                    <AccordionContent>
                      {bikeBrands.map((brand) => (
                        <Accordion
                          key={brand.title}
                          type="single"
                          collapsible
                          className="ml-2"
                        >
                          <AccordionItem value={brand.title}>
                            <AccordionTrigger className="text-sm">
                              {brand.title}
                            </AccordionTrigger>

                            <AccordionContent>
                              <div className="ml-3 flex flex-col gap-1">
                                {brand.links.map((link) => (
                                  <Link
                                    key={link.href}
                                    href={link.href}
                                    className="text-sm text-muted-foreground"
                                  >
                                    {link.label}
                                  </Link>
                                ))}
                              </div>
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>
                      ))}
                    </AccordionContent>
                  </AccordionItem>

                  {/* ACCESSORIES */}
                  <AccordionItem value="accessories">
                    <AccordionTrigger className="font-semibold">
                      Accessories
                    </AccordionTrigger>

                    <AccordionContent>
                      {categories.map((cat) => (
                        <Accordion
                          key={cat.title}
                          type="single"
                          collapsible
                          className="ml-2"
                        >
                          <AccordionItem value={cat.title}>
                            <AccordionTrigger className="text-sm">
                              {cat.title}
                            </AccordionTrigger>

                            <AccordionContent>
                              <div className="ml-3 flex flex-col gap-1">
                                {cat.links.map((link) => (
                                  <Link
                                    key={link.href}
                                    href={link.href}
                                    className="text-sm text-muted-foreground"
                                  >
                                    {link.label}
                                  </Link>
                                ))}
                              </div>
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>
                      ))}
                    </AccordionContent>
                  </AccordionItem>

                </Accordion>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}