import { gql } from '@apollo/client'

export const UPDATE_TOWN = gql`
    mutation UpdateTown(
        $id: ID!,
        $name_ru: String!,
        $name_en: String!,
        $area_id: ID!,
    ) {
        updateTown(
            id: $id,
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