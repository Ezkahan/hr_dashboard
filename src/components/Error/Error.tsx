import { useTranslation } from "react-i18next"

const Error: React.FC<any> = (message: string) => {
    const { t } = useTranslation()

    return (
        <p className="text-red-500 p-2">
            {message}
        </p>
    )
}

export default Error