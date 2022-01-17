import { NavLink } from "react-router-dom"
import { IoAppsOutline, IoPersonOutline } from 'react-icons/io5'
import IChildren from "../../common/interfaces/IChildren"
import Locale from "../Locale/Locale"
import React, { SetStateAction } from "react"

interface IDrawMenu {
    menu?: boolean,
    setMenu?: React.Dispatch<SetStateAction<boolean>> | any
}

const Header: React.FC<IChildren & IDrawMenu> = ({children, menu, setMenu}: IChildren & IDrawMenu) => {

    return (
        <header className="flex justify-between items-center bg-white text-slate-700 px-5 py-2 fixed top-0 xl:left-72 left-0 right-0 z-40 shadow shadow-slate-200/80">
            <IoAppsOutline className="xl:opacity-0" onClick={() => setMenu(!menu)} size={24} />
            {children}
            <aside className="flex items-center">
                <NavLink to="/login" className="flex items-center justify-center w-10 h-10 rounded-full">
                    <IoPersonOutline size={24} />
                </NavLink>
                <Locale />
            </aside>
        </header>
    )
}

export default Header