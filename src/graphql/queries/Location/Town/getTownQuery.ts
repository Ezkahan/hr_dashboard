import { gql } from '@apollo/client'

export const GET_TOWN = gql`
query GetTown($id: ID!) {
    town(id: $id)
        {
            id
            name {
                ru
                en
            }
            area {
                id
                name {
                    ru
                    en
                }
            }
        }
    }
`