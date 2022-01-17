import { useState } from "react"
import Header from "../Header/Header"
import Logo from "../Header/Logo"
import Navbar from "./Navbar"

const Sidebar: React.FC = () => {
    const [menu, setMenu] = useState<boolean>(false)

    return (
        <section className={`fixed top-14 xl:top-0 xl:left-0 ${menu ? 'left-0' : '-left-72'} z-50 bottom-0 bg-dark-purple text-white w-72 duration-500 overflow-y-auto`}>
            <Logo />
            <Navbar />
            <Header menu={menu} setMenu={setMenu} />
        </section>
    )
}

export default Sidebar