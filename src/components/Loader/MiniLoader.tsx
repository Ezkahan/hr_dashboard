import { useTranslation } from "react-i18next"
import { SyncLoader } from "react-spinners"

const MiniLoader: React.FC = () => {
    const { t } = useTranslation()

    return (
        <section className="text-indigo-600">
            <SyncLoader size={20} color="#4f46e5" />
            <h1 className="text-xl block font-montserrat-bold my-5"> {t('loading')}... </h1>
        </section>
    )
}

export default MiniLoader