import { gql } from '@apollo/client'

export const ADD_TOWN = gql`
    mutation AddTown(
        $name_ru: String!,
        $name_en: String!,
        $area_id: ID!
    ) {
        addTown(
            name_ru: $name_ru,
            name_en: $name_en,
            area_id: $area_id,
        ) {
            id
            name {
                ru
                en
            }
        }
    }
`