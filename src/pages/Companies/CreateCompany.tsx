import Header from "../../components/Header/Header"
import AppLayout from "../../layouts/AppLayout"
import { useTranslation } from "react-i18next"

import RU_FLAG from '../../assets/icons/locales/ru.jpg'
import EN_FLAG from '../../assets/icons/locales/en.jpg'

const CreateCompany: React.FC = () => {
    const { t } = useTranslation()

    return (
        <AppLayout>
            <section className="p-5">
            <Header>
                <div>
                    <h1 className="text-lg font-bold">
                        {t('companies')}
                    </h1>
                    <small className="text-slate-500"> {t('new_company')} </small>
                </div>
            </Header>

            <main className="bg-white px-8 py-6 my-5 rounded-lg">
                <h1 className="text-lg font-montserrat-bold">
                    {t('new_company')}
                </h1>

                <aside className="grid grid-cols-12 gap-5 mt-5 mb-8">
                    <div className="col-span-12 xl:col-span-6 bg-slate-50 border border-slate-200 rounded-lg flex flex-col w-full overflow-hidden">
                        <header className="flex items-center justify-between">
                            <small className="px-4 pt-2">{t('company_name')}</small>
                            <img src={RU_FLAG} alt="RU" className="w-6 h-4 mr-4 mt-2" />
                        </header>
                        <input type="text" className="bg-slate-50 px-4 py-2" placeholder={t('input_company_name')} />
                    </div>

                    <div className="col-span-12 xl:col-span-6 bg-slate-50 border border-slate-200 rounded-lg flex flex-col w-full overflow-hidden">
                        <header className="flex items-center justify-between">
                            <small className="px-4 pt-2">{t('company_name')}</small>
                            <img src={EN_FLAG} alt="EN" className="w-6 h-4 mr-4 mt-2" />
                        </header>
                        <input type="text" className="bg-slate-50 px-4 py-2" placeholder={t('input_company_name')} />
                    </div>
                </aside>

                <aside className="grid grid-cols-12 gap-5 mt-5 mb-8">
                    <div className="col-span-12 xl:col-span-6 bg-slate-50 border border-slate-200 rounded-lg flex flex-col w-full overflow-hidden">
                        <small className="px-4 pt-2">{t('company_phone')}</small>
                        <input type="text" className="bg-slate-50 px-4 py-2" placeholder={t('input_company_phone')} />
                    </div>

                    <div className="col-span-12 xl:col-span-6 bg-slate-50 border border-slate-200 rounded-lg flex flex-col w-full overflow-hidden">
                        <small className="px-4 pt-2">{t('company_fax')}</small>
                        <input type="text" className="bg-slate-50 px-4 py-2" placeholder={t('input_company_fax')} />
                    </div>
                </aside>

                <aside className="grid grid-cols-12 gap-5 mt-5 mb-8">
                    <div className="col-span-12 xl:col-span-6 bg-slate-50 border border-slate-200 rounded-lg flex flex-col w-full overflow-hidden">
                        <small className="px-4 pt-2">{t('company_email')}</small>
                        <input type="text" className="bg-slate-50 px-4 py-2" placeholder={t('input_company_email')} />
                    </div>

                    <div className="col-span-12 xl:col-span-6 bg-slate-50 border border-slate-200 rounded-lg flex flex-col w-full overflow-hidden">
                        <small className="px-4 pt-2">{t('company_website')}</small>
                        <input type="text" className="bg-slate-50 px-4 py-2" placeholder={t('input_company_website')} />
                    </div>
                </aside>

                <aside className="grid grid-cols-12 gap-5 mt-5 mb-8">
                    <div className="col-span-12 xl:col-span-6 bg-slate-50 border border-slate-200 rounded-lg flex flex-col w-full overflow-hidden">
                        <small className="px-4 pt-2">{t('company_email')}</small>
                        <textarea className="bg-slate-50 h-60 px-4 py-2" placeholder={t('input_company_email')}></textarea>
                    </div>

                    <div className="col-span-12 xl:col-span-6 bg-slate-50 border border-slate-200 rounded-lg flex flex-col w-full overflow-hidden">
                        <small className="px-4 pt-2">{t('company_website')}</small>
                        <textarea className="bg-slate-50 h-60 px-4 py-2" placeholder={t('input_company_website')}></textarea>
                    </div>
                </aside>

                <button className="bg-indigo-600 hover:bg-indigo-800 text-white font-montserrat-bold px-6 py-3 duration-300 rounded-lg">
                    {t('save')}
                </button>
            </main>

            </section>
        </AppLayout>
    )
}

export default CreateCompany