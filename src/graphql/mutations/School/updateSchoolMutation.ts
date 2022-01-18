import { gql } from '@apollo/client'

export const UPDATE_SCHOOL = gql`
    mutation UpdateSchool(
        $id: ID!,
        $name_ru: String!,
        $name_en: String!,
        $school_type_id: ID!,
    ) {
        updateSchool(
            id: $id,
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