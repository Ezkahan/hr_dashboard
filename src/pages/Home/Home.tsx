import Header from "../../components/Header/Header"
import AppLayout from "../../layouts/AppLayout"

const Home: React.FC = () => {
    return (
        <AppLayout>
            <section>
            <Header>
                <h1 className="text-lg font-bold">
                    Dashboard
                </h1>
            </Header>

            <main className="mt-5">
                Pages
            </main>
            </section>
        </AppLayout>
    )
}

export default Home