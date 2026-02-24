"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";

import { bikeSidebarData } from "./sidebarData";

export function BikeSidebar() {
  const [open, setOpen] = useState(null);

  const toggle = (title) => {
    setOpen((prev) => (prev === title ? null : title));
  };

  return (
    <Sidebar className="w-72 md:w-80 bg-sidebar text-sidebar-foreground border-r border-sidebar-border">
      <SidebarContent className="p-3 space-y-2">
        {bikeSidebarData.map((item) => {
          const Icon = item.icon;
          const isOpen = open === item.title;

          return (
            <SidebarGroup
              key={item.title}
              className="rounded-xl overflow-hidden border border-sidebar-border/60 bg-sidebar/40 backdrop-blur-sm"
            >
              {/* Parent */}
              <SidebarGroupLabel
                onClick={() => toggle(item.title)}
                className={`
                  flex items-center justify-between
                  px-4 py-3.5
                  text-sm font-medium
                  cursor-pointer select-none
                  transition-all duration-200
                  ${
                    isOpen
                      ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-sm"
                      : "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  }
                `}
              >
                <div className="flex items-center gap-3">
                  <Icon size={18} className="opacity-90" />
                  <span className="tracking-wide">{item.title}</span>
                </div>

                <ChevronRight
                  size={16}
                  className={`
                    transition-transform duration-300
                    ${isOpen ? "rotate-90" : ""}
                  `}
                />
              </SidebarGroupLabel>

              {/* Accordion */}
              <div
                className={`
                  grid transition-all duration-300 ease-in-out
                  ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}
                `}
              >
                <div className="overflow-hidden">
                  <SidebarMenu className="bg-muted/40 px-2 py-2">
                    {item.links.map((link) => (
                      <SidebarMenuItem key={link.href}>
                        <SidebarMenuButton asChild>
                          <Link
                            href={link.href}
                            className="
                              flex items-center
                              rounded-md
                              px-6 py-2.5
                              text-sm
                              text-muted-foreground
                              transition-all duration-200
                              hover:bg-muted/70
                              hover:text-primary
                            "
                          >
                            {link.label}
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </div>
              </div>
            </SidebarGroup>
          );
        })}
      </SidebarContent>
    </Sidebar>
  );
}