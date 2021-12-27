import IChildren from "../../common/interfaces/IChildren"

const MainContainer: React.FC<IChildren> = ({children}: IChildren) => {
    return (
        <section className="absolute top-0 left-0 xl:left-72 right-0 bottom-0 p-3 bg-slate-100 duration-500">
            {children}
        </section>
    )
}
export default MainContainer