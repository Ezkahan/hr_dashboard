import { useTranslation } from "react-i18next"
import { IoBusinessOutline, IoNewspaperOutline, IoPeopleOutline } from "react-icons/io5"
import { NavLink } from "react-router-dom"
import Header from "../../components/Header/Header"
import AppLayout from "../../layouts/AppLayout"
import { gql, useQuery } from "@apollo/client" 

const Dashboard: React.FC = () => {
    const { t } = useTranslation()

    const _TOTALS = gql`
        query GetCompanies {
            companies(first: 10) {
                paginatorInfo {
                    total
                }
            }
            vacancies(first: 10) {
                paginatorInfo {
                    total
                }
            }
            people(first: 10) {
                paginatorInfo {
                    total
                }
            }
        }
    `;

    const {data} = useQuery(_TOTALS)

    return (
        <AppLayout>
            <section className="xl:p-5">
            <Header>
                <h1 className="text-lg font-bold">
                    {t('dashboard')}
                </h1>
            </Header>

            <main className="bg-white grid grid-cols-12 gap-6 my-3 rounded-3xl p-5">
                <NavLink to="/companies" className="col-span-12 xl:col-span-4 flex items-center justify-between bg-sky-100/50 text-sky-900/80 p-4 rounded-3xl hover:bg-sky-200 hover:scale-105 duration-500">
                    <aside className="flex items-center px-2">
                        <IoBusinessOutline size={48} />
                        <div className="flex flex-col p-3">
                            <h1 className="text-xl font-montserrat-bold">{t('companies')}</h1>
                            <small className="mt-2"> {t('total')}: {data && data.companies.paginatorInfo.total} </small>
                        </div>
                    </aside>
                    <div className="bg-white px-6 py-4 rounded-3xl">
                        <h3 className="font-bold text-lg">+0</h3>
                    </div>
                </NavLink>


                <NavLink to="/vacancies" className="col-span-12 xl:col-span-4 flex items-center justify-between bg-emerald-100/70 text-emerald-900/80 p-4 rounded-3xl hover:bg-emerald-200 hover:scale-105 duration-500">
                    <aside className="flex items-center px-2">
                        <IoNewspaperOutline size={48} />
                        <div className="flex flex-col p-3">
                            <h1 className="text-xl font-montserrat-bold">{t('vacancies')}</h1>
                            <small className="mt-2"> {t('total')}: {data && data.vacancies.paginatorInfo.total} </small>
                        </div>
                    </aside>
                    <div className="bg-white px-6 py-4 rounded-3xl">
                        <h3 className="font-bold text-lg">+0</h3>
                    </div>
                </NavLink>


                <NavLink to="/people" className="col-span-12 xl:col-span-4 flex items-center justify-between bg-amber-100/50 text-amber-900/80 p-4 rounded-3xl hover:bg-amber-200 hover:scale-105 duration-500">
                    <aside className="flex items-center px-2">
                        <IoPeopleOutline size={48} />
                        <div className="flex flex-col p-3">
                            <h1 className="text-xl font-montserrat-bold">{t('people')}</h1>
                            <small className="mt-2"> {t('total')}: {data && data.people.paginatorInfo.total} </small>
                        </div>
                    </aside>
                    <div className="bg-white px-6 py-4 rounded-3xl">
                        <h3 className="font-bold text-lg">+0</h3>
                    </div>
                </NavLink>
            </main>
            </section>
        </AppLayout>
    )
}

export default Dashboard