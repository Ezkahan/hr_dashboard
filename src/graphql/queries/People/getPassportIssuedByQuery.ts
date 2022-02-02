import { gql } from '@apollo/client'

export const GET_PASSPORT_ISSUED_BY = gql`
    query GetPassportIssuedBy($search: String) {
        passportIssuedBy(first: 20, search: $search, orderBy: [{column: ID, order: DESC}]) {
            data {
                id
                name
            }
        }
    }
`