import { useI18n } from '../i18n/LanguageProvider'
import { profile } from '../data/copy'

export function Footer() {
  const { t } = useI18n()
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-line py-10">
      <div className="shell text-xs text-muted">
        <p>
          © {year} {profile.name}. {t.footer.rights}
        </p>
      </div>
    </footer>
  )
}
