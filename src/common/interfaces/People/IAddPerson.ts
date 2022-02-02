import { IEducationType } from "../Education/IEducation";
import { ITranslatable } from "../ITranslatable";
import { ISkill } from "../Skill/ISkill";

export interface IAddPerson {
    id?: number,
    firstname: string,
    lastname: string,
    patronymic?: string,
    registered_at?: string,
    passport_series_id?: string
    passport_no?: string,
    passport_issue_date?: string,
    passport_issued_by?: IPassportIssuedBy
    passport_issued_by_id?: number
    passport_comment?: string,
    born_date?: string,
    educationType?: IEducationType
    marital?: string,
    children?: string,
    driver_classes?: string,
    military?: number,
    sentence?: number,
    dead?: number,
    gender?: string,
    relocation?: number,
    shift?: number,
    dontdisturb?: number,
    dontdisturb_notes?: string,
    vip?: number,
    vip_notes?: string,
    blacklist?: number,
    blacklist_notes?: string,
    status_comment?: string,
    hascar?: number,
    nationality?: INationality
    nationality_id?: number,
    min_salary?: string,
    salary_currency?: string,
    description_ru?: string,
    description_en?: string,
    email?: string,
    phone?: string,
    status?: boolean,
    created_at?: string,
    updated_at?: string,
    skills?: ISkill
}

export interface INationality {
    id: number,
    name: ITranslatable
}

export interface IPassportIssuedBy {
    id: number,
    name: string
}

export interface IPersonSkill {
    skill_id: string | null,
    people_id: string | undefined,
    level: string | undefined
}