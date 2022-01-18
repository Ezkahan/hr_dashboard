import { useQuery } from '@apollo/client'
import AppLayout from "../../layouts/AppLayout"
import { useTranslation } from "react-i18next"
import { useState } from 'react'
import ReactPaginate from 'react-paginate'
import MiniLoader from '../../components/Loader/MiniLoader'
import { NavLink } from 'react-router-dom'
import { GET_COMPANIES } from '../../graphql/queries/Company/getCompaniesQuery'
import { IoAddOutline, IoBusinessOutline, IoEyeOutline, IoPencilOutline, IoTrashOutline } from 'react-icons/io5'
import toast from 'react-hot-toast'
import Modal from '../../components/Modal/Modal'
import { ICompanyList } from '../../common/interfaces/Company/ICompanyList'
import DeleteCompany from './DeleteCompany'
import { IDeleteModal } from '../../common/interfaces/IDeleteModal'
import getByLocale from '../../common/helpers/getByLocale'

const Companies: React.FC = () => {
    const { t } = useTranslation()
    const [page, setPage] = useState(1)
    const [companyDelete, setCompanyDelete] = useState<IDeleteModal>({
        id: null,
        delete: false
    })

    const {loading, data} = useQuery(GET_COMPANIES, {
        variables: {page},
        onError: () => toast.error(t('error_not_loaded'), {duration: 2000})
    })

    const toggleDeleteModal = (id: number | null = null) => {
        setCompanyDelete({delete: !companyDelete.delete, id})
    }

    return (
        <AppLayout>
            <section className="xl:p-5 p-1">

            <Modal isOpen={companyDelete.delete} close={toggleDeleteModal}>
                <DeleteCompany id={companyDelete.id} close={toggleDeleteModal} />
            </Modal>

            <main className="bg-white xl:px-8 px-6 xl:py-6 py-4 mb-5 rounded-lg">
                <header className=" flex justify-between items-center mb-5">
                    <aside className="flex">
                        <IoBusinessOutline size={48} className="text-indigo-800 mr-3" />
                        <div className="flex flex-col">
                            <h1 className="text-xl font-montserrat-bold text-indigo-800">
                                {t('companies')}
                            </h1>
                            <small className="text-indigo-500">
                                {t('total')}: <strong>{data?.companies?.paginatorInfo?.total}</strong>
                            </small>
                        </div>
                    </aside>

                    <div className="ml-5">
                        <NavLink to="/company/create" className="flex items-center border border-indigo-500 hover:bg-indigo-600 text-indigo-600 hover:text-white duration-300 px-2 py-1.5 rounded-lg">
                            <IoAddOutline size={22} />
                            <p className="hidden xl:block">{t('add')}</p>
                        </NavLink>
                    </div>
                </header>

                {
                    loading && <MiniLoader />
                }

                {
                    data && data.companies.data &&

                    <section className="overflow-x-auto">
                        <table className="w-full table-fixed text-sm">
                            <thead className="bg-slate-100 text-left text-gray-800">
                                <tr>
                                    <th className="px-4 py-3 w-20 rounded-tl-lg rounded-bl-lg">{t('id')}</th>
                                    <th className="px-4 py-3 w-96">{t('name')}</th>
                                    <th className="px-4 py-3 w-96">{t('description')}</th>
                                    <th className="px-4 py-3 w-52">{t('phone')}</th>
                                    <th className="px-4 py-3 w-52">{t('email')}</th>
                                    <th className="px-4 py-3 rounded-tr-lg rounded-br-lg w-36">{t('options')}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    data.companies.data.map((company: ICompanyList, index: number) => {
                                        return (
                                            <tr key={index} className="border-b border-stone-100 text-indigo-900/80">
                                                <td className="border-r border-stone-100 px-4 py-3 text-xs">{company.id}</td>
                                                <td className="border-r border-stone-100 w-96 px-4 py-3">
                                                    <h1 className="font-bold">{getByLocale(company.name)}</h1>
                                                </td>
                                                <td className="border-r border-stone-100 px-4 py-3">
                                                    <p>{getByLocale(company.description)}</p>
                                                </td>

                                                <td className="border-r border-stone-100 px-4 py-3">
                                                    <p>{company.phone}</p>
                                                </td>

                                                <td className="px-4 py-3">
                                                    <p>{company.email}</p>
                                                </td>

                                                <td className="px-2 py-3">
                                                    <div className="flex">
                                                        <NavLink to={`/company/${company.id}`} className="border border-emerald-500 text-emerald-500 hover:bg-emerald-500 hover:text-white duration-300 w-8 h-8 mx-1 flex items-center justify-center rounded-full">
                                                            <IoEyeOutline size={18} />
                                                        </NavLink>

                                                        <NavLink to={`/company/${company.id}/edit`} className="border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white duration-300 w-8 h-8 mx-1 flex items-center justify-center rounded-full">
                                                            <IoPencilOutline size={18} />
                                                        </NavLink>

                                                        <button
                                                            onClick={() => toggleDeleteModal(company.id)}
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