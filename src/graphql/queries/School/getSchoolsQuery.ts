import { gql } from '@apollo/client'

export const GET_SCHOOLS = gql`
    query GetSchools($page: Int)
    {
        schools(first: 30, page: $page, orderBy: [{column: ID, order: DESC}])
        {
            data {
                id
                name {
                    ru
                    en
                }
                schoolType {
                    id
                    name {
                        ru
                        en
                    }
                }
            }
            paginatorInfo {
                lastPage
                total
            }
        }
    }
`