import IChildren from "../../common/interfaces/IChildren"

const MainContainer: React.FC<IChildren> = ({children}: IChildren) => {
    return (
        <section className="absolute top-14 left-0 xl:left-72 right-0 bottom-0 duration-500 p-3">
            {children}
        </section>
    )
}
export default MainContainer