import { ITranslatable } from "../../ITranslatable";

export interface IEditArea {
    id: number | null,
    name: ITranslatable,
    country_id: number | null,
    edit?: boolean,
}