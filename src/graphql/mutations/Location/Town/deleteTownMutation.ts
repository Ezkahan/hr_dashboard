import { gql } from '@apollo/client'

export const DELETE_TOWN = gql`mutation DeleteTown($id: ID!) { deleteTown(id: $id) }`