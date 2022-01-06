import { useTranslation } from "react-i18next"
import { BounceLoader } from "react-spinners"

const FullLoader: React.FC = () => {
    const { t } = useTranslation()

    return (
        <section className="fixed top-0 left-0 right-0 bottom-0 flex flex-col items-center justify-center bg-blue-900 text-white bg-opacity-50 backdrop-blur-md z-50">
            <BounceLoader size={128} color="white" />
            <h1 className="text-xl block font-montserrat-bold my-5"> {t('loading')}... </h1>
        </section>
    )
}

export default FullLoader