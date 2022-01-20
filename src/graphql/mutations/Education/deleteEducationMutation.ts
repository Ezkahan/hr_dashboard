import { gql } from '@apollo/client'

export const DELETE_EDUCATION = gql`mutation DeleteEducation($id: ID!) { deleteEducation(id: $id) }`