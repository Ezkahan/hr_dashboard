import { gql } from '@apollo/client'

export const GET_SKILLS = gql`
    query GetSkills($page: Int) {
        skills(first: 30, page: $page, orderBy: [{column: ID, order: DESC}]) {
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