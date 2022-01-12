import { gql } from '@apollo/client'

export const DELETE_COMPANY = gql`mutation DeleteCompany($id: ID!) { deleteCompany(id: $id) }`