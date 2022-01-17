import { ITranslatable } from "../../ITranslatable";

export interface ITown {
    id: number,
    name: ITranslatable,
    area: _Area,
}

interface _Area {
    id: number
}