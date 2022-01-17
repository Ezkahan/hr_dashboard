import { gql } from '@apollo/client'

export const DELETE_SKILL = gql`mutation DeleteSkill($id: ID!) { deleteSkill(id: $id) }`