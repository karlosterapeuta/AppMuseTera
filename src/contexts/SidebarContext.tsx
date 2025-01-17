'use client'

import { createContext, useContext, useState, useEffect } from 'react'

interface SidebarContextType {
  isOpen: boolean
  toggle: () => void
  close: () => void
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined)

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)

  const toggle = () => setIsOpen(!isOpen)
  const close = () => setIsOpen(false)

  // Fecha o menu quando a tela é redimensionada
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024 && isOpen) {
        close()
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [isOpen])

  return (
    <SidebarContext.Provider value={{ isOpen, toggle, close }}>
      {children}
    </SidebarContext.Provider>
  )
}

export function useSidebar() {
  const context = useContext(SidebarContext)
  if (context === undefined) {
    throw new Error('useSidebar must be used within a SidebarProvider')
  }
  return context
}
