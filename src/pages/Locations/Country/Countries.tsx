import { useTranslation } from "react-i18next"
import Header from "../../../components/Header/Header"
import AppLayout from "../../../layouts/AppLayout"
import { useQuery } from '@apollo/client'
import { useState } from "react"
import ReactPaginate from 'react-paginate'
import MiniLoader from "../../../components/Loader/MiniLoader"
import { IoPencilOutline, IoTrashOutline } from "react-icons/io5"
import toast from "react-hot-toast"
import LocationNav from "../LocationNav"
import { COUNTRIES } from "../../../graphql/queries/Location/Country/getCountriesQuery"
import getByLocale from "../../../common/helpers/getByLocale"
import Modal from '../../../components/Modal/Modal'
import AddCountry from "./AddCountry"
import { IDeleteModal } from "../../../common/interfaces/IDeleteModal"
import DeleteCountry from "./DeleteCountry"

const Countries: React.FC = () => {
    const {t} = useTranslation()
    const [page, setPage] = useState<number>(1)
    const [addModal, setAddModal] = useState<boolean>(false)
    const [deleteModal, setDeleteModal] = useState<IDeleteModal>({
        id: null,
        delete: false
    })

    const {loading, data} = useQuery(COUNTRIES, {
        variables: {page},
        onError: () => toast.error(t('error_not_loaded'), {duration: 2000})
    })

    const toggleAddModal = () => {
        setAddModal(!addModal)
    }

    const toggleDeleteModal = (id: number | null = null) => {
        setDeleteModal({delete: !deleteModal.delete, id})
    }

    return (
        <AppLayout>
            <section className="xl:p-5 p-1">
            <Header>
                <h1 className="text-lg font-bold">
                    {t('countries')}
                </h1>
            </Header>

            <LocationNav />

            <Modal isOpen={addModal} close={toggleAddModal}>
                <AddCountry close={toggleAddModal} />
            </Modal>

            <Modal isOpen={deleteModal.delete} close={toggleDeleteModal}>
                <DeleteCountry id={deleteModal.id} close={toggleDeleteModal} />
            </Modal>

            <main className="bg-white xl:px-8 px-6 xl:py-6 py-4 mb-5 rounded-lg">
                <header className=" flex justify-between items-center py-3 mb-5">
                    <div className="w-full xl:w-4/12">
                        <input type="text" className="border border-slate-200 px-5 py-2 rounded-lg w-full" placeholder={t('search')} />
                    </div>

                    <div className="ml-5">
                        <button onClick={() => toggleAddModal()} className="border border-indigo-500 hover:bg-indigo-600 text-indigo-600 hover:text-white duration-300 px-4 py-2 rounded-lg">
                            {t('add')}
                        </button>
                    </div>
                </header>

                {
                    loading && <MiniLoader />
                }

                {
                    data && data.countries.data &&

                    <section className="overflow-x-auto">
                        <table className="w-full table-fixed text-sm">
                            <thead className="bg-slate-100 text-left text-gray-800">
                                <tr className="border-b border-gray-100">
                                    <th className="px-4 py-3 w-20 rounded-tl-lg rounded-bl-lg">{t('id')}</th>
                                    <th className="px-4 py-3">{t('name')}</th>
                                    <th className="px-4 py-3 w-28 rounded-tr-lg rounded-br-lg">{t('options')}</th>
                                </tr>
                            </thead>
                            
                            <tbody>
                                {
                                    data && data.countries.data.map((country: any, index: number) => {
                                        return (
                                            <tr key={index} className="border-b border-stone-100 text-indigo-900/80">
                                                <td className="border-r border-stone-100 px-3 py-2 text-xs">{country.id}</td>
                                                <td className="px-3 py-2">
                                                    <h1 className="font-bold">{getByLocale(country.name)}</h1>
                                                </td>
                                                <td className="px-3 py-2">
                                                    <div className="flex">
                                                        <button className="border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white duration-300 w-8 h-8 mx-1 flex items-center justify-center rounded-full">
                                                            <IoPencilOutline size={18} />
                                                        </button>

                                                        <button
                                                            onClick={() => toggleDeleteModal(country.id)}
                                                            className="border border-red-500 text-red-500 hover:bg-red-500 hover:text-white duration-300 w-8 h-8 mx-1 flex items-center justify-center rounded-full"
                                                        >
                                                            <IoTrashOutline size={18} />
                                                        </button>
                                                    </div>
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
                data && data.countries.paginatorInfo.lastPage > 1 &&
                <ReactPaginate
                    previousClassName={'hidden'}
                    nextClassName={'hidden'}
                    breakLabel={'...'}
                    breakClassName={'bg-white rounded-lg border-gray-300 text-gray-500 hover:bg-gray-50 md:inline-flex relative items-center m-1 px-4 py-2 border text-sm'}
                    pageCount={data && data.countries.paginatorInfo.lastPage}
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

export default Countries