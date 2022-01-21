import { gql } from '@apollo/client'

export const DELETE_PERSON = gql`mutation DeletePerson($id: ID!) { deletePerson(id: $id) }`