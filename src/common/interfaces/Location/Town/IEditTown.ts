import { ITranslatable } from "../../ITranslatable";

export interface IEditTown {
    id: number | null,
    name: ITranslatable,
    area_id: number | null,
    edit?: boolean,
}