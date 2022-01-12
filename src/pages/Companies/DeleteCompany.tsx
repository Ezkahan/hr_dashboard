import { useMutation } from "@apollo/client";
import { useTranslation } from "react-i18next";
import { IoTrashOutline } from "react-icons/io5";
import { IDeleteCompany } from "../../common/interfaces/Company/IDeleteCompany";
import { DELETE_COMPANY } from "../../graphql/mutations/Company/deleteCompanyMutation";
import toast from 'react-hot-toast'
import { _GET_COMPANIES } from "../../graphql/queries/Company/getCompaniesQuery";

const DeleteCompany: React.FC<IDeleteCompany> = ({id}) => {
    const { t } = useTranslation()

    const [deleteCompany] = useMutation(DELETE_COMPANY, {
        onCompleted: () => toast.success(t('success_deleted'), {duration: 2000}),
        onError: () => toast.error(t('error_not_deleted'), {duration: 2000}),
        refetchQueries: [
            {
                query: _GET_COMPANIES,
                variables: {page: 1}
            }
        ]
    })

    return (
        <main>
          <header className="text-center p-2 mb-4">
              <h1 className="text-xl font-montserrat-bold"> {t('confirm_delete')} </h1>

              <small> ID: {id} </small>
          </header>
          <footer className="flex items-center justify-center p-2">
            <button
                onClick={() => deleteCompany({variables: {id: id}})}
                className="bg-red-400 hover:bg-red-600 duration-300 text-white px-5 py-2.5 flex items-center rounded-lg mx-3"
            >
                <IoTrashOutline size={20} />
                <p className="mx-2"> {t('yes_delete')} </p>
            </button>

            <button className="bg-slate-100 text-gray-600 hover:bg-slate-200 hover:text-gray-800 duration-300 px-5 py-2.5 flex items-center rounded-lg mx-3">
                <p className="mx-2"> {t('no_cancel')} </p>
            </button>
          </footer>
        </main>
    );
}

export default DeleteCompany