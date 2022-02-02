import { useMutation, useQuery } from "@apollo/client";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { IoTrashOutline } from "react-icons/io5";
import { useParams, useNavigate } from "react-router-dom";
import getByLocale from "../../../common/helpers/getByLocale";
import getSkillLevel from "../../../common/helpers/getSkillLevel";
import { IPersonSkill } from "../../../common/interfaces/People/IAddPerson";
import { ISkill } from "../../../common/interfaces/Skill/ISkill";
import SearchableSkillInput from "../../../components/SearchableInput/SearchableSkillInput";
import { ADD_PERSON_SKILL } from "../../../graphql/mutations/People/addPersonSkillMutation";
import { GET_PEOPLE } from "../../../graphql/queries/People/getPeopleQuery";
import { GET_PERSON } from "../../../graphql/queries/People/getPersonQuery";
import { GET_SKILLS } from "../../../graphql/queries/Skill/getSkillsQuery";

const PersonSkills: React.FC<any> = ({ skills }) => {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  const [selected, setSelected] = useState<IPersonSkill>({
    people_id: id,
    skill_id: null,
    level: "1",
  });

  const { data, refetch } = useQuery(GET_SKILLS, {
    variables: { page: 1, search: "" },
  });

  const onChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelected({ ...selected, [e.target.name]: e.target.value });
  };

  const onCompleted = () => {
    toast.success(t("success_saved"), { duration: 1500 }) &&
      setTimeout(() => navigate("/people"), 2000);
  };

  const [addPersonSkill] = useMutation(ADD_PERSON_SKILL, {
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

  const savePersonSkill = () => {
    if (selected.skill_id === null) {
      toast.error(t("skill_not_selected"), { duration: 2000 });
      return;
    }

    addPersonSkill({
      variables: {
        people_id: selected.people_id,
        skill_id: selected.skill_id,
        level: selected.level,
      },
    });
  };

  return (
    <section className="grid grid-cols-12 gap-5">
      <header className="col-span-12 flex flex-col xl:justify-between">
        <h1 className="text-xl font-montserrat-bold text-indigo-700 mb-4">
          {t("skills")}
        </h1>

        <div className="flex items-center">
          <SearchableSkillInput
            placeholder={t("skills")}
            list={data && data.skills.data}
            refetch={refetch}
            state={selected}
            setState={setSelected}
          />
          <select
            name="level"
            onChange={(e) => onChangeHandler(e)}
            className="bg-transparent border border-slate-200 px-4 py-2 rounded-lg mx-2 appearance-none"
          >
            <option value="1">{t("low")}</option>
            <option value="2">{t("medium")}</option>
            <option value="3">{t("high")}</option>
          </select>

          <button
            onClick={() => savePersonSkill()}
            className="bg-indigo-600 hover:bg-indigo-800 text-white px-4 py-2 border border-indigo-600 duration-300 rounded-lg"
          >
            {t("add")}
          </button>
        </div>
      </header>

      {selected && JSON.stringify(selected)}

      <main className="col-span-12 grid grid-cols-12 gap-5">
        {skills &&
          skills.map((skill: ISkill, index: number) => {
            return (
              <aside
                key={index}
                className="col-span-6 xl:col-span-4 flex items-center justify-between bg-slate-50 border border-slate-100 rounded-lg px-4 py-2"
              >
                <div className="flex flex-col">
                  <small className="text-orange-500">
                    {getByLocale(skill.skillType?.name)}
                  </small>
                  <p> {skill.name && getByLocale(skill.name)} </p>
                  <small className="text-xs text-emerald-500">
                    {getSkillLevel(skill.pivot?.level)}
                  </small>
                </div>
                <button className="flex items-center justify-center border border-red-400 text-red-400 w-8 h-8 rounded-full hover:text-white hover:bg-red-400 duration-300">
                  <IoTrashOutline size={18} />
                </button>
              </aside>
            );
          })}
      </main>
    </section>
  );
};
export default PersonSkills;
