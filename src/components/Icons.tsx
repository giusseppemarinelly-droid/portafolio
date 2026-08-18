/** Iconos en línea: sin dependencias, heredan el color y el grosor del texto. */
type IconProps = { className?: string }

const base = 'shrink-0'
const strokeProps = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
}

export function SunIcon({ className = 'size-4' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={`${base} ${className}`} aria-hidden="true" {...strokeProps}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </svg>
  )
}

export function MoonIcon({ className = 'size-4' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={`${base} ${className}`} aria-hidden="true" {...strokeProps}>
      <path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5Z" />
    </svg>
  )
}

export function ArrowIcon({ className = 'size-4' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={`${base} ${className}`} aria-hidden="true" {...strokeProps}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  )
}

export function ArrowDownIcon({ className = 'size-4' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={`${base} ${className}`} aria-hidden="true" {...strokeProps}>
      <path d="M12 5v14M6 13l6 6 6-6" />
    </svg>
  )
}

export function ExternalIcon({ className = 'size-4' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={`${base} ${className}`} aria-hidden="true" {...strokeProps}>
      <path d="M14 4h6v6M20 4l-8.5 8.5" />
      <path d="M18 14v4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4" />
    </svg>
  )
}

export function CloseIcon({ className = 'size-4' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={`${base} ${className}`} aria-hidden="true" {...strokeProps}>
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  )
}

export function MenuIcon({ className = 'size-5' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={`${base} ${className}`} aria-hidden="true" {...strokeProps}>
      <path d="M4 8h16M4 16h16" />
    </svg>
  )
}

export function MailIcon({ className = 'size-5' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={`${base} ${className}`} aria-hidden="true" {...strokeProps}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3.5 7 8.5 6 8.5-6" />
    </svg>
  )
}

export function WhatsAppIcon({ className = 'size-5' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={`${base} ${className}`} aria-hidden="true" {...strokeProps}>
      <path d="M3.5 20.5 4.9 16.3A8.3 8.3 0 1 1 8.1 19.3l-4.6 1.2Z" />
      <path d="M9.1 8.4c.3 1.3.9 2.4 1.8 3.3.9.9 2 1.5 3.2 1.8l1-1.2 1.7 1.1-.4 1.3c-1.5.5-3.6-.5-5.4-2.3-1.8-1.8-2.8-3.9-2.3-5.4l1.3-.4 1.1 1.7-1 1.1Z" />
    </svg>
  )
}

export function PhoneIcon({ className = 'size-5' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={`${base} ${className}`} aria-hidden="true" {...strokeProps}>
      <path d="M6.5 3.5h2l1.5 3.5-1.7 1.4a11 11 0 0 0 5.3 5.3l1.4-1.7 3.5 1.5v2a2 2 0 0 1-2.2 2A15.5 15.5 0 0 1 4.5 5.7a2 2 0 0 1 2-2.2Z" />
    </svg>
  )
}

export function CopyIcon({ className = 'size-4' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={`${base} ${className}`} aria-hidden="true" {...strokeProps}>
      <rect x="9" y="9" width="11" height="11" rx="2" />
      <path d="M5 15V6a2 2 0 0 1 2-2h9" />
    </svg>
  )
}

export function CheckIcon({ className = 'size-4' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={`${base} ${className}`} aria-hidden="true" {...strokeProps}>
      <path d="m5 13 4.5 4.5L19 7" />
    </svg>
  )
}
