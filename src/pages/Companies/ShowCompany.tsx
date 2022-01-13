import Header from "../../components/Header/Header"
import AppLayout from "../../layouts/AppLayout"

const ShowCompany: React.FC = () => {
    return (
        <AppLayout>
            <section className="xl:p-5 p-1">
                <Header>
                    <h1> Show company header </h1>
                </Header>

                <main className="bg-white p-5 rounded-lg">
                    <h1> Show company body </h1>
                </main>
            </section>
        </AppLayout>
    )
}

export default ShowCompany