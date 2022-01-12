import { gql } from '@apollo/client'

export const _GET_COMPANY = gql`
query GetCompany($id: ID) {
    company(id: $id)
        {
            id
            name
            description
            phone
            fax
            email
            website
        }
    }
`