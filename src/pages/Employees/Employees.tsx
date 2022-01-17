import { useTranslation } from "react-i18next"
import AppLayout from "../../layouts/AppLayout"
import { gql, useQuery } from '@apollo/client'
import { useState } from "react"
import ReactPaginate from 'react-paginate'
import { NavLink } from "react-router-dom"
import MiniLoader from "../../components/Loader/MiniLoader"
import EmptyList from "../../components/Message/EmptyList"

const Employees: React.FC = () => {
    const {t} = useTranslation()
    const [page, setPage] = useState(1)

    // const _SKILLS = gql`
    //     query GetSkills {
    //         skills(first: 10, page: ${page}, orderBy: [{column: ID, order: DESC}]) {
    //             data {
    //                 id
    //                 name
    //                 skillType {
    //                     name
    //                 }
    //             }
    //             paginatorInfo {
    //                 count
    //                 currentPage
    //                 firstItem
    //                 lastItem
    //                 lastPage
    //                 perPage
    //                 total
    //                 hasMorePages
    //             }
    //         }
    //     }
    // `;

    // const {loading, error, data} = useQuery(_SKILLS)

    return (
        <AppLayout>
            <section className="xl:p-5 p-1">

            <main className="bg-white xl:px-8 px-6 xl:py-6 py-4 mb-5 rounded-lg">
                <header className=" flex justify-between items-center py-3 mb-5">
                    <div className="w-full xl:w-4/12">
                        <input type="text" className="border border-slate-200 px-5 py-2 rounded-lg w-full" placeholder={t('search')} />
                    </div>

                    <div className="ml-5">
                        <NavLink to="/employe/add" className="border border-indigo-500 hover:bg-indigo-600 text-indigo-600 hover:text-white duration-300 px-4 py-2 rounded-lg">
                            {t('add')}
                        </NavLink>
                    </div>
                </header>

                <EmptyList />

                {/* {
                    loading && <MiniLoader />
                }

                {
                    error && error.message
                } */}

                {/* {
                    data && data.skills.data &&

                    <section className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead className="bg-slate-100 text-left text-gray-800">
                                <tr className="border-b border-gray-100">
                                    <th className="px-4 py-3 w-20 rounded-tl-lg rounded-bl-lg">{t('id')}</th>
                                    <th className="px-4 py-3">{t('name')}</th>
                                    <th className="px-4 py-3 rounded-tr-lg rounded-br-lg">{t('category')}</th>
                                </tr>
                            </thead>
                            
                            <tbody>
                                {
                                    data && data.skills.data.map((skill: any, index: number) => {
                                        return (
                                            <tr key={index} className="border-b border-stone-100 text-indigo-900/80">
                                                <td className="border-r border-stone-100 px-3 py-2 text-xs">{skill.id}</td>
                                                <td className="border-r border-stone-100 w-96 px-3 py-2">
                                                    <h1 className="font-bold">{skill.name}</h1>
                                                </td>
                                                <td className="border-stone-100 px-3 py-2">
                                                    <p>{skill.skillType && skill.skillType.name ? skill.skillType.name : t('unknown')}</p>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </section>
                } */}
            </main>

            <ReactPaginate
                previousClassName={'hidden'}
                nextClassName={'hidden'}
                breakLabel={'...'}
                breakClassName={'bg-white rounded-lg border-gray-300 text-gray-500 hover:bg-gray-50 md:inline-flex relative items-center m-1 px-4 py-2 border text-sm'}
                pageCount={0}
                // pageCount={data && data.skills.paginatorInfo.lastPage}
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

export default Employees