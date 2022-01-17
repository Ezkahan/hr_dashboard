import { gql } from '@apollo/client'

export const GET_SKILL_TYPES = gql`
    query GetSkillTypes {
        skillTypes(orderBy: [{column: ID, order: DESC}]) {
            id
            code
            name {
                ru
                en
            }
        }
    }
`