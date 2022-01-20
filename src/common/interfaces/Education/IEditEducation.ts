import { ITranslatable } from "../ITranslatable";

export interface IEditEducation {
    id: number | null,
    name: ITranslatable,
    description: ITranslatable,
    begin: string,
    end: string | null,
    country_id: number | null,
    education_type_id: number | null,
    edit?: boolean,
}