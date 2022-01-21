import { gql } from '@apollo/client'

export const ADD_PERSON = gql`
    mutation AddPerson(
        $firstname: String!,
        $lastname: String!,
        $patronymic: String,
        $born_date: String,
        $description_ru: String,
        $description_en: String,
    ) {
        addPerson(
            firstname: $firstname,
            lastname: $lastname,
            patronymic: $patronymic,
            born_date: $born_date,
            description_ru: $description_ru,
            description_en: $description_en,
        )
        {
            id
            description {
                ru
                en
            }
        }
    }
`