import { ITranslatable } from "../ITranslatable";

export interface IEditSkill {
    id: number | null,
    name: ITranslatable,
    skill_type_id: number | null,
    edit?: boolean,
}