import React, { useState } from "react"
import { IModal } from '../../../common/interfaces/IModal'
import {IoArrowUndoCircleOutline, IoCheckmarkCircleOutline} from 'react-icons/io5'

import RU_FLAG from '../../../assets/icons/locales/ru.jpg'
import EN_FLAG from '../../../assets/icons/locales/en.jpg'
import { useTranslation } from "react-i18next"
import toast from "react-hot-toast"
import { useMutation } from "@apollo/client"
import { COUNTRIES } from "../../../graphql/queries/Location/Country/getCountriesQuery"
import { IAddCountry } from "../../../common/interfaces/Location/Country/IAddCountry"
import { IEditCountry } from "../../../common/interfaces/Location/Country/IEditCountry"
import { UPDATE_COUNTRY } from "../../../graphql/mutations/Location/Country/updateCountryMutation"

const EditCountry: React.FC<IModal & IEditCountry> = ({id, close}) => {
    const { t } = useTranslation()
    const [country, setCountry] = useState<IAddCountry>({
        'name_ru': "",
        'name_en': "",
    })

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) => {
        setCountry({
            ...country,
            [e.target.name]: e.target.value
        })
    }
    const onCompleted = () => {
        toast.success(t('success_saved'), {duration: 1500}) && setTimeout(() => close(), 2000)
    }

    const [updateCountry] = useMutation(UPDATE_COUNTRY, {
        onCompleted,
        onError: () => {},
        refetchQueries: [
            {
                query: COUNTRIES,
                variables: {page: 1}
            }
        ]
    })

    const saveCountry = (e: React.SyntheticEvent) => {
        e.preventDefault()

        updateCountry({
            variables: {
                id: id,
                name_ru: country.name_ru,
                name_en: country.name_en
            }
        })
    }

    return (
        <form onSubmit={(e) => saveCountry(e)} className="p-3">
            <h1 className="text-xl font-montserrat-bold">
                {t('edit_country')}
            </h1>
            <aside className="grid grid-cols-12 gap-5 mt-5 mb-8">
                <div className="col-span-12 bg-slate-50 border border-slate-200 rounded-lg flex flex-col w-full overflow-hidden">
                    <header className="flex items-center justify-between">
                        <small className="px-4 pt-2">{t('country_name')}</small>
                        <img src={RU_FLAG} alt="RU" className="w-6 h-4 mr-4 mt-2" />
                    </header>
                    <input required name="name_ru" onChange={(e) => changeHandler(e)} type="text" className="bg-slate-50 px-4 py-2" placeholder={t('input_country_name')} />
                </div>

                <div className="col-span-12 bg-slate-50 border border-slate-200 rounded-lg flex flex-col w-full overflow-hidden">
                    <header className="flex items-center justify-between">
                        <small className="px-4 pt-2">{t('country_name')}</small>
                        <img src={EN_FLAG} alt="EN" className="w-6 h-4 mr-4 mt-2" />
                    </header>
                    <input required name="name_en" onChange={(e) => changeHandler(e)} type="text" className="bg-slate-50 px-4 py-2" placeholder={t('input_country_name')} />
                </div>
            </aside>

            <div className="flex items-center justify-between">
                <button className="bg-indigo-600 hover:bg-indigo-700 text-white duration-300 rounded-lg px-5 py-3 flex items-center">
                    <IoCheckmarkCircleOutline size={24} className="mr-2" />
                    {t('save')}
                </button>

                <button type="button" onClick={() => close()} className="bg-slate-100 hover:bg-slate-200 text-slate-600 duration-300 rounded-lg px-5 py-3 flex items-center">
                    <IoArrowUndoCircleOutline size={24} className="mr-2" />
                    {t('close')}
                </button>
            </div>
        </form>
    )
}

export default EditCountry