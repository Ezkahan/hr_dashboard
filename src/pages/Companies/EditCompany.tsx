import Header from "../../components/Header/Header"
import AppLayout from "../../layouts/AppLayout"
import { useTranslation } from "react-i18next"
import React, { useState } from "react"
import { useMutation, useQuery } from '@apollo/client'
import { NavLink, Navigate, useParams } from "react-router-dom"
import toast from 'react-hot-toast'

import RU_FLAG from '../../assets/icons/locales/ru.jpg'
import EN_FLAG from '../../assets/icons/locales/en.jpg'
import { ICompanyCreate } from "../../common/interfaces/Company/ICompanyCreate"
import { CREATE_COMPANY } from "../../graphql/mutations/Company/createCompanyMutation"
import { _GET_COMPANIES } from "../../graphql/queries/Company/getCompaniesQuery"
import { _GET_COMPANY } from "../../graphql/queries/Company/getCompanyQuery"

const EditCompany: React.FC = () => {
    const { t } = useTranslation()
    const { id } = useParams()

    const [company, setCompany] = useState<ICompanyCreate>({
        name_ru: "",
        name_en: "",
        phone: "",
        fax: "",
        email: "",
        website: "",
        description_ru: "",
        description_en: "",
        company_type_id: 1
    })

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) => {
        setCompany({
            ...company,
            [e.target.name]: e.target.value
        })
    }

    const onCompleted = () => {
        return <Navigate to="/companies" />
    }

    const {loading, data} = useQuery(_GET_COMPANY, {
        variables: {id: id},
        onError: () => toast.error(t('error_not_loaded'), {duration: 2000})
    })

    const [updateCompany] = useMutation(CREATE_COMPANY, {
        onCompleted,
        onError: () => toast.error(t('error_not_saved'), {duration: 2000}),
        refetchQueries: [
            {
                query: _GET_COMPANIES,
                variables: { page: 1 }
            }
        ]
    });

    const onSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault()

        updateCompany({
            variables: {
                name_ru: company.name_ru,
                name_en: company.name_en,
                phone: company.phone,
                fax: company.fax,
                email: company.email,
                website: company.website,
                description_ru: company.description_ru,
                description_en: company.description_en,
            }
        })
    }

    return (
        <AppLayout>
            <section className="xl:p-5 p-1">
                <Header>
                    <div>
                        <h1 className="text-lg font-bold">
                            {t('companies')}
                        </h1>
                        <small className="text-slate-500"> {t('edit_company')} </small>
                    </div>
                </Header>

                {
                    data && data.company &&
                    <form onSubmit={(e) => onSubmit(e)} className="bg-white xl:px-8 px-5 xl:py-6 py-4 xl:my-5 my-3 rounded-lg">
                        <h1 className="text-lg font-montserrat-bold">
                            { data.company.name ? data.company.name : t('edit_company')}
                        </h1>

                        <aside className="grid grid-cols-12 gap-5 mt-5 mb-8">
                            <div className="col-span-12 xl:col-span-6 bg-slate-50 border border-slate-200 rounded-lg flex flex-col w-full overflow-hidden">
                                <header className="flex items-center justify-between">
                                    <small className="px-4 pt-2">{t('company_name')}</small>
                                    <img src={RU_FLAG} alt="RU" className="w-6 h-4 mr-4 mt-2" />
                                </header>
                                <input
                                    required
                                    name="name_ru"
                                    onChange={(e) => changeHandler(e)}
                                    type="text"
                                    className="bg-slate-50 px-4 py-2"
                                    placeholder={t('input_company_name')}
                                    value={data.company.name}
                                />
                            </div>

                            <div className="col-span-12 xl:col-span-6 bg-slate-50 border border-slate-200 rounded-lg flex flex-col w-full overflow-hidden">
                                <header className="flex items-center justify-between">
                                    <small className="px-4 pt-2">{t('company_name')}</small>
                                    <img src={EN_FLAG} alt="EN" className="w-6 h-4 mr-4 mt-2" />
                                </header>
                                <input
                                    required
                                    name="name_en"
                                    onChange={(e) => changeHandler(e)}
                                    type="text"
                                    className="bg-slate-50 px-4 py-2"
                                    placeholder={t('input_company_name')}
                                    value={data.company.name}
                                />
                            </div>
                        </aside>

                        <aside className="grid grid-cols-12 gap-5 mt-5 mb-8">
                            <div className="col-span-12 xl:col-span-6 bg-slate-50 border border-slate-200 rounded-lg flex flex-col w-full overflow-hidden">
                                <small className="px-4 pt-2">{t('company_phone')}</small>
                                <input
                                name="phone"
                                onChange={(e) => changeHandler(e)}
                                type="text"
                                className="bg-slate-50 px-4 py-2"
                                placeholder={t('input_company_phone')}
                                value={data.company.phone}
                            />
                            </div>

                            <div className="col-span-12 xl:col-span-6 bg-slate-50 border border-slate-200 rounded-lg flex flex-col w-full overflow-hidden">
                                <small className="px-4 pt-2">{t('company_fax')}</small>
                                <input
                                name="fax"
                                onChange={(e) => changeHandler(e)}
                                type="text"
                                className="bg-slate-50 px-4 py-2"
                                placeholder={t('input_company_fax')}
                                value={data.company.fax}
                            />
                            </div>
                        </aside>

                        <aside className="grid grid-cols-12 gap-5 mt-5 mb-8">
                            <div className="col-span-12 xl:col-span-6 bg-slate-50 border border-slate-200 rounded-lg flex flex-col w-full overflow-hidden">
                                <small className="px-4 pt-2">{t('company_email')}</small>
                                <input
                                    name="email"
                                    onChange={(e) => changeHandler(e)}
                                    type="text"
                                    className="bg-slate-50 px-4 py-2"
                                    placeholder={t('input_company_email')}
                                    value={data.company.email}
                                />
                            </div>

                            <div className="col-span-12 xl:col-span-6 bg-slate-50 border border-slate-200 rounded-lg flex flex-col w-full overflow-hidden">
                                <small className="px-4 pt-2">{t('company_website')}</small>
                                <input
                                    name="website"
                                    onChange={(e) => changeHandler(e)}
                                    type="text"
                                    className="bg-slate-50 px-4 py-2"
                                    placeholder={t('input_company_website')}
                                    value={data.company.website}
                                />
                            </div>
                        </aside>

                        <aside className="grid grid-cols-12 gap-5 mt-5 mb-8">
                            <div className="col-span-12 xl:col-span-6 bg-slate-50 border border-slate-200 rounded-lg flex flex-col w-full overflow-hidden">
                                <header className="flex items-center justify-between">
                                    <small className="px-4 pt-2">{t('company_description')}</small>
                                    <img src={RU_FLAG} alt="RU" className="w-6 h-4 mr-4 mt-2" />
                                </header>
                                <textarea
                                    name="description_ru"
                                    onChange={(e) => changeHandler(e)}
                                    className="bg-slate-50 h-60 px-4 py-2"
                                    placeholder={t('input_company_description')}
                                >{data.company.description}</textarea>
                            </div>

                            <div className="col-span-12 xl:col-span-6 bg-slate-50 border border-slate-200 rounded-lg flex flex-col w-full overflow-hidden">
                                <header className="flex items-center justify-between">
                                    <small className="px-4 pt-2">{t('company_description')}</small>
                                    <img src={EN_FLAG} alt="RU" className="w-6 h-4 mr-4 mt-2" />
                                </header>
                                <textarea
                                    name="description_en"
                                    onChange={(e) => changeHandler(e)}
                                    className="bg-slate-50 h-60 px-4 py-2"
                                    placeholder={t('input_company_description')}
                                >{data.company.description}</textarea>
                            </div>
                        </aside>

                        <button className="bg-indigo-600 hover:bg-indigo-800 text-white font-montserrat-bold px-6 py-2.5 border border-indigo-600 duration-300 rounded-lg">
                            {t('save')}
                        </button>
                        <NavLink to="/companies" className="bg-slate-100 hover:bg-slate-200 text-slate-600 border border-slate-200 font-montserrat-bold px-6 py-3 duration-300 rounded-lg ml-10">
                            {t('cancel')}
                        </NavLink>
                    </form>
                }
            </section>
        </AppLayout>
    )
}

export default EditCompany