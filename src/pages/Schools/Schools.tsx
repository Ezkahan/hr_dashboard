import { useTranslation } from "react-i18next"
import AppLayout from "../../layouts/AppLayout"
import { useQuery } from '@apollo/client'
import { useState } from "react"
import ReactPaginate from 'react-paginate'
import MiniLoader from "../../components/Loader/MiniLoader"
import { GET_SCHOOLS } from "../../graphql/queries/School/getSchoolsQuery"
import { IoAddOutline, IoBookOutline, IoPencilOutline, IoTrashOutline } from "react-icons/io5"
import getByLocale from "../../common/helpers/getByLocale"
import { IDeleteModal } from "../../common/interfaces/IDeleteModal"
import { ITranslatable } from "../../common/interfaces/ITranslatable"
import { IEditSchool } from "../../common/interfaces/School/IEditSchool"
import Modal from "../../components/Modal/Modal"
import EditSchool from "./EditSchool"
import DeleteSchool from "./DeleteSchool"
import AddSchool from "./AddSchool"

const Schools: React.FC = () => {
    const {t} = useTranslation()
    const [page, setPage] = useState(1)

    const {loading, data} = useQuery(GET_SCHOOLS, {
        variables: {page},
        onCompleted: () => {},
    })

    const [addModal, setAddModal] = useState<boolean>(false)
    const [editModal, setEditModal] = useState<IEditSchool>({
        id: null,
        name: {
            ru: "",
            en: "",
        },
        school_type_id: null,
        edit: false,
    })
    const [deleteModal, setDeleteModal] = useState<IDeleteModal>({
        id: null,
        delete: false
    })

    const toggleAddModal = () => {
        setAddModal(!addModal)
    }

    const toggleDeleteModal = (id: number | null = null): void => {
        setDeleteModal({delete: !deleteModal.delete, id})
    }

    const toggleEditModal = (id: number | null = null, school_type_id: number | null = null, name: ITranslatable): void => {
        setEditModal({edit: !editModal.edit, id, name, school_type_id})
    }

    return (
        <AppLayout>
            <section className="xl:p-5 p-1">

            <Modal isOpen={addModal} close={toggleAddModal}>
                <AddSchool close={toggleAddModal} />
            </Modal>

            <Modal isOpen={editModal.edit} close={toggleEditModal}>
                <EditSchool id={editModal.id} name={editModal.name} school_type_id={editModal.school_type_id} close={toggleEditModal} />
            </Modal>

            <Modal isOpen={deleteModal.delete} close={toggleDeleteModal}>
                <DeleteSchool id={deleteModal.id} close={toggleDeleteModal} />
            </Modal>

            <main className="bg-white xl:px-8 px-6 xl:py-6 py-4 mb-5 rounded-lg">
                <header className=" flex justify-between items-center mb-5">
                    <aside className="flex">
                        <IoBookOutline size={48} className="text-indigo-800 mr-3" />
                        <div className="flex flex-col">
                            <h1 className="text-xl font-montserrat-bold text-indigo-800">
                                {t('schools')}
                            </h1>
                            <small className="text-indigo-500">
                                {t('total')}: <strong>{data?.schools?.paginatorInfo?.total}</strong>
                            </small>
                        </div>
                    </aside>

                    <div className="ml-5">
                        <button onClick={() => toggleAddModal()} className="flex items-center border border-indigo-500 hover:bg-indigo-600 text-indigo-600 hover:text-white duration-300 px-2 py-1.5 rounded-lg">
                            <IoAddOutline size={22} />
                            <p className="hidden xl:block">{t('add')}</p>
                        </button>
                    </div>
                </header>

                {
                    loading && <MiniLoader />
                }

                {
                    data && data.schools.data &&

                    <section className="overflow-x-auto">
                        <table className="w-full table-fixed text-sm">
                            <thead className="bg-slate-100 text-left text-gray-800">
                                <tr className="border-b border-gray-100">
                                    <th className="px-4 py-3 w-20 xl:w-10 rounded-tl-lg rounded-bl-lg">{t('id')}</th>
                                    <th className="px-4 py-3 w-96">{t('name')}</th>
                                    <th className="px-4 py-3 w-80">{t('education_type')}</th>
                                    <th className="px-4 py-3 w-28 xl:w-24 rounded-tr-lg rounded-br-lg">{t('options')}</th>
                                </tr>
                            </thead>
                            
                            <tbody>
                                {
                                    data && data.schools.data.map((school: any, index: number) => {
                                        return (
                                            <tr key={index} className="border-b border-stone-100 text-indigo-900/80">
                                                <td className="border-r border-stone-100 px-3 py-2 text-xs">{school.id}</td>
                                                <td className="border-r border-stone-100 w-96 px-3 py-2">
                                                    <h1 className="font-bold">{getByLocale(school.name)}</h1>
                                                </td>
                                                <td className="border-stone-100 px-3 py-2">
                                                    <p>{school.schoolType && school.schoolType.name ? getByLocale(school.schoolType.name) : t('unknown')}</p>
                                                </td>
                                                <td className="px-3 py-2">
                                                    <div className="flex">
                                                        <button
                                                            onClick={() => toggleEditModal(school.id, school.schoolType.id, school.name)}
                                                            className="border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white duration-300 w-8 h-8 mx-1 flex items-center justify-center rounded-full"
                                                        >
                                                            <IoPencilOutline size={18} />
                                                        </button>

                                                        <button
                                                            onClick={() => toggleDeleteModal(school.id)}
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
                pageCount={data && data.schools.paginatorInfo.lastPage}
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

export default Schools