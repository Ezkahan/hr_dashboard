import { ITranslatable } from "../ITranslatable";
import { IPersonSkill } from "../People/IAddPerson";

export interface ISkill {
    id: number,
    name: ITranslatable,
    skillType: SkillType
    pivot?: IPersonSkill
}


interface SkillType {
    id: number,
    code: string,
    name: ITranslatable
}
