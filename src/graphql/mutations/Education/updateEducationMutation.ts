import { gql } from '@apollo/client'

export const UPDATE_EDUCATION = gql`
    mutation UpdateEducation(
        $id: ID!,
        $name_ru: String!,
        $name_en: String!,
        $education_type_id: ID!,
    ) {
        updateEducation(
            id: $id,
            name_ru: $name_ru,
            name_en: $name_en,
            education_type_id: $education_type_id,
        ) {
            id
            name {
                ru
                en
            }
        }
    }
`