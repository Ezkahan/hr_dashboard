import Logo from "../Header/Logo"
import Navbar from "./Navbar"

const Sidebar: React.FC = () => {
    return (
        <section className="fixed top-0 xl:left-0 -left-72 bottom-0 bg-dark-purple text-white w-72 duration-500">
            <Logo />
            <Navbar />
        </section>
    )
}

export default Sidebar