import { gql } from '@apollo/client'

export const LOCATIONS_TOTAL = gql`
query GetCountriesTotal($page: Int) {
    countries(first: 30, page: $page, orderBy: [{column: ID, order: DESC}])
        {
            paginatorInfo
            {
                total
            }
        }
    
    areas(first: 30, page: $page, orderBy: [{column: ID, order: DESC}])
        {
            paginatorInfo
            {
                total
            }
        }
    
    towns(first: 30, page: $page, orderBy: [{column: ID, order: DESC}])
        {
            paginatorInfo
            {
                total
            }
        }

    addresses(first: 30, page: $page, orderBy: [{column: ID, order: DESC}])
        {
            paginatorInfo
            {
                total
            }
        }
        
    }
`