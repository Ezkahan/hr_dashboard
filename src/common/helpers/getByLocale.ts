import i18next from "i18next"
import React from "react"
import { ITranslatable } from "../interfaces/ITranslatable"

const getByLocale: React.FC<ITranslatable | any> = (text) => {
    const getLanguage = i18next.language || window.localStorage.i18nextLng

    return getLanguage === "ru" ? text.ru : text.en
}

export default getByLocale