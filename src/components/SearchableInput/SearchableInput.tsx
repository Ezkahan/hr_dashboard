import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { IoCaretDownOutline } from "react-icons/io5";

interface IDropdown {
  title: string;
  list: [object];
  refetch?: any;
}

interface IItem {
  id: number | null;
  name: string;
}

const itemVariant = {
  active: {
    y: "0",
    opacity: "100",
    transition: {
      type: "tween",
      staggerChildren: 0.07,
    },
  },
  inactive: {
    y: "10",
    opacity: "0",
    transition: {
      type: "tween",
      staggerChildren: 0.07,
    },
  },
};

const SearchableInput: React.FC<IDropdown | any> = ({
  title,
  list,
  refetch,
  state,
  setState,
  placeholder,
}) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selected, setSelected] = useState<IItem>({ id: null, name: "" });
  const [search, setSearch] = useState<string>("");

  const isOpenToggle = () => {
    setIsOpen(!isOpen);
  };

  const searchItem = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    refetch({ search: search });
  };

  const setItem = (item: IItem) => {
    setSelected(item);
    setSearch(item.name);
    setIsOpen(false);
    setState({ ...state, passport_issued_by_id: item.id });
  };

  return (
    <nav
      className={`bg-slate-50 rounded-lg  relative select-none cursor-pointer ${
        isOpen ? "" : "overflow-hidden"
      }`}
    >
      <colgroup onClick={() => isOpenToggle()} className="flex flex-col">
        <small className="text-indigo-400 px-3 pt-2">{title}</small>
        <IoCaretDownOutline
          className={`${
            isOpen ? "rotate-180" : "rotate-0"
          } duration-300 absolute top-6 right-2 text-indigo-400`}
          size={20}
        />

        <div>
          <input
            type="text"
            placeholder={placeholder ?? title}
            value={search}
            onChange={(e) => searchItem(e)}
            className={`bg-transparent ${
              placeholder && "placeholder:text-gray-900"
            } px-3 py-2 w-full z-50`}
          />
        </div>
      </colgroup>

      <motion.ul
        variants={itemVariant}
        initial="inactive"
        animate={isOpen ? "active" : "inactive"}
        exit="inactive"
        className="w-full flex flex-col bg-white border absolute left-0 top-20 dropdown-height rounded-lg overflow-y-auto p-2"
      >
        {list && Object.keys(list).length === 0 && (
          <p className="border-b border-yellow-100 text-yellow-500 hover:bg-yellow-100 hover:text-yellow-800 duration-500 px-4 py-1.5 rounded-lg">
            {t("empty_list")}
          </p>
        )}

        {list &&
          list.map((item: any, key: number) => {
            return (
              <motion.li
                variants={itemVariant}
                key={key}
                onClick={() => setItem(item)}
                className="border-b border-slate-100 text-slate-500 hover:bg-slate-100 hover:text-slate-800 duration-500 px-4 py-1.5 rounded-lg"
              >
                {item.name}
              </motion.li>
            );
          })}
      </motion.ul>
    </nav>
  );
};

export default SearchableInput;
