import { Routes, Route } from 'react-router-dom'
import Login from '../pages/Auth/Login'
import Home from '../pages/Home/Home'

const WebRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
        </Routes>
    )
}

export default WebRoutes