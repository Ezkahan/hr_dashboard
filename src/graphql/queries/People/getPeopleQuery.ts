import { gql } from '@apollo/client'

export const GET_PEOPLE = gql`
    query GetPeople($page: Int, $search: String) {
        people(first: 30, search: $search, page: $page, orderBy: [{column: ID, order: DESC}]) {
            data {
                id
                firstname
                lastname
                patronymic
                gender
                min_salary
            }
            paginatorInfo {
                lastPage
                total
            }
        }
    }
`