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
import { useAuth } from "@/hooks/auth/useAuth";
import { useLogout } from "@/hooks/auth/useLogout";
import { useDispatch } from "react-redux";
import { logout as reduxLogout } from '../../../store/slices/authSlice'
import { useRouter } from "next/navigation";
import { useEffect } from "react";
export function Navbar() {
  const bikeBrands = bikeSidebarData.filter(
    (item) =>
      !["Protections", "Lighting", "Accessories"].includes(item.title)
  );

  const categories = bikeSidebarData.filter((item) =>
    ["Protections", "Lighting", "Accessories"].includes(item.title)
  );

  const { data: user, isError, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isError) {
      router.push("/auth/login");
    }
  }, [isError]);

  const { mutateAsync: logout, isPending } = useLogout();
  // const dispatch = useDispatch();
  const handleLogout = async () => {
    try {
      const res = await logout();
      console.log(res.status, 'res')
      if (res?.status === 200) {
        // dispatch(reduxLogout())
      }
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-14 items-center justify-between px-4">

        {/* LEFT */}
        <div className="flex items-center gap-6">

          {/* LOGO */}
          <Link href="/" className="text-lg font-bold tracking-wide text-primary">
            BikeStore
          </Link>

          {/* DESKTOP MENU */}
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>

              {/* BIKES */}
              <NavigationMenuItem>
                <NavigationMenuTrigger
                  className="
                  rounded-md px-3 py-2 font-medium
                  transition
                  hover:bg-accent hover:text-accent-foreground
                  data-[state=open]:bg-accent
                  data-[state=open]:text-accent-foreground
                  "
                >
                  Bikes
                </NavigationMenuTrigger>

                <NavigationMenuContent>
                  <div className="p-6 w-[80vw] max-h-[65vh] overflow-y-auto bg-popover border border-border rounded-xl shadow-lg">

                    <div className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-5">

                      {bikeBrands.map((brand) => (
                        <div
                          key={brand.title}
                          className="
                          p-3
                          rounded-lg
                          border border-border/50
                          bg-muted/30
                          hover:bg-muted/60
                          transition
                          "
                        >
                          <p className="font-semibold text-sm mb-3 text-foreground">
                            {brand.title}
                          </p>

                          <div className="flex flex-col gap-2">
                            {brand.links.map((link) => (
                              <NavigationMenuLink key={link.href} asChild>
                                <Link
                                  href={link.href}
                                  className="
                                  text-sm
                                  px-2 py-1
                                  rounded-md
                                  text-muted-foreground
                                  transition
                                  hover:bg-accent
                                  hover:text-accent-foreground
                                  "
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
                <NavigationMenuTrigger
                  className="
                  rounded-md px-3 py-2 font-medium
                  transition
                  hover:bg-accent hover:text-accent-foreground
                  data-[state=open]:bg-accent
                  data-[state=open]:text-accent-foreground
                  "
                >
                  Accessories
                </NavigationMenuTrigger>

                <NavigationMenuContent>
                  <div className="p-6 w-[80vw] max-h-[65vh] overflow-y-auto bg-popover border border-border rounded-xl shadow-lg">

                    <div className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-5">

                      {categories.map((cat) => (
                        <div
                          key={cat.title}
                          className="
                          p-3
                          rounded-lg
                          border border-border/50
                          bg-muted/30
                          hover:bg-muted/60
                          transition
                          "
                        >
                          <p className="font-semibold text-sm mb-3 text-foreground">
                            {cat.title}
                          </p>

                          <div className="flex flex-col gap-2">
                            {cat.links.map((link) => (
                              <NavigationMenuLink key={link.href} asChild>
                                <Link
                                  href={link.href}
                                  className="
                                  text-sm
                                  px-2 py-1
                                  rounded-md
                                  text-muted-foreground
                                  transition
                                  hover:bg-accent
                                  hover:text-accent-foreground
                                  "
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

          {/* CART */}
          <button
            className="
            p-2
            rounded-md
            border border-border
            hover:bg-accent
            transition
            "
          >
            <ShoppingCart className="w-5 h-5" />
          </button>

          {/* LOGIN */}
          <Link
            href="/auth/login"
            className="
            px-3 py-1.5
            text-sm
            rounded-md
            border border-border
            hover:bg-accent
            transition
            "
          >
            Login
          </Link>
          <button onClick={handleLogout}>Logout</button>
          {user?.name}
          {/* MOBILE MENU */}
          <Sheet>
            <SheetTrigger className="md:hidden p-2 rounded-md border border-border hover:bg-accent transition">
              <Menu className="w-6 h-6" />
            </SheetTrigger>

            <SheetContent
              side="left"
              className="w-80 bg-background border-r border-border overflow-y-auto p-0"
            >

              <SheetHeader className="border-b border-border p-5">
                <SheetTitle className="text-lg font-semibold">
                  Menu
                </SheetTitle>
              </SheetHeader>

              <div className="p-4 space-y-4">

                <Accordion type="single" collapsible className="space-y-3">

                  {/* BIKES */}
                  <AccordionItem
                    value="bikes"
                    className="border border-border rounded-xl bg-muted/30"
                  >
                    <AccordionTrigger className="px-4 py-3 font-semibold text-base hover:bg-accent transition">
                      Bikes
                    </AccordionTrigger>

                    <AccordionContent
                      className="
      px-3 pb-3 space-y-2
      data-[state=open]:animate-accordion-down
      data-[state=closed]:animate-accordion-up
      duration-500 ease-in-out
      "
                    >

                      {/* ONE accordion for all brands */}
                      <Accordion type="single" collapsible className="space-y-2">

                        {bikeBrands.map((brand) => (
                          <AccordionItem
                            key={brand.title}
                            value={brand.title}
                            className="border border-border rounded-lg bg-background"
                          >

                            <AccordionTrigger className="px-3 py-2 text-sm font-medium hover:bg-muted rounded-md">
                              {brand.title}
                            </AccordionTrigger>

                            <AccordionContent
                              className="
              data-[state=open]:animate-accordion-down
              data-[state=closed]:animate-accordion-up
              duration-500 ease-in-out
              "
                            >

                              <div className="flex flex-col gap-1 px-3 pb-2">

                                {brand.links.map((link) => (
                                  <Link
                                    key={link.href}
                                    href={link.href}
                                    className="
                    text-sm px-2 py-1.5 rounded-md
                    text-muted-foreground
                    hover:bg-accent
                    hover:text-accent-foreground
                    transition
                    "
                                  >
                                    {link.label}
                                  </Link>
                                ))}

                              </div>

                            </AccordionContent>

                          </AccordionItem>
                        ))}

                      </Accordion>

                    </AccordionContent>
                  </AccordionItem>

                  {/* ACCESSORIES */}
                  <AccordionItem
                    value="accessories"
                    className="border border-border rounded-xl bg-muted/30"
                  >
                    <AccordionTrigger className="px-4 py-3 font-semibold text-base hover:bg-accent transition">
                      Accessories
                    </AccordionTrigger>

                    <AccordionContent
                      className="
      px-3 pb-3 space-y-2
      data-[state=open]:animate-accordion-down
      data-[state=closed]:animate-accordion-up
      duration-500 ease-in-out
      "
                    >

                      {/* ONE accordion for all categories */}
                      <Accordion type="single" collapsible className="space-y-2">

                        {categories.map((cat) => (
                          <AccordionItem
                            key={cat.title}
                            value={cat.title}
                            className="border border-border rounded-lg bg-background"
                          >

                            <AccordionTrigger className="px-3 py-2 text-sm font-medium hover:bg-muted rounded-md">
                              {cat.title}
                            </AccordionTrigger>

                            <AccordionContent
                              className="
              data-[state=open]:animate-accordion-down
              data-[state=closed]:animate-accordion-up
              duration-500 ease-in-out
              "
                            >

                              <div className="flex flex-col gap-1 px-3 pb-2">

                                {cat.links.map((link) => (
                                  <Link
                                    key={link.href}
                                    href={link.href}
                                    className="
                    text-sm px-2 py-1.5 rounded-md
                    text-muted-foreground
                    hover:bg-accent
                    hover:text-accent-foreground
                    transition
                    "
                                  >
                                    {link.label}
                                  </Link>
                                ))}

                              </div>

                            </AccordionContent>

                          </AccordionItem>
                        ))}

                      </Accordion>

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