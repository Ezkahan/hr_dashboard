import React, { useState } from "react"
import {IoArrowUndoCircleOutline, IoCheckmarkCircleOutline} from 'react-icons/io5'

import RU_FLAG from '../../assets/icons/locales/ru.jpg'
import EN_FLAG from '../../assets/icons/locales/en.jpg'
import { useTranslation } from "react-i18next"
import toast from "react-hot-toast"
import { useMutation, useQuery } from "@apollo/client"
import { IModal } from "../../common/interfaces/IModal"
import getByLocale from "../../common/helpers/getByLocale"
import { IEditEducation } from "../../common/interfaces/Education/IEditEducation"
import { GET_EDUCATION_TYPES } from "../../graphql/queries/Education/getEducationTypesQuery"
import { GET_EDUCATION } from "../../graphql/queries/Education/getEducationQuery"
import { UPDATE_EDUCATION } from "../../graphql/mutations/Education/updateEducationMutation"

const EditEducation: React.FC<IModal & IEditEducation> = ({
    id,
    name,
    description,
    begin,
    end,
    country_id,
    education_type_id,
    close
}) => {
    const { t } = useTranslation()
    const [education, setEducation] = useState<IEditEducation>({
        id: id,
        name: {
            ru: name.ru,
            en: name.en,
        },
        description: {
            ru: description.ru,
            en: description.en,
        },
        begin: begin,
        end: end,
        country_id: country_id,
        education_type_id: education_type_id,
    })

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement|HTMLSelectElement>) => {
        setEducation({
            ...education,
            name: {
                ...education.name,
                [e.target.name]: e.target.value
            },
            education_type_id: e.target.name === 'education_type_id' ? parseInt(e.target.value) : education.education_type_id
        })
    }

    const onCompleted = () => {
        toast.success(t('success_saved'), {duration: 1500}) && setTimeout(() => close(), 2000)
    }

    const {data} = useQuery(GET_EDUCATION_TYPES)

    const [updateEducation] = useMutation(UPDATE_EDUCATION, {
        onCompleted,
        onError: () => {},
        refetchQueries: [
            {
                query: GET_EDUCATION,
                variables: {page: 1}
            }
        ]
    })

    const saveEducation = (e: React.SyntheticEvent) => {
        e.preventDefault()
        
        updateEducation({
            variables: {
                id: id,
                name_ru: education.name.ru,
                name_en: education.name.en,
                description_ru: education.description.ru,
                description_en: education.description.en,
                country_id: education.country_id,
                education_type_id: education.education_type_id,
            }
        })
    }

    return (
        <form onSubmit={(e) => saveEducation(e)} className="p-3">
            <h1 className="text-xl font-montserrat-bold">
                {t('edit')}
            </h1>
            <aside className="grid grid-cols-12 gap-5 my-5">
                <div className="col-span-12 bg-slate-50 border border-slate-200 rounded-lg flex flex-col w-full overflow-hidden">
                    <header className="flex items-center justify-between">
                        <small className="px-4 pt-2 text-slate-400">{t('school_name')}</small>
                        <img src={RU_FLAG} alt="RU" className="w-6 h-4 mr-4 mt-2" />
                    </header>
                    <input
                        required
                        name="ru"
                        onChange={(e) => changeHandler(e)}
                        type="text"
                        className="bg-slate-50 px-4 py-2"
                        value={education && education.name.ru}
                        placeholder={t('input_education_name')}
                    />
                </div>

                <div className="col-span-12 bg-slate-50 border border-slate-200 rounded-lg flex flex-col w-full overflow-hidden">
                    <header className="flex items-center justify-between">
                        <small className="px-4 pt-2 text-slate-400">{t('education_name')}</small>
                        <img src={EN_FLAG} alt="EN" className="w-6 h-4 mr-4 mt-2" />
                    </header>
                    <input
                        required
                        name="en"
                        onChange={(e) => changeHandler(e)}
                        type="text"
                        className="bg-slate-50 px-4 py-2"
                        value={education && education.name.en}
                        placeholder={t('input_education_name')}
                    />
                </div>
            </aside>

            {
                data && data.educationTypes &&
                <aside className="mb-5">
                    <div className="col-span-12 bg-slate-50 border border-slate-200 rounded-lg flex flex-col w-full overflow-hidden">
                    <header className="flex items-center justify-between">
                        <small className="px-4 pt-2 text-slate-400">{t('education_type')}</small>
                    </header>
                    <select
                        name="education_type_id"
                        onChange={(e) => changeHandler(e)}
                        className="bg-transparent px-4 py-2.5 w-full appearance-none"
                    >
                        {
                            data.educationTypes.map((educationType: any, index: number) => {
                                return (
                                    <option selected={educationType.id === education.education_type_id} key={index} value={educationType.id}> { getByLocale(educationType.name) } </option>
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

export default EditEducation