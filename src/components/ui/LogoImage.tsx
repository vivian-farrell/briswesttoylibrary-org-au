'use client'

type Variant = 'flat' | 'compact' | 'full'

const SRC: Record<Variant, string> = {
  flat:    '/ibis-flat.svg',
  compact: '/ibis-compact.svg',
  full:    '/ibis-full.svg',
}

type Props = {
  className?: string
  style?: React.CSSProperties
  variant?: Variant
}

export function LogoImage({ className, style, variant = 'flat' }: Props) {
  return (
    <img
      src={SRC[variant]}
      alt="Brisbane West Toy Library"
      className={className}
      style={style}
      onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none' }}
    />
  )
}
