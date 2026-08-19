import AppSidebar from "@/components/application/admin/AppSidebar"
import ThemeProvider from "@/components/application/admin/ThemeProvider"
import TopBar from "@/components/application/admin/TopBar"
import { SidebarProvider } from "@/components/ui/sidebar"
import React from "react"

const Layout = ({ children }) => {
    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            <SidebarProvider>

                <div className="flex min-h-screen w-full">

                    {/* Sidebar */}
                    <AppSidebar />

                    {/* Main area */}
                    <main className="flex min-w-0 flex-1 flex-col">

                        {/* Top bar */}
                        <TopBar />

                        {/* Page content */}
                        <div className="flex-1 px-5 pt-20 pb-10">
                            {children}
                        </div>

                        {/* Footer */}
                        <div
                            className="
                                h-10
                                shrink-0
                                border-t
                                bg-gray-50
                                dark:bg-background

                                flex
                                items-center
                                justify-center

                                text-sm
                            "
                        >
                            All rights reserved for whoever it is
                        </div>

                    </main>

                </div>

            </SidebarProvider>
        </ThemeProvider>
    )
}

export default Layout