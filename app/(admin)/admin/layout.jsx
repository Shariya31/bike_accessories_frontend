import AppSidebar from '@/components/application/admin/AppSidebar'
import ThemeProvider from '@/components/application/admin/ThemeProvider'
import TopBar from '@/components/application/admin/TopBar'
import { SidebarProvider } from '@/components/ui/sidebar'
import React from 'react'

const layout = ({ children }) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >

      <SidebarProvider>
        <AppSidebar />
        <main className='md:w-[calc(100vw-16rem)]'>
          <div className='pt-17.5 px-5 min-h-[calc(100vh-40px)] pb-10'>
            <TopBar />
            {children}
          </div>
          <div className='border-t h-10 flex justify-center items-center bg-gray-50 dark:bg-background text-sm'>
            All rights reserved for whoever it is
          </div>
        </main>
      </SidebarProvider>
    </ThemeProvider>
  )
}

export default layout
