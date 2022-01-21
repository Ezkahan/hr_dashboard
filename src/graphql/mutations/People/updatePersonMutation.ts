import { gql } from '@apollo/client'

export const UPDATE_SKILL = gql`
    mutation UpdateSkill(
        $id: ID!,
        $name_ru: String!,
        $name_en: String!,
        $skill_type_id: ID!,
    ) {
        updateSkill(
            id: $id,
            name_ru: $name_ru,
            name_en: $name_en,
            skill_type_id: $skill_type_id,
        ) {
            id
            name {
                ru
                en
            }
        }
    }
`