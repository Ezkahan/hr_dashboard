import i18n from "i18next";

const changeLocale = (locale: string) => {
    // set new locale
    localStorage.setItem('orlan_locale', locale)

    // get default locale
    const defaultLocale = localStorage.getItem('orlan_locale') ?? 'ru'

    // change locale
    i18n.changeLanguage(defaultLocale)
}

export default changeLocale