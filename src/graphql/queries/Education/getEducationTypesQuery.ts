import { gql } from '@apollo/client'

export const GET_EDUCATION_TYPES = gql`
    query GetEducationTypes
    {
        educationTypes(orderBy: [{column: ID, order: ASC}])
        {
            id
            name {
                ru
                en
            }
        }
    }
`