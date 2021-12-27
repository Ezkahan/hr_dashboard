import Header from "../../components/Header/Header"
import AppLayout from "../../layouts/AppLayout"

const Skills: React.FC = () => {
    return (
        <AppLayout>
            <section>
            <Header>
                <h1 className="text-lg font-bold">
                    Skills
                </h1>
            </Header>

            <main className="mt-5">
                Pages
            </main>
            </section>
        </AppLayout>
    )
}

export default Skills