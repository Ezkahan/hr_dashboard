import { gql } from '@apollo/client'

export const GET_SCHOOL_TYPES = gql`
    query GetSchoolTypes
    {
        schoolTypes(orderBy: [{column: ID, order: ASC}])
        {
            id
            name {
                ru
                en
            }
        }
    }
`