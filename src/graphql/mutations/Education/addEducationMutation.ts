import { gql } from '@apollo/client'

export const ADD_SCHOOL = gql`
    mutation AddSchool(
        $name_ru: String!,
        $name_en: String!,
        $school_type_id: ID!
    ) {
        addSchool(
            name_ru: $name_ru,
            name_en: $name_en,
            school_type_id: $school_type_id,
        ) {
            id
            name {
                ru
                en
            }
        }
    }
`