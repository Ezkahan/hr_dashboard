import { gql } from '@apollo/client'

export const GET_AREAS = gql`
query GetAreas($page: Int) {
    areas(first: 30, page: $page, orderBy: [{column: ID, order: DESC}]) {
        data {
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
        paginatorInfo {
            total
            lastPage
        }
    }
}
`;