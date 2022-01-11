import { useTranslation } from "react-i18next"

const EmptyList: React.FC = () => {
    const {t} = useTranslation();

    return (
        <p className="border border-orange-100 bg-orange-50 text-orange-400 rounded-lg px-5 py-2">
            <h1> {t('empty_list')} </h1>
        </p>
    )
}

export default EmptyList