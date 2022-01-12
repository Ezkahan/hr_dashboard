import { gql } from '@apollo/client'

export const _GET_COMPANIES = gql`
query GetCompanies($page: Int) {
    companies(first: 30, page: $page, orderBy: [{column: ID, order: DESC}])
    {
        data {
            id
            name
            description
            phone
            email
        }
        paginatorInfo {
            count
            currentPage
            firstItem
            lastItem
            lastPage
            perPage
            total
            hasMorePages
        }
    }
}
`;