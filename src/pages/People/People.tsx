import { useTranslation } from "react-i18next"
import AppLayout from "../../layouts/AppLayout"
import { useQuery } from '@apollo/client'
import { useState } from "react"
import ReactPaginate from 'react-paginate'
import { NavLink } from "react-router-dom"
import MiniLoader from "../../components/Loader/MiniLoader"
import { GET_PEOPLE } from "../../graphql/queries/People/getPeopleQuery"
import { IoAddOutline, IoPencilOutline, IoPeopleOutline, IoTrashOutline } from "react-icons/io5"
import { IDeleteModal } from "../../common/interfaces/IDeleteModal"
import DeletePerson from "./DeletePerson"
import Modal from "../../components/Modal/Modal"

const People: React.FC = () => {
    const {t} = useTranslation()
    const [page, setPage] = useState(1)

    const {loading, data} = useQuery(GET_PEOPLE, {
        variables: {page}
    })

    const [deleteModal, setDeleteModal] = useState<IDeleteModal>({
        id: null,
        delete: false
    })

    const toggleDeleteModal = (id: number | null = null): void => {
        setDeleteModal({delete: !deleteModal.delete, id})
    }

    return (
        <AppLayout>
            <section className="xl:p-5 p-1">

            <Modal isOpen={deleteModal.delete} close={toggleDeleteModal}>
                <DeletePerson id={deleteModal.id} close={toggleDeleteModal} />
            </Modal>

            <main className="bg-white xl:px-8 px-6 xl:py-6 py-4 mb-5 rounded-lg">
                <header className=" flex justify-between items-center mb-5">
                    <aside className="flex">
                        <IoPeopleOutline size={48} className="text-indigo-800 mr-3" />
                        <div className="flex flex-col">
                            <h1 className="text-xl font-montserrat-bold text-indigo-800">
                                {t('people')}
                            </h1>
                            <small className="text-indigo-500">
                                {t('total')}: <strong>{data?.people?.paginatorInfo?.total}</strong>
                            </small>
                        </div>
                    </aside>

                    <div className="ml-5">
                        <NavLink to="/person/add" className="flex items-center border border-indigo-500 hover:bg-indigo-600 text-indigo-600 hover:text-white duration-300 px-2 py-1.5 rounded-lg">
                            <IoAddOutline size={22} />
                            <p className="hidden xl:block">{t('add')}</p>
                        </NavLink>
                    </div>
                </header>

                {
                    loading && <MiniLoader />
                }

                {
                    data && data.people.data &&

                    <section className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead className="bg-slate-100 text-left text-gray-800">
                                <tr className="border-b border-gray-100">
                                    <th className="px-4 py-3 w-20 rounded-tl-lg rounded-bl-lg">{t('id')}</th>
                                    <th className="px-4 py-3 w-48">{t('firstname')}</th>
                                    <th className="px-4 py-3 w-48">{t('lastname')}</th>
                                    <th className="px-4 py-3 w-48">{t('patronymic')}</th>
                                    <th className="px-4 py-3 w-20">{t('gender')}</th>
                                    <th className="px-4 py-3 w-20">{t('min_salary')}</th>
                                    <th className="px-4 py-3 w-20 xl:w-16 rounded-tr-lg rounded-br-lg">{t('options')}</th>
                                </tr>
                            </thead>
                            
                            <tbody>
                                {
                                    data && data.people.data.map((person: any, index: number) => {
                                        return (
                                            <tr key={index} className="border-b border-stone-100 text-indigo-900/80">
                                                <td className="border-r border-stone-100 px-3 py-2 text-xs">{person.id}</td>
                                                <td className="border-r border-stone-100 w-48 px-3 py-2">
                                                    <p>{person.firstname}</p>
                                                </td>
                                                <td className="border-r border-stone-100 w-48 px-3 py-2">
                                                    <p>{person.lastname}</p>
                                                </td>
                                                <td className="border-r border-stone-100 w-48 px-3 py-2">
                                                    <p>{person.patronymic}</p>
                                                </td>
                                                <td className="border-r border-stone-100 w-20 px-3 py-2">
                                                    <p>{person.gender}</p>
                                                </td>
                                                <td className="border-r border-stone-100 w-20 px-3 py-2">
                                                    <p>{person.min_salary}</p>
                                                </td>
                                                <td className="px-3 py-2 w-20 xl:w-16">
                                                        <div className="flex">
                                                            <button
                                                                disabled
                                                                // onClick={() => toggleEditModal(skill.id, skill.skillType ? skill.skillType.id : 1, skill.name)}
                                                                className="opacity-20 border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white duration-300 w-8 h-8 mx-1 flex items-center justify-center rounded-full"
                                                            >
                                                                <IoPencilOutline size={18} />
                                                            </button>

                                                            <button
                                                                onClick={() => toggleDeleteModal(person.id)}
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
                breakClassName={'bg-white rounded-lg border-gray-300 text-gray-500 hover:bg-gray-50 md:inline-flex relative items-center m-1 px-4 py-2 border text-sm'}
                pageCount={data && data.people.paginatorInfo.lastPage}
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

export default People