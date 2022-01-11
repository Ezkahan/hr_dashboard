import { Navigate } from 'react-router-dom';
import IChildren from '../common/interfaces/IChildren'
import MainContainer from '../components/Main/MainContainer'
import Sidebar from '../components/Navigation/Sidebar'


const AppLayout = ({children}: IChildren) => {
    const token = localStorage.getItem('orlan_token');

    return (
        <>
        {token ? "" : <Navigate to="/login" />}
        <section className="font-montserrat-medium">
            <Sidebar />
            <MainContainer>
                { children }
            </MainContainer>
        </section>
        </>
    )
}
export default AppLayout