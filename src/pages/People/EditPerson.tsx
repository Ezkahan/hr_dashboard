import AppLayout from "../../layouts/AppLayout";
import { useTranslation } from "react-i18next";
import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { Tabs, Tab, TabPanel, TabList } from "react-tabs";
import { IAddPerson } from "../../common/interfaces/People/IAddPerson";
import { GET_PEOPLE } from "../../graphql/queries/People/getPeopleQuery";
import { GET_PERSON } from "../../graphql/queries/People/getPersonQuery";
import { Checkbox } from "pretty-checkbox-react";
import "@djthoms/pretty-checkbox";

import RU_FLAG from "../../assets/icons/locales/ru.jpg";
import EN_FLAG from "../../assets/icons/locales/en.jpg";
import PERSON_PHOTO from "../../assets/icons/user.png";
import getByLocale from "../../common/helpers/getByLocale";
import {
  IoBriefcaseOutline,
  IoExtensionPuzzleOutline,
  IoLocationOutline,
  IoPersonCircleOutline,
  IoSchoolOutline,
  IoCallOutline,
  IoCarSportOutline,
} from "react-icons/io5";
import { UPDATE_PERSON } from "../../graphql/mutations/People/updatePersonMutation";
import PassportIssuedBy from "./Edit/PassportIssuedBy";
import PersonSkills from "./Edit/PersonSkills";

