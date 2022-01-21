import { ITranslatable } from "../ITranslatable";

export interface ICompanyList {
    id: number,
    name: ITranslatable,
    phone: string,
    email: string,
    description: ITranslatable,
}