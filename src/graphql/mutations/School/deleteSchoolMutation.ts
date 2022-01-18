import { gql } from '@apollo/client'

export const DELETE_SCHOOL = gql`mutation DeleteSchool($id: ID!) { deleteSchool(id: $id) }`