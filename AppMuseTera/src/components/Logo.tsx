import Image from 'next/image'

interface LogoProps {
  size?: 'sm' | 'md' | 'lg'
  showText?: boolean
  darkMode?: boolean
  className?: string
}

export function Logo({ size = 'sm', showText = true, darkMode = false, className = '' }: LogoProps) {
  const sizes = {
    sm: { width: 40, height: 40, textSize: 'text-2xl' },
    md: { width: 80, height: 80, textSize: 'text-3xl' },
    lg: { width: 120, height: 120, textSize: 'text-4xl' }
  }

  const { width, height, textSize } = sizes[size]

  return (
    <div className={`flex items-center gap-4 ${className}`}>
      {showText && (
        <span className={`font-bold tracking-tight ${textSize} ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          MuseTera
        </span>
      )}
      <div className="relative flex-shrink-0">
        <Image
          src="/MuseTera-logo.png"
          alt="Logo MuseTera"
          width={width}
          height={height}
          className={`object-cover rounded-full ring-2 ring-indigo-600 ring-offset-2 ${darkMode ? 'brightness-0 invert' : ''}`}
          priority
        />
      </div>
    </div>
  )
}
