import { Routes, Route } from 'react-router-dom'
import Login from '../pages/Auth/Login'
import Companies from '../pages/Companies/Companies'
import Chat from '../pages/Dashboard/Chat'
import Dashboard from '../pages/Dashboard/Dashboard'
import Educations from '../pages/Educations/Educations'
import Employees from '../pages/Employees/Employees'
import Locations from '../pages/Locations/Locations'
import People from '../pages/People/People'
import Schools from '../pages/Schools/Schools'
import Skills from '../pages/Skills/Skills'
import Vacancies from '../pages/Vacancies/Vacancies'

const WebRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/companies" element={<Companies />} />
            <Route path="/vacancies" element={<Vacancies />} />
            <Route path="/people" element={<People />} />
            <Route path="/educations" element={<Educations />} />
            <Route path="/schools" element={<Schools />} />
            <Route path="/skills" element={<Skills />} />
            <Route path="/locations" element={<Locations />} />
            <Route path="/employees" element={<Employees />} />
            <Route path="/chats" element={<Chat />} />
        </Routes>
    )
}

export default WebRoutes