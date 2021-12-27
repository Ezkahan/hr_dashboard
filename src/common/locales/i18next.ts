import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

import RU from './ru/translation'
import EN from './en/translation'

const resources = {
    ru: {
        translation: RU
    },
    en: {
        translation: EN
    },
}

let defaultLocale = localStorage.getItem('locale') ?? 'ru'

if(defaultLocale === null)
{
    localStorage.setItem('locale', 'ru')
    defaultLocale = localStorage.getItem('locale') ?? 'ru'
}

i18n.use(initReactI18next)
    .use(LanguageDetector)
    .init({
        resources,
        lng: defaultLocale,
        interpolation: {
            escapeValue: false
        }
    })

export default i18n