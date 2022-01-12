import { motion } from 'framer-motion'
import IChildren from "../../common/interfaces/IChildren"

const MainContainer: React.FC<IChildren> = ({children}: IChildren) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ type: "tween", duration: 0.9 }}
        >
            <section className="absolute top-14 left-0 xl:left-72 right-0 bottom-0 duration-500 p-3">
                {children}
            </section>
        </motion.div>
    )
}
export default MainContainer