import { createI18n as _createI18n } from 'vue-i18n'
import en from './locales/en.json'
import lt from './locales/lt.json'

export const SUPPORT_LOCALES = ['en', 'lt']

export function createI18n(locale) {
    return _createI18n({
        legacy: false,
        globalInjection: true,
        locale: locale,
        fallbackLocale: 'en',
        messages: {
            en,
            lt,
        }
    })
}