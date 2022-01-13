import { gql } from '@apollo/client'

export const DELETE_COUNTRY = gql`mutation DeleteCountry($id: ID!) { deleteCountry(id: $id) }`