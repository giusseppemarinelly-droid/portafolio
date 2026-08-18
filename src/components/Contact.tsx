import { useState } from 'react'
import { useI18n } from '../i18n/LanguageProvider'
import { profile } from '../data/copy'
import { ArrowIcon, CheckIcon, CopyIcon, MailIcon, PhoneIcon, WhatsAppIcon } from './Icons'

export function Contact() {
  const { t, locale } = useI18n()
  const [copied, setCopied] = useState(false)

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      // Sin permiso de portapapeles el enlace mailto sigue estando ahí.
    }
  }

  return (
    <section id="contact" className="relative scroll-mt-24 overflow-hidden border-t border-line py-20 md:py-32">
      <div className="grid-veil pointer-events-none absolute inset-0 -z-10 opacity-60" aria-hidden="true" />

      <div className="shell">
        <p className="eyebrow flex items-center gap-3" data-reveal>
          <span className="text-accent">05</span>
          <span className="h-px w-8 bg-line-strong" />
          {t.contact.label}
        </p>

        <h2
          className="mt-8 max-w-3xl text-[clamp(2.25rem,6.5vw,4.5rem)] leading-[1.02]"
          data-reveal
          style={{ ['--reveal-delay' as string]: '60ms' }}
        >
          {t.contact.heading}
        </h2>

        <p
          className="mt-6 max-w-lg text-[1.0625rem] leading-relaxed text-ink-soft"
          data-reveal
          style={{ ['--reveal-delay' as string]: '120ms' }}
        >
          {t.contact.lede}
        </p>

        <div className="mt-12 grid gap-px overflow-hidden rounded-sm border border-line bg-line md:grid-cols-3">
          <ContactCard
            href={`mailto:${profile.email}`}
            icon={<MailIcon />}
            label={t.contact.emailLabel}
            value={profile.email}
            delay={0}
            action={
              <button
                type="button"
                onClick={() => void copyEmail()}
                className="relative z-10 inline-flex items-center gap-1.5 rounded-full border border-line px-2.5 py-1 font-mono text-[0.6rem] uppercase tracking-widest text-muted transition-colors hover:border-accent hover:text-accent"
              >
                {copied ? <CheckIcon className="size-3" /> : <CopyIcon className="size-3" />}
                {copied ? t.contact.copied : t.contact.copy}
              </button>
            }
          />
          <ContactCard
            href={profile.whatsapp}
            external
            icon={<WhatsAppIcon />}
            label={t.contact.whatsappLabel}
            value={profile.phoneDisplay}
            delay={80}
          />
          <ContactCard
            href={`tel:${profile.phoneIntl}`}
            icon={<PhoneIcon />}
            label={t.contact.phoneLabel}
            value={profile.phoneIntlDisplay}
            delay={160}
          />
        </div>

        <p
          className="mt-8 font-mono text-[0.7rem] uppercase tracking-[0.18em] text-muted"
          data-reveal
        >
          {profile.location[locale]}
        </p>
      </div>
    </section>
  )
}

function ContactCard({
  href,
  icon,
  label,
  value,
  delay,
  external,
  action,
}: {
  href: string
  icon: React.ReactNode
  label: string
  value: string
  delay: number
  external?: boolean
  action?: React.ReactNode
}) {
  // El enlace cubre la tarjeta con un pseudo-elemento en vez de envolverla:
  // así el botón de copiar no queda anidado dentro de un <a>, que es inválido.
  return (
    <div
      className="group relative flex flex-col gap-5 bg-bg p-6 transition-colors duration-500 hover:bg-surface md:p-8"
      data-reveal
      style={{ ['--reveal-delay' as string]: `${delay}ms` }}
    >
      <div className="flex items-start justify-between gap-3">
        <span className="text-accent">{icon}</span>
        <ArrowIcon className="size-4 -rotate-45 text-muted transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent" />
      </div>

      <div>
        <p className="eyebrow">{label}</p>
        <a
          href={href}
          {...(external ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
          className="mt-2 block break-all text-[0.95rem] text-ink after:absolute after:inset-0 after:content-['']"
        >
          {value}
        </a>
      </div>

      {action && <div className="relative z-10 mt-auto">{action}</div>}
    </div>
  )
}
