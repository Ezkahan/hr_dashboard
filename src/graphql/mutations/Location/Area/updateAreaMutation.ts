import { gql } from '@apollo/client'

export const UPDATE_AREA = gql`
    mutation UpdateArea(
        $id: ID!,
        $name_ru: String!,
        $name_en: String!,
        $country_id: ID!,
    ) {
        updateArea(
            id: $id,
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