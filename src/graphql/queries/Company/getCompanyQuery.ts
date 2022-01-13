import { gql } from '@apollo/client'

export const GET_COMPANY = gql`
query GetCompany($id: ID) {
    company(id: $id)
        {
            id
            name {
                ru
                en
            }
            description {
                ru
                en
            }
            phone
            fax
            email
            website
        }
    }
`