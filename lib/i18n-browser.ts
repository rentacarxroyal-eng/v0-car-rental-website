import type { SiteLocale } from './i18n'

export function persistSiteLocale(locale: SiteLocale) {
  document.cookie = `xroyal_locale=${locale}; Path=/; Max-Age=31536000; SameSite=Lax`
  document.documentElement.lang = locale === 'cnr' ? 'sr-Latn-ME' : locale
}
