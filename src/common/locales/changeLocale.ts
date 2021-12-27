import i18n from "i18next";

const changeLocale = (locale: string) => {
    // set new locale
    localStorage.setItem('locale', locale)

    // get default locale
    const defaultLocale = localStorage.getItem('locale') ?? 'ru'

    // change locale
    i18n.changeLanguage(defaultLocale)
}

export default changeLocale