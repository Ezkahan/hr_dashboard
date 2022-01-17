import { gql } from '@apollo/client'

export const GET_TOWNS = gql`
query GetTowns($page: Int) {
    towns(first: 30, page: $page, orderBy: [{column: ID, order: DESC}]) {
        data {
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
        paginatorInfo {
            total
            lastPage
        }
    }
}
`;