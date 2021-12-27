import { useTranslation } from "react-i18next"
import {
    IoBookOutline,
    IoBusinessOutline,
    IoExtensionPuzzleOutline,
    IoGridOutline,
    IoLocationOutline,
    IoNewspaperOutline,
    IoPeopleOutline,
    IoSchoolOutline
} from "react-icons/io5"

import { NavLink } from "react-router-dom"

const Navbar: React.FC = () => {
    const { t } = useTranslation()

    return (
        <nav className="text-sm font-bold mt-6">
            <NavLink to="/" className="flex items-center px-6 py-3.5 text-slate-300 hover:bg-gradient-to-r hover:from-blue-800/50 hover:to-pink-500/5 hover:text-white duration-500">
                <IoGridOutline size={24}/>
                <p className="px-3">{ t('dashboard') }</p>
            </NavLink>
            
            <NavLink to="/companies" className="flex items-center px-6 py-3.5 text-slate-300 hover:bg-gradient-to-r hover:from-blue-800/50 hover:to-pink-500/5 hover:text-white duration-500">
                <IoBusinessOutline size={24}/>
                <p className="px-3">{ t('companies') }</p>
            </NavLink>
            
            <NavLink to="/vacancies" className="flex items-center px-6 py-3.5 text-slate-300 hover:bg-gradient-to-r hover:from-blue-800/50 hover:to-pink-500/5 hover:text-white duration-500">
                <IoNewspaperOutline size={24}/>
                <p className="px-3">{ t('vacancies') }</p>
            </NavLink>

            <NavLink to="/people" className="flex items-center px-6 py-3.5 text-slate-300 hover:bg-gradient-to-r hover:from-blue-800/50 hover:to-pink-500/5 hover:text-white duration-500">
                <IoPeopleOutline size={24}/>
                <p className="px-3">{ t('people') }</p>
            </NavLink>

            <NavLink to="/educations" className="flex items-center px-6 py-3.5 text-slate-300 hover:bg-gradient-to-r hover:from-blue-800/50 hover:to-pink-500/5 hover:text-white duration-500">
                <IoSchoolOutline size={24}/>
                <p className="px-3">{ t('educations') }</p>
            </NavLink>

            <NavLink to="/schools" className="flex items-center px-6 py-3.5 text-slate-300 hover:bg-gradient-to-r hover:from-blue-800/50 hover:to-pink-500/5 hover:text-white duration-500">
                <IoBookOutline size={24}/>
                <p className="px-3">{ t('schools') }</p>
            </NavLink>
            
            <NavLink to="/skills" className="flex items-center px-6 py-3.5 text-slate-300 hover:bg-gradient-to-r hover:from-blue-800/50 hover:to-pink-500/5 hover:text-white duration-500">
                <IoExtensionPuzzleOutline size={24}/>
                <p className="px-3">{ t('skills') }</p>
            </NavLink>

            <NavLink to="/locations" className="flex items-center px-6 py-3.5 text-slate-300 hover:bg-gradient-to-r hover:from-blue-800/50 hover:to-pink-500/5 hover:text-white duration-500">
                <IoLocationOutline size={24}/>
                <p className="px-3">{ t('locations') }</p>
            </NavLink>

            <NavLink to="/admins" className="flex items-center px-6 py-3.5 text-slate-300 hover:bg-gradient-to-r hover:from-blue-800/50 hover:to-pink-500/5 hover:text-white duration-500">
                <IoPeopleOutline size={24}/>
                <p className="px-3">{ t('admins') }</p>
            </NavLink>
        </nav>
    )
}

export default Navbar