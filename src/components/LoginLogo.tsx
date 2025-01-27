'use client'

import Image from 'next/image'

interface LoginLogoProps {
  size?: 'sm' | 'md' | 'lg'
  showText?: boolean
  darkMode?: boolean
  className?: string
}

export function LoginLogo({ size = 'lg', showText = true, darkMode = false, className = '' }: LoginLogoProps) {
  const sizes = {
    sm: { width: 40, height: 40, textSize: 'text-2xl' },
    md: { width: 80, height: 80, textSize: 'text-3xl' },
    lg: { width: 120, height: 120, textSize: 'text-4xl' }
  }

  const { width, height, textSize } = sizes[size]

  return (
    <div className={`flex flex-col items-center gap-4 ${className}`}>
      <div className="relative flex-shrink-0">
        <Image
          src="/logo-musicoterapia.png"
          alt="Logo Musicoterapia"
          width={width}
          height={height}
          className={`object-cover ${darkMode ? 'brightness-0 invert' : ''}`}
          priority
        />
      </div>
      {showText && (
        <span className={`font-bold tracking-tight ${textSize} ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          MuseTera
        </span>
      )}
    </div>
  )
}
