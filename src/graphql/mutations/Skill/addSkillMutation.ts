import { gql } from '@apollo/client'

export const ADD_SKILL = gql`
    mutation AddSkill(
        $name_ru: String!,
        $name_en: String!,
        $skill_type_id: ID!
    ) {
        addSkill(
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