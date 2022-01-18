import { ITranslatable } from "../ITranslatable";

export interface ISchool {
    id: number,
    name: ITranslatable,
    school_type_id: _SchoolType,
}

interface _SchoolType {
    id: number
}