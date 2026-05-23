'use client'

type Props = {
  className?: string
  style?: React.CSSProperties
}

export function LogoImage({ className, style }: Props) {
  return (
    <img
      src="/logo.svg"
      alt="Brisbane West Toy Library"
      className={className}
      style={style}
      onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none' }}
    />
  )
}
