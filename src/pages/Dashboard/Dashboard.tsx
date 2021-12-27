import { useTranslation } from "react-i18next"
import { IoBusinessOutline, IoNewspaperOutline, IoPeopleOutline } from "react-icons/io5"
import Header from "../../components/Header/Header"
import AppLayout from "../../layouts/AppLayout"

const Dashboard: React.FC = () => {
    const { t } = useTranslation()

    return (
        <AppLayout>
            <>
                <Header>
                    <h1 className="text-lg font-bold">
                        {t('dashboard')}
                    </h1>
                </Header>

                <section className="grid grid-cols-12 gap-6 my-3 p-5">
                    <main className="col-span-12 xl:col-span-4 flex items-center justify-between bg-sky-100/50 text-sky-900/80 p-4 rounded-3xl">
                        <aside className="flex items-center px-2">
                            <IoBusinessOutline size={48} />
                            <div className="flex flex-col p-3">
                                <h1 className="text-xl font-bold">{t('companies')}</h1>
                                <small className="mt-2"> {t('total')}: 2430 </small>
                            </div>
                        </aside>
                        <div className="bg-white px-6 py-4 rounded-3xl">
                            <h3 className="font-bold text-lg">+13</h3>
                        </div>
                    </main>


                    <main className="col-span-12 xl:col-span-4 flex items-center justify-between bg-emerald-100/70 text-emerald-900/80 p-4 rounded-3xl">
                        <aside className="flex items-center px-2">
                            <IoNewspaperOutline size={48} />
                            <div className="flex flex-col p-3">
                                <h1 className="text-xl font-bold">{t('vacancies')}</h1>
                                <small className="mt-2"> {t('total')}: 2430 </small>
                            </div>
                        </aside>
                        <div className="bg-white px-6 py-4 rounded-3xl">
                            <h3 className="font-bold text-lg">+13</h3>
                        </div>
                    </main>


                    <main className="col-span-12 xl:col-span-4 flex items-center justify-between bg-amber-100/50 text-amber-900/80 p-4 rounded-3xl">
                        <aside className="flex items-center px-2">
                            <IoPeopleOutline size={48} />
                            <div className="flex flex-col p-3">
                                <h1 className="text-xl font-bold">{t('people')}</h1>
                                <small className="mt-2"> {t('total')}: 2430 </small>
                            </div>
                        </aside>
                        <div className="bg-white px-6 py-4 rounded-3xl">
                            <h3 className="font-bold text-lg">+13</h3>
                        </div>
                    </main>
                </section>
            </>
        </AppLayout>
    )
}

export default Dashboard