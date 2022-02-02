import React, { useState } from "react"
import { IModal } from '../../../common/interfaces/IModal'
import {IoArrowUndoCircleOutline, IoCheckmarkCircleOutline} from 'react-icons/io5'
import toast from "react-hot-toast"

import RU_FLAG from '../../../assets/icons/locales/ru.jpg'
import EN_FLAG from '../../../assets/icons/locales/en.jpg'
import { useTranslation } from "react-i18next"
import { useMutation, useQuery } from "@apollo/client"
import { ADD_TOWN } from "../../../graphql/mutations/Location/Town/addTownMutation"
import { IAddTown } from "../../../common/interfaces/Location/Town/IAddTown"
import { GET_TOWNS } from "../../../graphql/queries/Location/Town/getTownsQuery"
import { GET_AREA_LIST } from "../../../graphql/queries/Location/Area/getAreaListQuery"
import getByLocale from "../../../common/helpers/getByLocale"

const AddTown: React.FC<IModal> = ({close}) => {
    const { t } = useTranslation()
    const [town, setTown] = useState<IAddTown>({
        'name_ru': "",
        'name_en': "",
        'area_id': 1,
    })

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement| HTMLSelectElement>) => {
        setTown({
            ...town,
            [e.target.name]: e.target.value
        })
    }

    const onCompleted = () => {
        toast.success(t('success_saved'), {duration: 1500}) && setTimeout(() => close(), 2000)
    }

    const {data} = useQuery(GET_AREA_LIST)

    const [addTown] = useMutation(ADD_TOWN, {
        onCompleted,
        onError: () => {},
        refetchQueries: [
            {
                query: GET_TOWNS,
                variables: {page: 1}
            }
        ]
    })

    const saveTown = (e: React.SyntheticEvent) => {
        e.preventDefault()

        addTown({
            variables: {
                name_ru: town.name_ru,
                name_en: town.name_en,
                area_id: town.area_id,
            }
        })
    }

    return (
        <form onSubmit={(e) => saveTown(e)} className="p-3">
            <h1 className="text-xl font-montserrat-bold">
                {t('add_new_town')}
            </h1>
            <aside className="grid grid-cols-12 gap-5 my-5">
                <div className="col-span-12 bg-slate-50 border border-slate-200 rounded-lg flex flex-col w-full overflow-hidden">
                    <header className="flex items-center justify-between">
                        <small className="px-4 pt-2">{t('town_name')}</small>
                        <img src={RU_FLAG} alt="RU" className="w-6 h-4 mr-4 mt-2" />
                    </header>
                    <input required name="name_ru" onChange={(e) => changeHandler(e)} type="text" className="bg-slate-50 px-4 py-2" placeholder={t('input_town_name')} />
                </div>

                <div className="col-span-12 bg-slate-50 border border-slate-200 rounded-lg flex flex-col w-full overflow-hidden">
                    <header className="flex items-center justify-between">
                        <small className="px-4 pt-2">{t('town_name')}</small>
                        <img src={EN_FLAG} alt="EN" className="w-6 h-4 mr-4 mt-2" />
                    </header>
                    <input required name="name_en" onChange={(e) => changeHandler(e)} type="text" className="bg-slate-50 px-4 py-2" placeholder={t('input_town_name')} />
                </div>
            </aside>

            {
                data && data.areaList &&
                <aside className="mb-5">
                    <div className="col-span-12 bg-slate-50 border border-slate-200 rounded-lg flex flex-col w-full overflow-hidden">
                    <header className="flex items-center justify-between">
                        <small className="px-4 pt-2 text-slate-400">{t('town_area')}</small>
                    </header>
                    <select name="area_id" onChange={(e) => changeHandler(e)} className="bg-transparent px-4 py-2.5 w-full appearance-none">
                        {
                            data.areaList.map((area: any, index: number) => {
                                return (
                                    <option key={index} value={area.id}> { getByLocale(area.name) } </option>
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

export default AddTown