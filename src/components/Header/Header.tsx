import { NavLink } from "react-router-dom"
import { IoPersonOutline } from 'react-icons/io5'
import IChildren from "../../common/interfaces/IChildren"
import Locale from "../Locale/Locale"

const Header: React.FC<IChildren> = ({children}: IChildren) => {
    return (
        <header className="flex justify-between items-center bg-slate-100 px-5 py-2">
            {children}
            <aside className="flex">
                <NavLink to="/login" className="flex items-center justify-center w-10 h-10 rounded-full">
                    <IoPersonOutline size={24} />
                </NavLink>
                <Locale />
            </aside>
        </header>
    )
}

export default Header