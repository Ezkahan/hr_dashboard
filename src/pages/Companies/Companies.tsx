import { gql, useQuery } from '@apollo/client'
import Header from "../../components/Header/Header"
import AppLayout from "../../layouts/AppLayout"
import { useTranslation } from "react-i18next"
import { useState } from 'react'
import ReactPaginate from 'react-paginate'
import MiniLoader from '../../components/Loader/MiniLoader'
import Error from '../../components/Error/Error'
import { NavLink } from 'react-router-dom'

const Companies: React.FC = () => {
    const { t } = useTranslation()
    const [page, setPage] = useState(1)

    const _COMPANIES = gql`
        query GetCompanies {
            companies(first: 30, page: ${page}, orderBy: [{column: ID, order: DESC}])
            {
                data {
                    id
                    name
                }
                paginatorInfo {
                    count
                    currentPage
                    firstItem
                    lastItem
                    lastPage
                    perPage
                    total
                    hasMorePages
                }
            }
        }
    `;

    const {loading, error, data} = useQuery(_COMPANIES)

    return (
        <AppLayout>
            <section className="xl:p-5 p-1">
            <Header>
                <h1 className="text-lg font-bold">
                    {t('companies')}
                </h1>
            </Header>

            <main className="bg-white xl:px-8 px-6 xl:py-6 py-4 mb-5 rounded-lg">
                <header className=" flex justify-between items-center py-3 mb-5">
                    <div className="w-full xl:w-4/12">
                        <input type="text" className="border border-slate-200 px-5 py-2 rounded-lg w-full" placeholder={t('search')} />
                    </div>

                    <div className="ml-5">
                        <NavLink to="/company/create" className="border border-indigo-500 hover:bg-indigo-600 text-indigo-600 hover:text-white duration-300 px-4 py-2 rounded-lg">
                            {t('create')}
                        </NavLink>
                    </div>
                </header>

                {
                    loading && <MiniLoader />
                }

                {
                    error && error.message
                }

                {
                    data && data.companies.data &&

                    <section className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead className="bg-slate-100 text-left text-gray-800">
                                <tr>
                                    <th className="px-4 py-3 w-20 rounded-tl-lg rounded-bl-lg">{t('id')}</th>
                                    <th className="px-4 py-3 w-96">{t('name')}</th>
                                    <th className="px-4 py-3">{t('description')}</th>
                                    <th className="px-4 py-3">{t('phone')}</th>
                                    <th className="px-4 py-3 rounded-tr-lg rounded-br-lg">{t('email')}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    data.companies.data.map((company: any, index: number) => {
                                        return (
                                            <tr key={index} className="border-b border-stone-100 text-indigo-900/80">
                                                <td className="border-r border-stone-100 px-4 py-3 text-xs">{company.id}</td>
                                                <td className="border-r border-stone-100 w-96 px-4 py-3">
                                                    <h1 className="font-bold">{company.name}</h1>
                                                </td>
                                                <td className="border-r border-stone-100 px-4 py-3">
                                                    <p>{company.description}</p>
                                                </td>

                                                <td className="border-r border-stone-100 px-4 py-3">
                                                    <p>{company.phone}</p>
                                                </td>

                                                <td className="px-4 py-3">
                                                    <p>{company.email}</p>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </section>
                }
            </main>

            <ReactPaginate
                previousClassName={'hidden'}
                nextClassName={'hidden'}
                breakLabel={'...'}
                breakClassName={'bg-white border-gray-300 rounded-lg text-gray-500 hover:bg-gray-50 md:inline-flex relative items-center m-1 px-4 py-2 border text-sm'}
                pageCount={data && data.companies.paginatorInfo.lastPage}
                marginPagesDisplayed={1}
                pageRangeDisplayed={3}
                onPageChange={(data) => setPage(data.selected+1)}
                pageClassName={'bg-white page-link rounded-lg border-gray-300 text-gray-500 hover:bg-gray-50 md:inline-flex relative items-center m-1 border text-sm'}
                containerClassName={'relative z-0 inline-flex justify-center rounded-md mb-16 w-full'}
                activeClassName={'bg-gray-200'}
            />
            </section>
        </AppLayout>
    )
}

export default Companies