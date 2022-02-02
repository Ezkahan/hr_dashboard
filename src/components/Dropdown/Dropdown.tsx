import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { IoCaretDownOutline } from "react-icons/io5";

interface IItem {
  id: number;
  name: string;
}

interface IDropdown {
  title: string;
  list: [object];
  searchable: boolean;
}

const itemVariant = {
  active: {
    y: "0",
    opacity: "100",
    transition: {
      type: "tween",
      staggerChildren: 0.33,
    },
  },
  inactive: {
    y: "-11%",
    opacity: "0",
    transition: {
      type: "tween",
      staggerChildren: 0.33,
    },
  },
};

const Dropdown: React.FC<IDropdown> = ({ title, list, searchable }) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [selected, setSelected] = useState<string[]>([]);

  useEffect(() => {
    console.log(typeof list);
  }, []);

  const isOpenToggle = () => {
    setIsOpen(!isOpen);
  };

  // const filteredList = list.filter((item) => {
  //   return Object.keys(item).some(() =>
  //     item.toLowerCase().includes(search.toLowerCase())
  //   );
  // });

  return (
    <nav className="bg-slate-50 rounded-lg  relative select-none cursor-pointer">
      <colgroup
        onClick={() => isOpenToggle()}
        className="flex flex-col px-3 py-2"
      >
        <small className="text-indigo-400 px-1">{title}</small>
        <IoCaretDownOutline
          className={`${
            isOpen ? "rotate-180" : "rotate-0"
          } duration-300 absolute top-6 right-2`}
          size={20}
        />

        <div>
          <p className="bg-slate-50 px-1 pt-1">Test</p>
        </div>
      </colgroup>

      <motion.ul
        variants={itemVariant}
        initial="inactive"
        animate={isOpen ? "active" : "inactive"}
        exit="active"
        className="w-full flex flex-col bg-white border absolute left-0 top-16 dropdown-height rounded-lg overflow-y-auto p-2"
      >
        {searchable && (
          <input
            type="text"
            placeholder={t("search")}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-slate-100 border-b border-slate-200 px-3 py-1.5 rounded-lg mb-2"
          />
        )}

        {/* {filteredList.map((item: any, key: number) => {
          return (
            <motion.li
              variants={itemVariant}
              key={key}
              className="border-b border-slate-100 text-slate-500 hover:bg-slate-100 hover:text-slate-800 duration-500 px-4 py-1.5 rounded-lg"
            >
              {item.name}
            </motion.li>
          );
        })} */}
      </motion.ul>
    </nav>
  );
};

export default Dropdown;

// example
{
  /* <Dropdown
    title={t("salary_currency")}
    list={["tmt", "usd", "eur"]}
    searchable={true}
/> */
}
