import { ITranslatable } from "../../ITranslatable";

export interface IEditCountry {
    id: number | null,
    name: ITranslatable,
    edit?: boolean,
}