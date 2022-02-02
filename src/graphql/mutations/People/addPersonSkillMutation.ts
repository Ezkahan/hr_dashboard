import { gql } from '@apollo/client'

export const ADD_PERSON_SKILL = gql`
    mutation AddPersonSkill(
        $skill_id: ID!,
        $people_id: ID!,
        $level: String,
    ) {
        addPersonSkill(
            skill_id: $skill_id,
            people_id: $people_id,
            level: $level,
        ) {
            people_id
            skill_id
            level
        }
    }
`