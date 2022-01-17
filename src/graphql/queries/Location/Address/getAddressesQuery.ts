import { gql } from '@apollo/client'

export const GET_ADDRESSES = gql`
query GetTowns($page: Int) {
    addresses(first: 30, page: $page, orderBy: [{column: ID, order: DESC}]) {
        data {
            id
            address
            district
            status
            country {
                name {
                    ru
                    en
                }
            }
            town {
                name {
                    ru
                    en
                }
            }
            area {
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