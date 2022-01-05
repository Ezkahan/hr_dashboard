import IChildren from '../common/interfaces/IChildren'
import MainContainer from '../components/Main/MainContainer'
import Sidebar from '../components/Navigation/Sidebar'


const AppLayout = ({children}: IChildren) => {

    return (
        <section className="font-montserrat-medium">
            <Sidebar />
            <MainContainer>
                { children }
            </MainContainer>
        </section>
    )
}
export default AppLayout