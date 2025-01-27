'use client'

import { useSession, signOut } from 'next-auth/react'
import { usePathname } from 'next/navigation'
import { Sidebar } from './layout/Sidebar'
import { useSidebar } from '@/contexts/SidebarContext'
import { Bars3Icon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline'
import { Logo } from '@/components/Logo'

export function LayoutClient({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const { data: session } = useSession()
  const { toggle } = useSidebar()

  const handleLogout = async () => {
    await signOut({ callbackUrl: '/login' })
  }

  // Se não estiver autenticado e não estiver na página de login, não renderiza o layout
  if (!session && pathname !== '/login') {
    return null
  }

  // Se estiver na página de login, renderiza sem o layout
  if (pathname === '/login') {
    return <>{children}</>
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Sidebar />
      
      <div className="transition-all duration-300">
        <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
          <button
            type="button"
            className="-m-2.5 p-2.5 text-gray-700"
            onClick={toggle}
          >
            <span className="sr-only">Abrir menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
          
          <div className="h-6 w-px bg-gray-200" aria-hidden="true" />
          
          <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
            <div className="flex-1" />
            <div className="flex items-center">
              <Logo 
                size="sm" 
                showText={true}
                className="transform hover:scale-105 transition-transform duration-200"
              />
            </div>
            <div className="flex-1" />
            <div className="flex items-center">
              <button 
                onClick={handleLogout}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-700 hover:bg-red-50 hover:text-red-600 transition-all duration-200 ease-in-out"
                title="Sair do sistema"
              >
                <ArrowRightOnRectangleIcon className="h-5 w-5" />
                <span className="hidden sm:inline">Sair</span>
              </button>
            </div>
          </div>
        </div>

        <main className="py-10">
          <div className="px-4 sm:px-6 lg:px-8">{children}</div>
        </main>
      </div>
    </div>
  )
}
