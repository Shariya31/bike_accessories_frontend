"use client";

import { useState } from "react";
import Link from "next/link";
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
    <Sidebar className="w-72 md:w-80">
      <SidebarContent className="p-2">
        {bikeSidebarData.map((item) => {
          const Icon = item.icon;
          const isOpen = open === item.title;

          return (
            <SidebarGroup key={item.title}>
              <SidebarGroupLabel
                onClick={() => toggle(item.title)}
                className="flex items-center justify-between py-3 text-base cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <Icon size={18} />
                  {item.title}
                </div>

                <span className={`transition ${isOpen ? "rotate-90" : ""}`}>
                  ›
                </span>
              </SidebarGroupLabel>

              {isOpen && (
                <SidebarMenu>
                  {item.links.map((link) => (
                    <SidebarMenuItem key={link.href}>
                      <SidebarMenuButton asChild>
                        <Link
                          href={link.href}
                          className="py-2 text-sm"
                        >
                          {link.label}
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              )}
            </SidebarGroup>
          );
        })}
      </SidebarContent>
    </Sidebar>
  );
}