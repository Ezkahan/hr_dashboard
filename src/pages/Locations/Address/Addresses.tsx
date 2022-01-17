import { useTranslation } from "react-i18next"
import { gql, useQuery } from '@apollo/client'
import { useState } from "react"
import ReactPaginate from 'react-paginate'
import { NavLink } from "react-router-dom"
import toast from "react-hot-toast"
import AppLayout from "../../../layouts/AppLayout"
import LocationNav from "../LocationNav"
import MiniLoader from "../../../components/Loader/MiniLoader"
import { GET_ADDRESSES } from "../../../graphql/queries/Location/Address/getAddressesQuery"
import getByLocale from "../../../common/helpers/getByLocale"

const Addresses: React.FC = () => {
    const {t} = useTranslation()
    const [page, setPage] = useState(1)

    const {loading, data} = useQuery(GET_ADDRESSES, {
        variables: {page},
        onError: () => toast.error(t('error_not_loaded'), {duration: 2000})
    })

    return (
        <AppLayout>
            <section className="xl:p-5 p-1">
            <LocationNav />

            <main className="bg-white xl:px-8 px-6 xl:py-6 py-4 mb-5 rounded-lg">
                <header className=" flex justify-between items-center py-3 mb-5">
                    <div className="w-full xl:w-4/12">
                        <input type="text" className="border border-slate-200 px-5 py-2 rounded-lg w-full" placeholder={t('search')} />
                    </div>

                    <div className="ml-5">
                        <button disabled className="opacity-20 border border-indigo-500 hover:bg-indigo-600 text-indigo-600 hover:text-white duration-300 px-4 py-2 rounded-lg">
                            {t('add')}
                        </button>
                    </div>
                </header>

                {
                    loading && <MiniLoader />
                }

                {
                    data && data.addresses.data &&

                    <section className="overflow-x-auto">
                        <table className="w-full table-fixed text-sm">
                            <thead className="bg-slate-100 text-left text-gray-800">
                                <tr className="border-b border-gray-100">
                                    <th className="px-4 py-3 w-20 rounded-tl-lg rounded-bl-lg">{t('id')}</th>
                                    <th className="px-4 py-3 w-52">{t('address')}</th>
                                    <th className="px-4 py-3 w-52">{t('country')}</th>
                                    <th className="px-4 py-3 w-52">{t('town')}</th>
                                    <th className="px-4 py-3 w-52">{t('area')}</th>
                                    <th className="px-4 py-3 w-52">{t('district')}</th>
                                    <th className="px-4 py-3 w-16 rounded-tr-lg rounded-br-lg">{t('status')}</th>
                                </tr>
                            </thead>
                            
                            <tbody>
                                {
                                    data && data.addresses.data.map((address: any, index: number) => {
                                        return (
                                            <tr key={index} className="border-b border-stone-100 text-indigo-900/80">
                                                <td className="border-r border-stone-100 px-3 py-2 text-xs">{address.id}</td>
                                                <td className="px-3 py-2">
                                                    <h1 className="font-bold">{address.address}</h1>
                                                </td>
                                                <td className="px-3 py-2">
                                                    <h1 className="font-bold">{address.country && getByLocale(address.country.name)}</h1>
                                                </td>
                                                <td className="px-3 py-2">
                                                    <h1 className="font-bold">{address.town && getByLocale(address.town.name)}</h1>
                                                </td>

                                                <td className="px-3 py-2">
                                                    <h1 className="font-bold">{address.area && getByLocale(address.area.name)}</h1>
                                                </td>

                                                <td className="px-3 py-2">
                                                    <h1 className="font-bold">{address.district}</h1>
                                                </td>

                                                <td className="w-10 px-3 py-2">
                                                    <h1 className="font-bold">{address.status}</h1>
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

            {
                data && data.addresses.paginatorInfo.lastPage > 1 &&
                <ReactPaginate
                    previousClassName={'hidden'}
                    nextClassName={'hidden'}
                    breakLabel={'...'}
                    breakClassName={'bg-white rounded-lg border-gray-300 text-gray-500 hover:bg-gray-50 md:inline-flex relative items-center m-1 px-4 py-2 border text-sm'}
                    pageCount={data && data.addresses.paginatorInfo.lastPage}
                    marginPagesDisplayed={1}
                    pageRangeDisplayed={3}
                    onPageChange={(data) => setPage(data.selected+1)}
                    pageClassName={'bg-white page-link rounded-lg border-gray-300 text-gray-500 hover:bg-gray-50 md:inline-flex relative items-center m-1 border text-sm'}
                    containerClassName={'relative z-0 inline-flex justify-center rounded-md mb-16 w-full'}
                    activeClassName={'bg-gray-200'}
                />
            }
            
            </section>
        </AppLayout>
    )
}

export default Addresses