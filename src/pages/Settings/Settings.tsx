import { useTranslation } from "react-i18next"
import AppLayout from "../../layouts/AppLayout"
import EmptyList from "../../components/Message/EmptyList"

const Settings: React.FC = () => {
    const {t} = useTranslation()

    return (
        <AppLayout>
            <section className="xl:p-5 p-1">
                <main className="bg-white xl:px-8 px-6 xl:py-6 py-4 mb-5 rounded-lg">
                    <EmptyList />                    
                </main>
            </section>
        </AppLayout>
    )
}

export default Settings