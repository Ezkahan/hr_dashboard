import { gql } from '@apollo/client'

export const ADD_AREA = gql`
    mutation AddArea(
        $name_ru: String!,
        $name_en: String!,
        $country_id: ID!
    ) {
        addArea(
            name_ru: $name_ru,
            name_en: $name_en,
            country_id: $country_id,
        ) {
            id
            name {
                ru
                en
            }
        }
    }
`