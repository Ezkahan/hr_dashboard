import { Routes, Route } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'

import Login from '../pages/Auth/Login'
import Companies from '../pages/Companies/Companies'
import CreateCompany from '../pages/Companies/CreateCompany'
import EditCompany from '../pages/Companies/EditCompany'
import Chat from '../pages/Dashboard/Chat'
import Dashboard from '../pages/Dashboard/Dashboard'
import Educations from '../pages/Educations/Educations'
import Employees from '../pages/Employees/Employees'
import Addresses from '../pages/Locations/Addresses'
import Areas from '../pages/Locations/Areas'
import Countries from '../pages/Locations/Countries'
import Locations from '../pages/Locations/Locations'
import Towns from '../pages/Locations/Towns'
import People from '../pages/People/People'
import Schools from '../pages/Schools/Schools'
import Settings from '../pages/Settings/Settings'
import Skills from '../pages/Skills/Skills'
import Vacancies from '../pages/Vacancies/Vacancies'

const WebRoutes = () => {
    return (
        <AnimatePresence exitBeforeEnter>
        <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/companies" element={<Companies />} />
            <Route path="/company/create" element={<CreateCompany />} />
            <Route path="/company/:id/edit" element={<EditCompany />} />
            <Route path="/vacancies" element={<Vacancies />} />
            <Route path="/people" element={<People />} />
            <Route path="/educations" element={<Educations />} />
            <Route path="/schools" element={<Schools />} />
            <Route path="/skills" element={<Skills />} />
            <Route path="/locations" element={<Locations />} />
            <Route path="/employees" element={<Employees />} />
            <Route path="/countries" element={<Countries />} />
            <Route path="/towns" element={<Towns />} />
            <Route path="/areas" element={<Areas />} />
            <Route path="/addresses" element={<Addresses />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/chats" element={<Chat />} />
        </Routes>
        </AnimatePresence>
    )
}

export default WebRoutes