import { gql } from '@apollo/client'

export const GET_COUNTRIES = gql`
query GetCountries($page: Int) {
    countries(first: 30, page: $page, orderBy: [{column: ID, order: DESC}])
        {
            data {
                id
                name {
                    ru
                    en
                }
            }
            paginatorInfo {
                total
                lastPage
            }
        }
    }
`