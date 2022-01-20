import React, { useState } from "react"
import {IoArrowUndoCircleOutline, IoCheckmarkCircleOutline} from 'react-icons/io5'
import toast from "react-hot-toast"

import RU_FLAG from '../../assets/icons/locales/ru.jpg'
import EN_FLAG from '../../assets/icons/locales/en.jpg'
import { useTranslation } from "react-i18next"
import { useMutation, useQuery } from "@apollo/client"
import { IModal } from "../../common/interfaces/IModal"
import { IAddSchool } from "../../common/interfaces/School/IAddSchool"
import { GET_SCHOOLS } from "../../graphql/queries/School/getSchoolsQuery"
import getByLocale from "../../common/helpers/getByLocale"
import { GET_SCHOOL_TYPES } from "../../graphql/queries/School/getSchoolTypesQuery"
import { ADD_SCHOOL } from "../../graphql/mutations/School/addSchoolMutation"

const AddEducation: React.FC<IModal> = ({close}) => {
    const { t } = useTranslation()
    const [school, setSchool] = useState<IAddSchool>({
        'name_ru': "",
        'name_en': "",
        'school_type_id': 1,
    })

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement| HTMLSelectElement>) => {
        setSchool({
            ...school,
            [e.target.name]: e.target.value
        })
    }

    const onCompleted = () => {
        toast.success(t('success_saved'), {duration: 1500}) && setTimeout(() => close(), 2000)
    }

    const {data} = useQuery(GET_SCHOOL_TYPES)

    const [addSchool] = useMutation(ADD_SCHOOL, {
        onCompleted,
        onError: () => {},
        refetchQueries: [
            {
                query: GET_SCHOOLS,
                variables: {page: 1}
            }
        ]
    })

    const saveSchool = (e: React.SyntheticEvent) => {
        e.preventDefault()

        addSchool({
            variables: {
                name_ru: school.name_ru,
                name_en: school.name_en,
                school_type_id: school.school_type_id,
            }
        })
    }

    return (
        <form onSubmit={(e) => saveSchool(e)} className="p-3">
            <h1 className="text-xl font-montserrat-bold">
                {t('add_new_school')}
            </h1>
            <aside className="grid grid-cols-12 gap-5 my-5">
                <div className="col-span-12 bg-slate-50 border border-slate-200 rounded-lg flex flex-col w-full overflow-hidden">
                    <header className="flex items-center justify-between">
                        <small className="px-4 pt-2">{t('school_name')}</small>
                        <img src={RU_FLAG} alt="RU" className="w-6 h-4 mr-4 mt-2" />
                    </header>
                    <input required name="name_ru" onChange={(e) => changeHandler(e)} type="text" className="bg-slate-50 px-4 py-2" placeholder={t('input_school_name')} />
                </div>

                <div className="col-span-12 bg-slate-50 border border-slate-200 rounded-lg flex flex-col w-full overflow-hidden">
                    <header className="flex items-center justify-between">
                        <small className="px-4 pt-2">{t('school_name')}</small>
                        <img src={EN_FLAG} alt="EN" className="w-6 h-4 mr-4 mt-2" />
                    </header>
                    <input required name="name_en" onChange={(e) => changeHandler(e)} type="text" className="bg-slate-50 px-4 py-2" placeholder={t('input_school_name')} />
                </div>
            </aside>

            {
                data && console.log(data)
            }

            {
                data && data.schoolTypes &&
                <aside className="mb-5">
                    <div className="col-span-12 bg-slate-50 border border-slate-200 rounded-lg flex flex-col w-full overflow-hidden">
                    <header className="flex items-center justify-between">
                        <small className="px-4 pt-2 text-slate-400">{t('school_type')}</small>
                    </header>
                    <select name="school_type_id" onChange={(e) => changeHandler(e)} className="bg-transparent px-4 py-2.5 w-full appearance-none">
                        {
                            data.schoolTypes.map((schoolType: any, index: number) => {
                                return (
                                    <option key={index} value={schoolType.id}> { getByLocale(schoolType.name) } </option>
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

export default AddEducation