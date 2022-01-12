import { gql } from '@apollo/client'

export const CREATE_COMPANY = gql`
    mutation CreateCompany(
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
        createCompany(
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
            name
            phone
            fax
            email
            website
            description
        }
    }
`