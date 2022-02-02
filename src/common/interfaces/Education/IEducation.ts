import { ITranslatable } from "../ITranslatable";
import { ICountry } from "../Location/Country/ICountry";

export interface IEducation {
    id: number,
    name: ITranslatable,
    description: ITranslatable,
    begin: string,
    end: string | null,
    country: ICountry,
    education_type_id: IEducationType,
}

export interface IEducationType {
    id: number,
    name?: string
}