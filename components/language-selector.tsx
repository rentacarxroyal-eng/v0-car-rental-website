'use client'

import { useRouter } from 'next/navigation'
import { Check, ChevronDown, Globe2 } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { localeLabels, localeNames, siteLocales, type SiteLocale } from '@/lib/i18n'
import { persistSiteLocale } from '@/lib/i18n-browser'

export function LanguageSelector({ locale, dark = false }: { locale: SiteLocale; dark?: boolean }) {
  const router = useRouter()

  const selectLocale = (nextLocale: SiteLocale) => {
    if (nextLocale === locale) return
    persistSiteLocale(nextLocale)
    router.refresh()
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          aria-label={`Dil seç / Select language: ${localeNames[locale]}`}
          className={
            'inline-flex h-10 min-w-[78px] items-center justify-center gap-2 rounded-lg border px-3 text-xs font-bold tracking-wider transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e4c45c] ' +
            (dark
              ? 'border-white/20 text-white hover:bg-white/10'
              : 'border-slate-200 bg-white/90 text-slate-900 hover:border-[#e4c45c] hover:bg-white')
          }
        >
          <Globe2 className="h-4 w-4" aria-hidden="true" />
          <span>{localeLabels[locale]}</span>
          <ChevronDown className="h-3.5 w-3.5 opacity-70" aria-hidden="true" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" sideOffset={6} className="min-w-[170px] bg-white text-slate-900">
        {siteLocales.map(option => (
          <DropdownMenuItem
            key={option}
            lang={option === 'cnr' ? 'sr-Latn-ME' : option}
            onSelect={() => selectLocale(option)}
            className="flex cursor-pointer items-center justify-between gap-4 px-3 py-2 text-sm"
          >
            <span className="flex items-center gap-2">
              <span className="w-6 text-xs font-semibold text-slate-500">{localeLabels[option]}</span>
              <span>{localeNames[option]}</span>
            </span>
            {locale === option && <Check className="h-4 w-4 text-[#ad8f28]" aria-label="Selected" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
