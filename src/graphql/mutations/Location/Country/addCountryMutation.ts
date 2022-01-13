import { gql } from '@apollo/client'

export const ADD_COUNTRY = gql`
    mutation AddCountry(
        $name_ru: String!,
        $name_en: String!,
    ) {
        addCountry(
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