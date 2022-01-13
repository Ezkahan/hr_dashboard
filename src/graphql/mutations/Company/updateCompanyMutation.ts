import { gql } from '@apollo/client'

export const UPDATE_COMPANY = gql`
    mutation UpdateCompany(
        $id: ID!
        $name_ru: String!,
        $name_en: String!,
        $phone: String,
        $fax: String,
        $email: String,
        $website: String,
        $description_ru: String,
        $description_en: String,
        $company_type_id: ID! = 1
    ) {
        updateCompany(
            id: $id
            name_ru: $name_ru,
            name_en: $name_en,
            phone: $phone,
            fax: $fax,
            email: $email,
            website: $website,
            description_ru: $description_ru,
            description_en: $description_en,
            company_type_id: $company_type_id
        ) {
            id
            name {
                ru
                en
            }
            phone
            fax
            email
            website
            description {
                ru
                en
            }
        }
    }
`