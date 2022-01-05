import { gql, useQuery } from '@apollo/client'
import Header from "../../components/Header/Header"
import AppLayout from "../../layouts/AppLayout"
import { useTranslation } from "react-i18next"
import { useState } from 'react'
import ReactPaginate from 'react-paginate'

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

    const {data} = useQuery(_COMPANIES)

    return (
        <AppLayout>
            <section>
            <Header>
                <h1 className="text-lg font-bold">
                    {t('companies')}
                </h1>
            </Header>

            {/* <button onClick={() => setPage(page+5)} className="bg-sky-600 text-white mt-10 p-3 rounded-lg">
                Add page
            </button> */}
            {
                data && console.log(data)
                
            }

            <main className="bg-white my-5">
                <table className="w-full text-sm">
                    <thead className="bg-slate-100 text-left text-gray-800">
                        <tr className="border-b border-gray-100">
                            <th className="px-3 py-2 w-20">{t('id')}</th>
                            <th className="px-3 py-2 w-96">{t('name')}</th>
                            <th className="px-3 py-2">{t('description')}</th>
                            <th className="px-3 py-2">{t('phone')}</th>
                            <th className="px-3 py-2">{t('email')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data && data.companies.data.map((company: any, index: number) => {
                                return (
                                    <tr key={index} className="border-b border-stone-100 text-indigo-900/80">
                                        <td className="border-r border-stone-100 px-3 py-2 text-xs">{company.id}</td>
                                        <td className="border-r border-stone-100 w-96 px-3 py-2">
                                            <h1 className="font-bold">{company.name}</h1>
                                        </td>
                                        <td className="border-r border-stone-100 px-3 py-2">
                                            <p>{company.description}</p>
                                        </td>

                                        <td className="border-r border-stone-100 px-3 py-2">
                                            <p>{company.phone}</p>
                                        </td>

                                        <td className="px-3 py-2">
                                            <p>{company.email}</p>
                                        </td>

                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </main>

            <ReactPaginate
                previousClassName={'hidden'}
                nextClassName={'hidden'}
                breakLabel={'...'}
                breakClassName={'bg-white border-gray-300 text-gray-500 hover:bg-gray-50 md:inline-flex relative items-center m-1 px-4 py-2 border text-sm'}
                pageCount={data && data.companies.paginatorInfo.lastPage}
                marginPagesDisplayed={1}
                pageRangeDisplayed={3}
                onPageChange={(data) => setPage(data.selected+1)}
                pageClassName={'bg-white page-link border-gray-300 text-gray-500 hover:bg-gray-50 md:inline-flex relative items-center m-1 border text-sm'}
                containerClassName={'relative z-0 inline-flex justify-center rounded-md mb-16 w-full'}
                activeClassName={'bg-gray-200'}
            />
            </section>
        </AppLayout>
    )
}

export default Companies