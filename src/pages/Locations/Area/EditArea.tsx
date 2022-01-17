import React, { useState } from "react"
import { IModal } from '../../../common/interfaces/IModal'
import {IoArrowUndoCircleOutline, IoCheckmarkCircleOutline} from 'react-icons/io5'

import RU_FLAG from '../../../assets/icons/locales/ru.jpg'
import EN_FLAG from '../../../assets/icons/locales/en.jpg'
import { useTranslation } from "react-i18next"
import toast from "react-hot-toast"
import { useMutation, useQuery } from "@apollo/client"
import getByLocale from "../../../common/helpers/getByLocale"
import { IEditArea } from "../../../common/interfaces/Location/Area/IEditArea"
import { GET_COUNTRY_LIST } from "../../../graphql/queries/Location/Country/getCountriesQuery copy"
import { UPDATE_AREA } from "../../../graphql/mutations/Location/Area/updateAreaMutation"
import { GET_AREAS } from "../../../graphql/queries/Location/Area/getAreasQuery"

const EditArea: React.FC<IModal & IEditArea> = ({id, name, country_id, close}) => {
    const { t } = useTranslation()
    const [area, setArea] = useState<IEditArea>({
        id: id,
        name: {
            ru: name.ru,
            en: name.en,
        },
        country_id: country_id,
    })

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement|HTMLSelectElement>) => {
        setArea({
            ...area,
            name: {
                ...area.name,
                [e.target.name]: e.target.value
            },
            country_id: e.target.name === 'country_id' ? parseInt(e.target.value) : area.country_id
        })
    }

    const onCompleted = () => {
        toast.success(t('success_saved'), {duration: 1500}) && setTimeout(() => close(), 2000)
    }

    const {data} = useQuery(GET_COUNTRY_LIST)

    const [updateArea] = useMutation(UPDATE_AREA, {
        onCompleted,
        onError: () => {},
        refetchQueries: [
            {
                query: GET_AREAS,
                variables: {page: 1}
            }
        ]
    })

    const saveArea = (e: React.SyntheticEvent) => {
        e.preventDefault()

        updateArea({
            variables: {
                id: id,
                name_ru: area.name.ru,
                name_en: area.name.en,
                country_id: area.country_id,
            }
        })
    }

    return (
        <form onSubmit={(e) => saveArea(e)} className="p-3">
            <h1 className="text-xl font-montserrat-bold">
                {t('edit')}
            </h1>
            <aside className="grid grid-cols-12 gap-5 my-5">
                <div className="col-span-12 bg-slate-50 border border-slate-200 rounded-lg flex flex-col w-full overflow-hidden">
                    <header className="flex items-center justify-between">
                        <small className="px-4 pt-2 text-slate-400">{t('town_name')}</small>
                        <img src={RU_FLAG} alt="RU" className="w-6 h-4 mr-4 mt-2" />
                    </header>
                    <input
                        required
                        name="ru"
                        onChange={(e) => changeHandler(e)}
                        type="text"
                        className="bg-slate-50 px-4 py-2"
                        value={area && area.name.ru}
                        placeholder={t('input_area_name')}
                    />
                </div>

                <div className="col-span-12 bg-slate-50 border border-slate-200 rounded-lg flex flex-col w-full overflow-hidden">
                    <header className="flex items-center justify-between">
                        <small className="px-4 pt-2 text-slate-400">{t('area_name')}</small>
                        <img src={EN_FLAG} alt="EN" className="w-6 h-4 mr-4 mt-2" />
                    </header>
                    <input
                        required
                        name="en"
                        onChange={(e) => changeHandler(e)}
                        type="text"
                        className="bg-slate-50 px-4 py-2"
                        value={area && area.name.en}
                        placeholder={t('input_area_name')}
                    />
                </div>
            </aside>

            {
                data && data.countryList &&
                <aside className="mb-5">
                    <div className="col-span-12 bg-slate-50 border border-slate-200 rounded-lg flex flex-col w-full overflow-hidden">
                    <header className="flex items-center justify-between">
                        <small className="px-4 pt-2 text-slate-400">{t('area_country')}</small>
                    </header>
                    <select
                        name="country_id"
                        onChange={(e) => changeHandler(e)}
                        className="bg-transparent px-4 py-2.5 w-full appearance-none"
                    >
                        {
                            data.countryList.map((country: any, index: number) => {
                                return (
                                    <option selected={country.id === area.country_id} key={index} value={country.id}> { getByLocale(country.name) } </option>
                                )
                            })
                        }
                    </select>
                    </div>
                </aside>
            }

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

export default EditArea