const EditPerson: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams();
  const [tabIndex, setTabIndex] = useState(0);
  const [person, setPerson] = useState<IAddPerson>({
    firstname: "",
    lastname: "",
    patronymic: "",
    born_date: "",
    gender: "",
  });

  const changeHandler = (e: React.ChangeEvent<any>) => {
    setPerson({
      ...person,
      [e.target.name]:
        e.target.type === "checkbox"
          ? e.target.checked
            ? 1
            : 0
          : e.target.value,
    });
  };

  const setPersonData = (data: any) => {
    setPerson({
      ...person,
      id: data.person.id,
      firstname: data.person.firstname,
      lastname: data.person.lastname,
      patronymic: data.person.patronymic,
      registered_at: data.person.registered_at,
      passport_series_id: data.person.passportSeries?.id ?? 1,
      passport_no: data.person.passport_no,
      passport_issue_date: data.person.passport_issue_date,
      passport_issued_by: data.person.passportIssuedBy,
      passport_issued_by_id: data.person.passportIssuedBy?.id,
      passport_comment: data.person.passport_comment,
      born_date: data.person.born_date,
      educationType: data.person.educationType,
      marital: data.person.marital,
      children: data.person.children,
      driver_classes: data.person.driver_classes,
      military: data.person.military,
      sentence: data.person.sentence,
      dead: data.person.dead,
      gender: data.person.gender,
      relocation: data.person.relocation,
      shift: data.person.shift,
      dontdisturb: data.person.dontdisturb,
      dontdisturb_notes: data.person.dontdisturb_notes,
      vip: data.person.vip,
      vip_notes: data.person.vip_notes,
      blacklist: data.person.blacklist,
      blacklist_notes: data.person.blacklist_notes,
      status_comment: data.person.status_comment,
      hascar: data.person.hascar,
      nationality: data.person.nationality,
      nationality_id: data.person.nationality?.id ?? 1,
      min_salary: data.person.min_salary,
      salary_currency: data.person.salary_currency,
      description_ru: data.person.description?.ru,
      description_en: data.person.description?.en,
      email: data.person.email,
      phone: data.person.phone,
      status: data.person.status,
      created_at: data.person.created_at,
      updated_at: data.person.updated_at,
      skills: data.person.skills,
    });
  };

  const { data } = useQuery(GET_PERSON, {
    variables: { id: id },
    onCompleted: (data) => setPersonData(data),
  });

  const onCompleted = () => {
    toast.success(t("success_saved"), { duration: 1500 }) &&
      setTimeout(() => navigate("/people"), 2000);
  };

  const [updatePerson] = useMutation(UPDATE_PERSON, {
    onCompleted,
    onError: () => toast.error(t("error_not_saved"), { duration: 2000 }),
    refetchQueries: [
      {
        query: GET_PEOPLE,
        variables: { page: 1 },
      },
      {
        query: GET_PERSON,
        variables: { id: id },
      },
    ],
  });

  const onSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    updatePerson({
      variables: {
        id: id,
        firstname: person.firstname,
        lastname: person.lastname,
        patronymic: person.patronymic,
        born_date: person.born_date,
        nationality_id: person.nationality_id,
        passport_series_id: person.passport_series_id ?? 1,
        passport_no: person.passport_no,
        passport_issue_date: person.passport_issue_date,
        passport_issued_by_id: person.passport_issued_by_id,
        passport_comment: person.passport_comment,
        gender: person.gender,
        marital: person.marital,
        children: person.children,
        military: person.military,
        sentence: person.sentence,
        dead: person.dead,
        relocation: person.relocation,
        shift: person.shift,
        dontdisturb: person.dontdisturb,
        dontdisturb_notes: person.dontdisturb_notes,
        vip: person.vip,
        vip_notes: person.vip_notes,
        blacklist: person.blacklist,
        blacklist_notes: person.blacklist_notes,
        min_salary: person.min_salary,
        salary_currency: person.salary_currency,
        description_ru: person.description_ru,
        description_en: person.description_en,
      },
    });
  };

  return (
    <AppLayout>
      <Tabs
        selectedIndex={tabIndex}
        onSelect={(index) => setTabIndex(index)}
        onChange={(tabId: any) => {}}
        selectedTabClassName="bg-slate-100 text-indigo-700 pl-7"
      >
        <section className="grid grid-cols-12 gap-5">
          <nav className="col-span-12 xl:col-span-3 bg-white shadow-2xl shadow-slate-200 px-4 xl:py-6 py-2 xl:my-5 my-3 rounded-lg sticky top-20 xl:h-115">
            <TabList className="flex xl:block hover:cursor-pointer">
              <Tab className="flex items-center justify-center xl:justify-start hover:bg-slate-100 text-indigo-500 font-montserrat-bold text-sm rounded-lg px-4 py-2 mb-1 mr-2 duration-500 cursor-pointe w-full">
                <IoPersonCircleOutline className="text-5xl xl:text-3xl" />
                <p className="hidden xl:block ml-3">{t("main")}</p>
              </Tab>

              <Tab className="flex items-center justify-center xl:justify-start hover:bg-slate-100 text-indigo-500 font-montserrat-bold text-sm rounded-lg px-4 py-2 mb-1 mr-2 duration-500 cursor-pointe w-full">
                <IoExtensionPuzzleOutline className="text-5xl xl:text-3xl" />
                <p className="hidden xl:block ml-3">{t("skills")}</p>
              </Tab>

              <Tab className="flex items-center justify-center xl:justify-start hover:bg-slate-100 text-indigo-500 font-montserrat-bold text-sm rounded-lg px-4 py-2 mb-1 mr-2 duration-500 cursor-pointe w-full">
                <IoBriefcaseOutline className="text-5xl xl:text-3xl" />
                <p className="hidden xl:block ml-3">{t("experience")}</p>
              </Tab>

              <Tab className="flex items-center justify-center xl:justify-start hover:bg-slate-100 text-indigo-500 font-montserrat-bold text-sm rounded-lg px-4 py-2 mb-1 mr-2 duration-500 cursor-pointe w-full">
                <IoSchoolOutline className="text-5xl xl:text-3xl" />
                <p className="hidden xl:block ml-3">{t("education")}</p>
              </Tab>

              <Tab className="flex items-center justify-center xl:justify-start hover:bg-slate-100 text-indigo-500 font-montserrat-bold text-sm rounded-lg px-4 py-2 mb-1 mr-2 duration-500 cursor-pointe w-full">
                <IoLocationOutline className="text-5xl xl:text-3xl" />
                <p className="hidden xl:block ml-3">{t("linked_addresses")}</p>
              </Tab>

              <Tab className="flex items-center justify-center xl:justify-start hover:bg-slate-100 text-indigo-500 font-montserrat-bold text-sm rounded-lg px-4 py-2 mb-1 mr-2 duration-500 cursor-pointe w-full">
                <IoCallOutline className="text-5xl xl:text-3xl" />
                <p className="hidden xl:block ml-3">{t("contacts")}</p>
              </Tab>

              <Tab className="flex items-center justify-center xl:justify-start hover:bg-slate-100 text-indigo-500 font-montserrat-bold text-sm rounded-lg px-4 py-2 mb-1 mr-2 duration-500 cursor-pointe w-full">
                <IoCarSportOutline className="text-5xl xl:text-3xl" />
                <p className="hidden xl:block ml-3">{t("car")}</p>
              </Tab>
            </TabList>
          </nav>

          <main className="col-span-12 xl:col-span-9">
            <TabPanel>
              <main className="bg-white xl:px-8 px-5 xl:py-6 py-4 xl:my-5 my-3 rounded-lg shadow-lg shadow-slate-200">
                <form onSubmit={(e) => onSubmit(e)}>
                  <header className="flex justify-between">
                    <aside className="flex items-center">
                      <img
                        className="w-36"
                        src={PERSON_PHOTO}
                        alt="Person photo"
                      />
                      <div className="flex flex-col ml-5 xl:ml-7">
                        <h1 className="text-lg font-montserrat-bold capitalize mb-3">
                          {person &&
                            person.firstname +
                              " " +
                              person.lastname +
                              " " +
                              person.patronymic}
                        </h1>

                        <table>
                          <tr className="text-sm">
                            <td className="text-slate-600 pb-1">
                              {t("gender")}:
                            </td>
                            <td className="pb-1">
                              <strong className="mx-2">
                                {t(`${person.gender}`)}
                              </strong>
                            </td>
                          </tr>

                          <tr className="text-sm">
                            <td className="text-slate-600 pb-1">
                              {t("marital")}:
                            </td>
                            <td className="pb-1">
                              <strong className="mx-2">
                                {t(`${person.marital}`)}
                              </strong>
                            </td>
                          </tr>

                          <tr className="text-sm">
                            <td className="text-slate-600 pb-1">
                              {t("nationality")}:
                            </td>
                            <td className="pb-1">
                              <strong className="mx-2">
                                {t(
                                  `${
                                    person.nationality?.name
                                      ? getByLocale(person.nationality?.name)
                                      : t("unknown")
                                  }`
                                )}
                              </strong>
                            </td>
                          </tr>

                          <tr className="text-sm">
                            <td className="text-slate-600 pb-1">
                              {t("person_education_type")}:
                            </td>
                            <td className="pb-1">
                              <strong className="mx-2">
                                {t(
                                  `${
                                    person.educationType?.name
                                      ? getByLocale(person.educationType?.name)
                                      : t("unknown")
                                  }`
                                )}
                              </strong>
                            </td>
                          </tr>
                        </table>
                      </div>
                    </aside>

                    <div className="flex flex-col text-sm mt-3">
                      <p className="text-slate-500 mb-2">
                        {t("id")}:
                        <strong className="text-slate-800 ml-3">
                          {person.id}
                        </strong>
                      </p>

                      <p className="text-slate-500 mb-2">
                        {t("created_at")}:
                        <strong className="text-slate-800 ml-3">
                          {person.created_at}
                        </strong>
                      </p>

                      <p className="text-slate-500">
                        {t("updated_at")}:
                        <strong className="text-slate-800 ml-3">
                          {person.updated_at}
                        </strong>
                      </p>
                    </div>
                  </header>

                  <hr className="my-5 border border-indigo-50" />

                  <main className="grid grid-cols-12 gap-5 my-8">
                    <aside className="grid grid-cols-12 gap-5 col-span-12 xl:col-span-6">
                      <h1 className="col-span-12 text-xl font-montserrat-bold text-indigo-700">
                        {t("personal")}
                      </h1>

                      <div className="col-span-12 bg-slate-50 border border-slate-200 rounded-lg flex flex-col w-full overflow-hidden">
                        <small className="px-4 pt-2 text-indigo-400">
                          {t("firstname")}
                        </small>
                        <input
                          required
                          name="firstname"
                          onChange={(e) => changeHandler(e)}
                          type="text"
                          value={person && person.firstname}
                          className="bg-slate-50 px-4 py-2"
                          placeholder={t("firstname")}
                        />
                      </div>

                      <div className="col-span-12 bg-slate-50 border border-slate-200 rounded-lg flex flex-col w-full overflow-hidden">
                        <small className="px-4 pt-2 text-indigo-400">
                          {t("lastname")}
                        </small>
                        <input
                          required
                          name="lastname"
                          onChange={(e) => changeHandler(e)}
                          type="text"
                          value={person && person.lastname}
                          className="bg-slate-50 px-4 py-2"
                          placeholder={t("lastname")}
                        />
                      </div>

                      <div className="col-span-12 bg-slate-50 border border-slate-200 rounded-lg flex flex-col w-full overflow-hidden">
                        <small className="px-4 pt-2 text-indigo-400">
                          {t("patronymic")}
                        </small>
                        <input
                          name="patronymic"
                          onChange={(e) => changeHandler(e)}
                          type="text"
                          value={person && person.patronymic}
                          className="bg-slate-50 px-4 py-2"
                          placeholder={t("patronymic")}
                        />
                      </div>

                      <div className="col-span-12 bg-slate-50 border border-slate-200 rounded-lg flex flex-col w-full overflow-hidden">
                        <small className="px-4 pt-2 text-indigo-400">
                          {t("born_date")} ({t("year_month_day")})
                        </small>
                        <input
                          name="born_date"
                          onChange={(e) => changeHandler(e)}
                          type="text"
                          value={person && person.born_date}
                          className="bg-slate-50 px-4 py-2"
                          placeholder={t("born_date")}
                        />
                      </div>

                      <div className="col-span-12 bg-slate-50 border border-slate-200 rounded-lg flex flex-col w-full overflow-hidden">
                        <small className="px-4 pt-2 text-indigo-400">
                          {t("nationality")}
                        </small>

                        {data && data.nationality && (
                          <select
                            name="nationality_id"
                            onChange={(e) => changeHandler(e)}
                            className="bg-transparent bg-slate-50 px-4 py-2 appearance-none"
                          >
                            {data.nationality.map(
                              (national: any, index: number) => {
                                return (
                                  <option
                                    selected={
                                      person.nationality?.id === national.id
                                    }
                                    key={index}
                                    value={national.id}
                                  >
                                    {t(
                                      `${
                                        national.name
                                          ? getByLocale(national.name)
                                          : t("unknown")
                                      }`
                                    )}
                                  </option>
                                );
                              }
                            )}
                          </select>
                        )}
                      </div>
                    </aside>

                    <aside className="grid grid-cols-12 gap-5 col-span-12 xl:col-span-6">
                      <h1 className="col-span-12 text-xl font-montserrat-bold text-indigo-700">
                        {t("passport_datas")}
                      </h1>

                      <div className="col-span-12 bg-slate-50 border border-slate-200 rounded-lg flex flex-col w-full overflow-hidden">
                        <small className="px-4 pt-2 text-indigo-400">
                          {t("passport_series")}
                        </small>

                        {data && data.passportSeries && (
                          <select
                            name="passport_series_id"
                            onChange={(e) => changeHandler(e)}
                            className="bg-transparent bg-slate-50 px-4 py-2 appearance-none"
                          >
                            {data.passportSeries.map(
                              (series: any, index: number) => {
                                return (
                                  <option
                                    selected={
                                      person.passport_series_id === series.id
                                    }
                                    key={index}
                                    value={series.id}
                                  >
                                    {series.name}
                                  </option>
                                );
                              }
                            )}
                          </select>
                        )}
                      </div>

                      <div className="col-span-12 bg-slate-50 border border-slate-200 rounded-lg flex flex-col w-full overflow-hidden">
                        <small className="px-4 pt-2 text-indigo-400">
                          {t("passport_no")}
                        </small>
                        <input
                          required
                          name="passport_no"
                          onChange={(e) => changeHandler(e)}
                          type="text"
                          value={person && person.passport_no}
                          className="bg-slate-50 px-4 py-2"
                          placeholder={t("passport_no")}
                        />
                      </div>

                      <div className="col-span-12 bg-slate-50 border border-slate-200 rounded-lg flex flex-col w-full overflow-hidden">
                        <small className="px-4 pt-2 text-indigo-400">
                          {t("passport_issue_date")}
                        </small>
                        <input
                          name="passport_issue_date"
                          onChange={(e) => changeHandler(e)}
                          type="text"
                          value={person && person.passport_issue_date}
                          className="bg-slate-50 px-4 py-2"
                          placeholder={t("passport_issue_date")}
                        />
                      </div>

                      <div className="col-span-12 bg-slate-50 border border-slate-200 rounded-lg flex flex-col w-full">
                        <PassportIssuedBy
                          placeholder={person?.passport_issued_by?.name}
                          state={person}
                          setState={setPerson}
                        />
                      </div>

                      <div className="col-span-12 bg-slate-50 border border-slate-200 rounded-lg flex flex-col w-full overflow-hidden">
                        <small className="px-4 pt-2 text-indigo-400">
                          {t("passport_comment")}
                        </small>
                        <input
                          name="passport_comment"
                          onChange={(e) => changeHandler(e)}
                          type="text"
                          value={person && person.passport_comment}
                          className="bg-slate-50 px-4 py-2"
                          placeholder={t("passport_comment")}
                        />
                      </div>
                    </aside>

                    <hr className="col-span-12 my-5 border border-indigo-50" />

                    <aside className="grid grid-cols-12 gap-5 col-span-12">
                      <h1 className="col-span-12 text-xl font-montserrat-bold text-indigo-700">
                        {t("gender_and_marital_status")}
                      </h1>

                      <div className="col-span-12 xl:col-span-6 bg-slate-50 border border-slate-200 rounded-lg flex flex-col w-full overflow-hidden">
                        <small className="px-4 pt-2 text-indigo-400">
                          {t("gender")}
                        </small>

                        <select
                          name="gender"
                          onChange={(e) => changeHandler(e)}
                          className="bg-transparent bg-slate-50 px-4 py-2 appearance-none"
                        >
                          <option
                            selected={person.gender === "unknown"}
                            value="unknown"
                          >
                            {t("unknown")}
                          </option>
                          <option
                            selected={person.gender === "man"}
                            value="man"
                          >
                            {t("man")}
                          </option>
                          <option
                            selected={person.gender === "women"}
                            value="women"
                          >
                            {t("women")}
                          </option>
                        </select>
                      </div>

                      <div className="col-span-12 xl:col-span-6 bg-slate-50 border border-slate-200 rounded-lg flex flex-col w-full overflow-hidden">
                        <small className="px-4 pt-2 text-indigo-400">
                          {t("marital")}
                        </small>

                        <select
                          name="marital"
                          onChange={(e) => changeHandler(e)}
                          className="bg-transparent bg-slate-50 px-4 py-2 appearance-none"
                        >
                          <option
                            selected={person.marital === "unknown"}
                            value="unknown"
                          >
                            {t("unknown")}
                          </option>
                          <option
                            selected={person.marital === "married"}
                            value="married"
                          >
                            {t("married")}
                          </option>
                          <option
                            selected={person.marital === "single"}
                            value="single"
                          >
                            {t("single")}
                          </option>
                          <option
                            selected={person.marital === "divorced"}
                            value="divorced"
                          >
                            {t("divorced")}
                          </option>
                          <option
                            selected={person.marital === "widower_widow"}
                            value="widower_widow"
                          >
                            {t("widower_widow")}
                          </option>
                        </select>
                      </div>
                    </aside>

                    <hr className="col-span-12 my-5 border border-indigo-50" />

                    <aside className="grid grid-cols-12 gap-5 col-span-12">
                      <h1 className="col-span-12 text-xl font-montserrat-bold text-indigo-700">
                        {t("children")} - {t("has_children_description")}
                      </h1>

                      <div className="col-span-12 bg-slate-50 border border-slate-200 rounded-lg flex flex-col w-full overflow-hidden">
                        <small className="px-4 pt-2 text-indigo-400">
                          {t("children")}
                        </small>
                        <input
                          name="children"
                          onChange={(e) => changeHandler(e)}
                          type="text"
                          value={person && person.children}
                          className="bg-slate-50 px-4 py-2"
                          placeholder={t("children")}
                        />
                      </div>
                    </aside>

                    <hr className="col-span-12 my-5 border border-indigo-50" />

                    <aside className="grid grid-cols-12 gap-5 col-span-12">
                      <h1 className="col-span-12 text-xl font-montserrat-bold text-indigo-700">
                        {t("description")}
                      </h1>

                      <div className="col-span-12 xl:col-span-6 bg-slate-50 border border-slate-200 rounded-lg flex flex-col w-full overflow-hidden">
                        <header className="flex items-center justify-between">
                          <small className="px-4 pt-2">
                            {t("person_description")}
                          </small>
                          <img
                            src={RU_FLAG}
                            alt="RU"
                            className="w-6 h-4 mr-4 mt-2"
                          />
                        </header>
                        <textarea
                          name="description_ru"
                          onChange={(e) => changeHandler(e)}
                          className="bg-slate-50 h-60 px-4 py-2"
                          placeholder={t("person_description")}
                          value={person && person.description_ru}
                        ></textarea>
                      </div>

                      <div className="col-span-12 xl:col-span-6 bg-slate-50 border border-slate-200 rounded-lg flex flex-col w-full overflow-hidden">
                        <header className="flex items-center justify-between">
                          <small className="px-4 pt-2">
                            {t("person_description")}
                          </small>
                          <img
                            src={EN_FLAG}
                            alt="RU"
                            className="w-6 h-4 mr-4 mt-2"
                          />
                        </header>
                        <textarea
                          name="description_en"
                          onChange={(e) => changeHandler(e)}
                          className="bg-slate-50 h-60 px-4 py-2"
                          placeholder={t("person_description")}
                          value={person && person.description_en}
                        ></textarea>
                      </div>
                    </aside>

                    <hr className="col-span-12 my-5 border border-indigo-50" />

                    <aside className="grid grid-cols-12 gap-5 col-span-12">
                      <h1 className="col-span-12 text-xl font-montserrat-bold text-indigo-700">
                        {t("statuses")}
                      </h1>

                      <Checkbox
                        onChange={(e) => changeHandler(e)}
                        name="dontdisturb"
                        checked={person.dontdisturb == 1}
                        shape="curve"
                        animation="jelly"
                        color="primary"
                      >
                        {t("dontdisturb")}
                      </Checkbox>
                      <div className="col-span-12 bg-slate-50 border border-slate-200 rounded-lg flex flex-col w-full overflow-hidden">
                        <small className="px-4 pt-2 text-indigo-400">
                          {t("dontdisturb_notes")}
                        </small>
                        <input
                          name="dontdisturb_notes"
                          onChange={(e) => changeHandler(e)}
                          type="text"
                          value={person && person.dontdisturb_notes}
                          className="bg-slate-50 px-4 py-2"
                          placeholder={t("dontdisturb_notes")}
                        />
                      </div>

                      <Checkbox
                        onChange={(e) => changeHandler(e)}
                        name="vip"
                        checked={person.vip == 1}
                        shape="curve"
                        animation="jelly"
                        color="warning"
                      >
                        {t("vip")}
                      </Checkbox>
                      <div className="col-span-12 bg-slate-50 border border-slate-200 rounded-lg flex flex-col w-full overflow-hidden">
                        <small className="px-4 pt-2 text-indigo-400">
                          {t("vip_notes")}
                        </small>
                        <input
                          name="vip_notes"
                          onChange={(e) => changeHandler(e)}
                          type="text"
                          value={person && person.vip_notes}
                          className="bg-slate-50 px-4 py-2"
                          placeholder={t("vip_notes")}
                        />
                      </div>

                      <Checkbox
                        onChange={(e) => changeHandler(e)}
                        name="blacklist"
                        checked={person.blacklist == 1}
                        shape="curve"
                        animation="jelly"
                        color="danger"
                      >
                        {t("blacklist")}
                      </Checkbox>
                      <div className="col-span-12 bg-slate-50 border border-slate-200 rounded-lg flex flex-col w-full overflow-hidden">
                        <small className="px-4 pt-2 text-indigo-400">
                          {t("blacklist_notes")}
                        </small>
                        <input
                          name="blacklist_notes"
                          onChange={(e) => changeHandler(e)}
                          type="text"
                          value={person && person.blacklist_notes}
                          className="bg-slate-50 px-4 py-2"
                          placeholder={t("blacklist_notes")}
                        />
                      </div>
                    </aside>

                    <hr className="col-span-12 my-5 border border-indigo-50" />

                    <aside className="grid grid-cols-12 gap-4 col-span-12">
                      <h1 className="col-span-12 text-xl font-montserrat-bold text-indigo-700">
                        {t("additional_information")}
                      </h1>

                      <colgroup className="grid grid-cols-12 gap-4 col-span-12 xl:col-span-6">
                        <div className="col-span-12">
                          <Checkbox
                            name="military"
                            onChange={(e) => changeHandler(e)}
                            checked={person.military == 1}
                            shape="round"
                            animation="jelly"
                            color="success"
                          >
                            {t("military")}
                          </Checkbox>
                        </div>

                        <div className="col-span-12">
                          <Checkbox
                            name="sentence"
                            onChange={(e) => changeHandler(e)}
                            checked={person.sentence == 1}
                            shape="round"
                            animation="jelly"
                            color="success"
                          >
                            {t("sentence")}
                          </Checkbox>
                        </div>

                        <div className="col-span-12">
                          <Checkbox
                            name="relocation"
                            onChange={(e) => changeHandler(e)}
                            checked={person.relocation == 1}
                            shape="round"
                            animation="jelly"
                            color="success"
                          >
                            {t("relocation")}
                          </Checkbox>
                        </div>

                        <div className="col-span-12">
                          <Checkbox
                            name="shift"
                            onChange={(e) => changeHandler(e)}
                            checked={person.shift == 1}
                            shape="round"
                            animation="jelly"
                            color="success"
                          >
                            {t("shift")}
                          </Checkbox>
                        </div>
                      </colgroup>

                      <colgroup className="grid grid-cols-12 gap-4 col-span-12 xl:col-span-6">
                        <div className="col-span-12 bg-slate-50 border border-slate-200 rounded-lg flex flex-col w-full overflow-hidden">
                          <small className="px-4 pt-2 text-indigo-400">
                            {t("min_salary")}
                          </small>
                          <input
                            name="min_salary"
                            onChange={(e) => changeHandler(e)}
                            type="text"
                            value={person && person.min_salary}
                            className="bg-slate-50 px-4 py-2"
                            placeholder={t("min_salary")}
                          />
                        </div>

                        <div className="col-span-12 bg-slate-50 border border-slate-200 rounded-lg flex flex-col w-full overflow-hidden">
                          <small className="px-4 pt-2 text-indigo-400">
                            {t("salary_currency")}
                          </small>

                          <select
                            name="salary_currency"
                            onChange={(e) => changeHandler(e)}
                            className="bg-transparent bg-slate-50 px-4 py-2 appearance-none"
                          >
                            <option
                              selected={person.salary_currency == "1"}
                              value={"1"}
                            >
                              {t("tmt")}
                            </option>
                            <option
                              selected={person.salary_currency == "2"}
                              value={"2"}
                            >
                              {t("usd")}
                            </option>
                            <option
                              selected={person.salary_currency == "3"}
                              value={"3"}
                            >
                              {t("eur")}
                            </option>
                          </select>
                        </div>
                      </colgroup>
                    </aside>
                  </main>

                  <button className="bg-indigo-600 hover:bg-indigo-800 text-white font-montserrat-bold px-6 py-2.5 border border-indigo-600 duration-300 rounded-lg">
                    {t("save")}
                  </button>
                  <NavLink
                    to="/people"
                    className="bg-slate-100 hover:bg-slate-200 text-slate-600 border border-slate-200 font-montserrat-bold px-6 py-3 duration-300 rounded-lg ml-10"
                  >
                    {t("cancel")}
                  </NavLink>
                </form>
              </main>
            </TabPanel>

            <TabPanel>
              <main className="bg-white xl:px-8 px-5 xl:py-6 py-4 xl:my-5 my-3 rounded-lg shadow-lg shadow-slate-200">
                <PersonSkills skills={person?.skills} />
              </main>
            </TabPanel>

            <TabPanel>
              <main className="bg-white xl:px-8 px-5 xl:py-6 py-4 xl:my-5 my-3 rounded-lg shadow-lg shadow-slate-200">
                <h1> {t("experience")} </h1>
              </main>
            </TabPanel>

            <TabPanel>
              <main className="bg-white xl:px-8 px-5 xl:py-6 py-4 xl:my-5 my-3 rounded-lg shadow-lg shadow-slate-200">
                <h1> {t("education")} </h1>
              </main>
            </TabPanel>

            <TabPanel>
              <main className="bg-white xl:px-8 px-5 xl:py-6 py-4 xl:my-5 my-3 rounded-lg shadow-lg shadow-slate-200">
                <h1> {t("linked_addresses")} </h1>
              </main>
            </TabPanel>

            <TabPanel>
              <main className="bg-white xl:px-8 px-5 xl:py-6 py-4 xl:my-5 my-3 rounded-lg shadow-lg shadow-slate-200">
                <h1> {t("contacts")} </h1>
              </main>
            </TabPanel>

            <TabPanel>
              <main className="bg-white xl:px-8 px-5 xl:py-6 py-4 xl:my-5 my-3 rounded-lg shadow-lg shadow-slate-200">
                <h1> {t("car")} </h1>
              </main>
            </TabPanel>
          </main>
        </section>
      </Tabs>
    </AppLayout>
  );
};

export default EditPerson;
