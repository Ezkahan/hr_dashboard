import { gql } from '@apollo/client'

export const GET_EDUCATION = gql`
    query GetEducation($page: Int)
    {
        education(first: 30, page: $page, orderBy: [{column: ID, order: DESC}])
        {
            data {
                id
                name {
                    ru
                    en
                }
                description {
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
                begin
                end
                educationType {
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