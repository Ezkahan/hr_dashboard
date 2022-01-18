import { ITranslatable } from "../ITranslatable";

export interface IEditSchool {
    id: number | null,
    name: ITranslatable,
    school_type_id: number | null,
    edit?: boolean,
}