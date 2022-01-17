import { gql } from '@apollo/client'

export const GET_COUNTRY_LIST = gql`
query GetCountryList {
    countryList(orderBy: [{column: ID, order: DESC}])
        {
            id
            name {
                ru
                en
            }
        }
    }
`