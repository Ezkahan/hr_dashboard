import React, { useState } from "react"
import {IoArrowUndoCircleOutline, IoCheckmarkCircleOutline} from 'react-icons/io5'

import RU_FLAG from '../../assets/icons/locales/ru.jpg'
import EN_FLAG from '../../assets/icons/locales/en.jpg'
import { useTranslation } from "react-i18next"
import toast from "react-hot-toast"
import { useMutation, useQuery } from "@apollo/client"
import { IModal } from "../../common/interfaces/IModal"
import { GET_TOWNS } from "../../graphql/queries/Location/Town/getTownsQuery"
import getByLocale from "../../common/helpers/getByLocale"
import { IEditSkill } from "../../common/interfaces/Skill/IEditSkill"
import { UPDATE_SKILL } from "../../graphql/mutations/Skill/updateSkillMutation"
import { GET_SKILL_TYPES } from "../../graphql/queries/Skill/getSkillTypesQuery"
import { GET_SKILLS } from "../../graphql/queries/Skill/getSkillsQuery"

const EditSkill: React.FC<IModal & IEditSkill> = ({id, name, skill_type_id, close}) => {
    const { t } = useTranslation()
    const [skill, setSkill] = useState<IEditSkill>({
        id: id,
        name: {
            ru: name.ru,
            en: name.en,
        },
        skill_type_id: skill_type_id,
    })

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement|HTMLSelectElement>) => {
        setSkill({
            ...skill,
            name: {
                ...skill.name,
                [e.target.name]: e.target.value
            },
            skill_type_id: e.target.name === 'skill_type_id' ? parseInt(e.target.value) : skill.skill_type_id
        })
    }

    const onCompleted = () => {
        toast.success(t('success_saved'), {duration: 1500}) && setTimeout(() => close(), 2000)
    }

    const {data} = useQuery(GET_SKILL_TYPES)

    const [updateSkill] = useMutation(UPDATE_SKILL, {
        onCompleted,
        onError: () => {},
        refetchQueries: [
            {
                query: GET_SKILLS,
                variables: {page: 1}
            }
        ]
    })

    const saveSkill = (e: React.SyntheticEvent) => {
        e.preventDefault()
        
        updateSkill({
            variables: {
                id: id,
                name_ru: skill.name.ru,
                name_en: skill.name.en,
                skill_type_id: skill.skill_type_id,
            }
        })
    }

    return (
        <form onSubmit={(e) => saveSkill(e)} className="p-3">
            <h1 className="text-xl font-montserrat-bold">
                {t('edit')}
            </h1>
            <aside className="grid grid-cols-12 gap-5 my-5">
                <div className="col-span-12 bg-slate-50 border border-slate-200 rounded-lg flex flex-col w-full overflow-hidden">
                    <header className="flex items-center justify-between">
                        <small className="px-4 pt-2 text-slate-400">{t('skill_name')}</small>
                        <img src={RU_FLAG} alt="RU" className="w-6 h-4 mr-4 mt-2" />
                    </header>
                    <input
                        required
                        name="ru"
                        onChange={(e) => changeHandler(e)}
                        type="text"
                        className="bg-slate-50 px-4 py-2"
                        value={skill && skill.name.ru}
                        placeholder={t('input_skill_name')}
                    />
                </div>

                <div className="col-span-12 bg-slate-50 border border-slate-200 rounded-lg flex flex-col w-full overflow-hidden">
                    <header className="flex items-center justify-between">
                        <small className="px-4 pt-2 text-slate-400">{t('skill_name')}</small>
                        <img src={EN_FLAG} alt="EN" className="w-6 h-4 mr-4 mt-2" />
                    </header>
                    <input
                        required
                        name="en"
                        onChange={(e) => changeHandler(e)}
                        type="text"
                        className="bg-slate-50 px-4 py-2"
                        value={skill && skill.name.en}
                        placeholder={t('input_skill_name')}
                    />
                </div>
            </aside>

            {
                data && data.skillTypes &&
                <aside className="mb-5">
                    <div className="col-span-12 bg-slate-50 border border-slate-200 rounded-lg flex flex-col w-full overflow-hidden">
                    <header className="flex items-center justify-between">
                        <small className="px-4 pt-2 text-slate-400">{t('skill_type')}</small>
                    </header>
                    <select
                        name="skill_type_id"
                        onChange={(e) => changeHandler(e)}
                        className="bg-transparent px-4 py-2.5 w-full appearance-none"
                    >
                        {
                            data.skillTypes.map((skillType: any, index: number) => {
                                return (
                                    <option selected={skillType.id === skill.skill_type_id} key={index} value={skillType.id}> { getByLocale(skillType.name) } </option>
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

export default EditSkill