import AppLayout from "../../layouts/AppLayout"
import { useTranslation } from "react-i18next"
import React, { useState } from "react"
import { useMutation } from '@apollo/client'
import { NavLink, useNavigate } from "react-router-dom"
import toast from 'react-hot-toast'

import RU_FLAG from '../../assets/icons/locales/ru.jpg'
import EN_FLAG from '../../assets/icons/locales/en.jpg'
import { IAddPerson } from "../../common/interfaces/People/IAddPerson"
import { GET_PEOPLE } from "../../graphql/queries/People/getPeopleQuery"
import { ADD_PERSON } from "../../graphql/mutations/People/addPersonMutation"

const AddPerson: React.FC = () => {
    const { t } = useTranslation()
    const navigate = useNavigate()
    const [person, setPerson] = useState<IAddPerson>({
        firstname: "",
        lastname: "",
        patronymic: "",
        born_date: "",
        description_ru: "",
        description_en: "",
    })

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) => {
        setPerson({
            ...person,
            [e.target.name]: e.target.value
        })
    }

    const onCompleted = () => {
        toast.success(t('success_saved'), {duration: 1500}) && setTimeout(() => navigate('/people'), 2000)
    }

    const [addPerson] = useMutation(ADD_PERSON, {
        onCompleted,
        onError: () => toast.error(t('error_not_saved'), {duration: 2000}),
        refetchQueries: [
            {
                query: GET_PEOPLE,
                variables: { page: 1 }
            }
        ]
    });

    const onSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault()

        addPerson({
            variables: {
                firstname: person.firstname,
                lastname: person.lastname,
                patronymic: person.patronymic,
                born_date: person.born_date,
                description_ru: person.description_ru,
                description_en: person.description_en,
            }
        })
    }

    return (
        <AppLayout>
            <section className="xl:p-5 p-1">
                <form onSubmit={(e) => onSubmit(e)} className="bg-white xl:px-8 px-5 xl:py-6 py-4 xl:my-5 my-3 rounded-lg">
                    <h1 className="text-lg font-montserrat-bold">
                        {t('new_person')}
                    </h1>

                    <aside className="grid grid-cols-12 gap-5 mt-5 mb-8">
                        <div className="col-span-12 xl:col-span-6 bg-slate-50 border border-slate-200 rounded-lg flex flex-col w-full overflow-hidden">
                            <small className="px-4 pt-2">{t('firstname')}</small>
                            <input required name="firstname" onChange={(e) => changeHandler(e)} type="text" className="bg-slate-50 px-4 py-2" placeholder={t('firstname')} />
                        </div>

                        <div className="col-span-12 xl:col-span-6 bg-slate-50 border border-slate-200 rounded-lg flex flex-col w-full overflow-hidden">
                            <small className="px-4 pt-2">{t('lastname')}</small>
                            <input required name="lastname" onChange={(e) => changeHandler(e)} type="text" className="bg-slate-50 px-4 py-2" placeholder={t('lastname')} />
                        </div>
                    </aside>

                    <aside className="grid grid-cols-12 gap-5 mt-5 mb-8">
                        <div className="col-span-12 xl:col-span-6 bg-slate-50 border border-slate-200 rounded-lg flex flex-col w-full overflow-hidden">
                            <small className="px-4 pt-2">{t('patronymic')}</small>
                            <input name="patronymic" onChange={(e) => changeHandler(e)} type="text" className="bg-slate-50 px-4 py-2" placeholder={t('patronymic')} />
                        </div>

                        <div className="col-span-12 xl:col-span-6 bg-slate-50 border border-slate-200 rounded-lg flex flex-col w-full overflow-hidden">
                            <small className="px-4 pt-2">{t('born_date')}</small>
                            <input name="born_date" onChange={(e) => changeHandler(e)} type="text" className="bg-slate-50 px-4 py-2" placeholder={t('born_date')} />
                        </div>
                    </aside>

                    <aside className="grid grid-cols-12 gap-5 mt-5 mb-8">
                        <div className="col-span-12 xl:col-span-6 bg-slate-50 border border-slate-200 rounded-lg flex flex-col w-full overflow-hidden">
                            <header className="flex items-center justify-between">
                                <small className="px-4 pt-2">{t('description')}</small>
                                <img src={RU_FLAG} alt="RU" className="w-6 h-4 mr-4 mt-2" />
                            </header>
                            <textarea name="description_ru" onChange={(e) => changeHandler(e)} className="bg-slate-50 h-60 px-4 py-2" placeholder={t('description')}></textarea>
                        </div>

                        <div className="col-span-12 xl:col-span-6 bg-slate-50 border border-slate-200 rounded-lg flex flex-col w-full overflow-hidden">
                            <header className="flex items-center justify-between">
                                <small className="px-4 pt-2">{t('description')}</small>
                                <img src={EN_FLAG} alt="RU" className="w-6 h-4 mr-4 mt-2" />
                            </header>
                            <textarea name="description_en" onChange={(e) => changeHandler(e)} className="bg-slate-50 h-60 px-4 py-2" placeholder={t('description')}></textarea>
                        </div>
                    </aside>

                    <button className="bg-indigo-600 hover:bg-indigo-800 text-white font-montserrat-bold px-6 py-2.5 border border-indigo-600 duration-300 rounded-lg">
                        {t('add')}
                    </button>
                    <NavLink to="/people" className="bg-slate-100 hover:bg-slate-200 text-slate-600 border border-slate-200 font-montserrat-bold px-6 py-3 duration-300 rounded-lg ml-10">
                        {t('cancel')}
                    </NavLink>
                </form>
            </section>
        </AppLayout>
    )
}

export default AddPerson