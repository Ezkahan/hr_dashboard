import { gql } from '@apollo/client'

export const GET_ADDRESS = gql`
query GetAddress($id: ID!) {
    address(id: $id)
        {
            id
            address
            district
            status
            country {
                name {
                    ru
                    en
                }
            }
            town {
                name {
                    ru
                    en
                }
            }
            area {
                name {
                    ru
                    en
                }
            }
        }
    }
`