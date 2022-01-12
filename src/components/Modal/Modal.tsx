import { AnimatePresence, motion } from "framer-motion";
import ReactTooltip from "react-tooltip";
import { IModal } from "../../common/interfaces/IModal";

const Modal: React.FC<IModal> = ({isOpen, children, close}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div
          onClick={() => close()}
          className="bg-gray-700 backdrop-filter backdrop-blur bg-opacity-60 z-50 fixed w-screen h-screen top-0 left-0"
        >
          <ReactTooltip className="font-montserrat-bold" />
          <section className="flex items-center justify-center fixed w-screen h-screen top-0 left-0 z-50 font-montserrat-medium">
            <motion.main
              initial={{ translateY: '-100%', opacity: 0 }}
              animate={{ translateY: 0, opacity: 1 }}
              exit={{ translateY: '-100%', opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white w-96 lg:w-4/12 z-50 rounded-lg overflow-x-hidden"
            >
              <div className="bg-white p-5">
                {children}
              </div>
            </motion.main>
          </section>
        </div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
