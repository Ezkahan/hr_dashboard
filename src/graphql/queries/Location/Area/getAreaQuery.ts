import { gql } from '@apollo/client'

export const GET_AREA = gql`
query GetArea($id: ID!) {
    area(id: $id)
        {
            id
            name {
                ru
                en
            }
            country {
                id
                name {
                    ru
                    en
                }
            }
        }
    }
`