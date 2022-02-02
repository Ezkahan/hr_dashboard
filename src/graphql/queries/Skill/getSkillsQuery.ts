import { gql } from '@apollo/client'

export const GET_SKILLS = gql`
    query GetSkills($page: Int, $search: String) {
        skills(first: 90, page: $page, search: $search orderBy: [{column: ID, order: DESC}]) {
            data {
                id
                name {
                    ru
                    en
                }
                skillType {
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