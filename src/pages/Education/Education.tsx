import { useTranslation } from "react-i18next"
import AppLayout from "../../layouts/AppLayout"
import { useQuery } from '@apollo/client'
import { useState } from "react"
import ReactPaginate from 'react-paginate'
import MiniLoader from "../../components/Loader/MiniLoader"
import { IoAddOutline, IoBookOutline, IoPencilOutline, IoTrashOutline } from "react-icons/io5"
import getByLocale from "../../common/helpers/getByLocale"
import { IDeleteModal } from "../../common/interfaces/IDeleteModal"
import { ITranslatable } from "../../common/interfaces/ITranslatable"
import Modal from "../../components/Modal/Modal"
import { GET_EDUCATION } from "../../graphql/queries/Education/getEducationQuery"
import { IEditEducation } from "../../common/interfaces/Education/IEditEducation"
import DeleteEducation from "./DeleteEducation"
import EditEducation from "./EditEducation"
import AddEducation from "./AddEducation"

const Education: React.FC = () => {
    const {t} = useTranslation()
    const [page, setPage] = useState(1)

    const {loading, data} = useQuery(GET_EDUCATION, {
        variables: {page},
        onCompleted: () => {},
    })

    const [addModal, setAddModal] = useState<boolean>(false)
    const [editModal, setEditModal] = useState<IEditEducation>({
        id: null,
        name: {
            ru: "",
            en: "",
        },
        description: {
            ru: "",
            en: "",
        },
        begin: "",
        end: "",
        country_id: null,
        education_type_id: null,
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

    const toggleEditModal = (
        id: number | null = null,
        name: ITranslatable,
        description: ITranslatable,
        begin: string,
        end: string,
        country_id: number | null = null,
        education_type_id: number | null = null
    ): void => {
        setEditModal({
            edit: !editModal.edit,
            id,
            name,
            description,
            begin,
            end,
            country_id,
            education_type_id
        })
    }

    return (
        <AppLayout>
            <section className="xl:p-5 p-1">

            <Modal isOpen={addModal} close={toggleAddModal}>
                <AddEducation close={toggleAddModal} />
            </Modal>

            <Modal isOpen={editModal.edit} close={toggleEditModal}>
                <EditEducation
                    id={editModal.id}
                    name={editModal.name}
                    description={editModal.description}
                    begin={editModal.begin}
                    end={editModal.end}
                    country_id={editModal.country_id}
                    education_type_id={editModal.education_type_id}
                    close={toggleEditModal}
                />
            </Modal>

            <Modal isOpen={deleteModal.delete} close={toggleDeleteModal}>
                <DeleteEducation
                    id={deleteModal.id}
                    close={toggleDeleteModal}
                />
            </Modal>

            <main className="bg-white xl:px-8 px-6 xl:py-6 py-4 mb-5 rounded-lg">
                <header className=" flex justify-between items-center mb-5">
                    <aside className="flex">
                        <IoBookOutline size={48} className="text-indigo-800 mr-3" />
                        <div className="flex flex-col">
                            <h1 className="text-xl font-montserrat-bold text-indigo-800">
                                {t('education')}
                            </h1>
                            <small className="text-indigo-500">
                                {t('total')}: <strong>{data?.education?.paginatorInfo?.total}</strong>
                            </small>
                        </div>
                    </aside>

                    <div className="ml-5">
                        <button disabled onClick={() => toggleAddModal()} className="opacity-20 flex items-center border border-indigo-500 hover:bg-indigo-600 text-indigo-600 hover:text-white duration-300 px-2 py-1.5 rounded-lg">
                            <IoAddOutline size={22} />
                            <p className="hidden xl:block">{t('add')}</p>
                        </button>
                    </div>
                </header>

                {
                    loading && <MiniLoader />
                }

                {
                    data && data.education.data &&

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
                                    data && data.education.data.map((education: any, index: number) => {
                                        return (
                                            <tr key={index} className="border-b border-stone-100 text-indigo-900/80">
                                                <td className="border-r border-stone-100 px-3 py-2 text-xs">{education.id}</td>
                                                <td className="border-r border-stone-100 w-96 px-3 py-2">
                                                    <h1 className="font-bold">{getByLocale(education.name)}</h1>
                                                </td>
                                                <td className="border-stone-100 px-3 py-2">
                                                    <p>{education.educationType && education.educationType.name ? getByLocale(education.educationType.name) : t('unknown')}</p>
                                                </td>
                                                <td className="px-3 py-2">
                                                    <div className="flex">
                                                        <button
                                                            disabled
                                                            onClick={() => toggleEditModal(
                                                                education.id,
                                                                education.name,
                                                                education.description,
                                                                education.begin,
                                                                education.end,
                                                                education.country.id,
                                                                education.educationType.id,
                                                            )}
                                                            className="opacity-20 border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white duration-300 w-8 h-8 mx-1 flex items-center justify-center rounded-full"
                                                        >
                                                            <IoPencilOutline size={18} />
                                                        </button>

                                                        <button
                                                            onClick={() => toggleDeleteModal(education.id)}
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
                pageCount={data && data.education.paginatorInfo.lastPage}
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

export default Education