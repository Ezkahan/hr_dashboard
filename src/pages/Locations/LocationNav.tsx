import { useQuery } from "@apollo/client"
import { useTranslation } from "react-i18next"
import { IoArrowForwardCircleOutline, IoLocationOutline } from "react-icons/io5"
import { NavLink } from "react-router-dom"
import { LOCATIONS_TOTAL } from "../../graphql/queries/Location/getLocationsTotal"

const LocationNav: React.FC = () => {
    const { t } = useTranslation()
    const {data} = useQuery(LOCATIONS_TOTAL)

    return (
        <section className="grid grid-cols-12 gap-5 mb-5">
                <NavLink to="/countries" className="col-span-6 xl:col-span-3 bg-white text-slate-700 flex items-center justify-between p-5 rounded-xl relative overflow-hidden group shadow-lg shadow-slate-200/50">
                    <aside className="flex items-center">
                        <IoLocationOutline className="text-slate-500 text-4xl group-hover:text-indigo-600 duration-300" />
                        <div className="flex flex-col ml-3">
                            <h1 className="text-lg font-montserrat-bold">
                                {t('countries')}
                            </h1>
                            <div className="flex">
                                <small className="text-slate-500 text-xs mr-1"> {t('total')}: </small>
                                <small className="text-slate-500 text-xs"> { data && data.countries.paginatorInfo.total } </small>
                            </div>
                        </div>
                    </aside>
                    <IoArrowForwardCircleOutline size={34} className="text-indigo-600 absolute top-7 -right-10 group-hover:right-5 duration-300" />
                </NavLink>

                <NavLink to="/towns" className="col-span-6 xl:col-span-3 bg-white text-slate-700 flex items-center justify-between p-5 rounded-xl relative overflow-hidden group shadow-lg shadow-slate-200/50">
                    <aside className="flex items-center">
                        <IoLocationOutline className="text-slate-500 text-4xl group-hover:text-indigo-600 duration-300" />
                        <div className="flex flex-col ml-3">
                            <h1 className="text-lg font-montserrat-bold">
                                {t('towns')}
                            </h1>
                            <div className="flex">
                                <small className="text-slate-500 text-xs mr-1"> {t('total')}: </small>
                                <small className="text-slate-500 text-xs"> { data && data.towns.paginatorInfo.total } </small>
                            </div>
                        </div>
                    </aside>
                    <IoArrowForwardCircleOutline size={34} className="text-indigo-600 absolute top-7 -right-10 group-hover:right-5 duration-300" />
                </NavLink>

                <NavLink to="/areas" className="col-span-6 xl:col-span-3 bg-white text-slate-700 flex items-center justify-between p-5 rounded-xl relative overflow-hidden group shadow-lg shadow-slate-200/50">
                    <aside className="flex items-center">
                        <IoLocationOutline className="text-slate-500 text-4xl group-hover:text-indigo-600 duration-300" />
                        <div className="flex flex-col ml-3">
                            <h1 className="text-lg font-montserrat-bold">
                                {t('areas')}
                            </h1>
                            <div className="flex">
                                <small className="text-slate-500 text-xs mr-1"> {t('total')}: </small>
                                <small className="text-slate-500 text-xs"> { data && data.areas.paginatorInfo.total } </small>
                            </div>
                        </div>
                    </aside>
                    <IoArrowForwardCircleOutline size={34} className="text-indigo-600 absolute top-7 -right-10 group-hover:right-5 duration-300" />
                </NavLink>

                <NavLink to="/addresses" className="col-span-6 xl:col-span-3 bg-white text-slate-700 flex items-center justify-between p-5 rounded-xl relative overflow-hidden group shadow-lg shadow-slate-200/50">
                    <aside className="flex items-center">
                        <IoLocationOutline className="text-slate-500 text-4xl group-hover:text-indigo-600 duration-300" />
                        <div className="flex flex-col ml-3">
                            <h1 className="text-lg font-montserrat-bold">
                                {t('addresses')}
                            </h1>
                            <div className="flex">
                                <small className="text-slate-500 text-xs mr-1"> {t('total')}: </small>
                                <small className="text-slate-500 text-xs"> { data && data.addresses.paginatorInfo.total } </small>
                            </div>
                        </div>
                    </aside>
                    <IoArrowForwardCircleOutline size={34} className="text-indigo-600 absolute top-7 -right-10 group-hover:right-5 duration-300" />
                </NavLink>
            </section>
    )
}

export default LocationNav