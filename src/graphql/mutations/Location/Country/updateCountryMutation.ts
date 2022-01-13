import { gql } from '@apollo/client'

export const UPDATE_COUNTRY = gql`
    mutation UpdateCountry(
        $id: ID!,
        $name_ru: String!,
        $name_en: String!,
    ) {
        updateCountry(
            id: $id,
            name_ru: $name_ru,
            name_en: $name_en,
        ) {
            id
            name {
                ru
                en
            }
        }
    }
`