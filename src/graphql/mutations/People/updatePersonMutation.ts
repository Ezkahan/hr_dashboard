import { gql } from '@apollo/client'

export const UPDATE_PERSON = gql`
    mutation UpdatePerson(
        $id: ID!
        $firstname: String!
        $lastname: String!
        $patronymic: String
        $born_date: String
        $nationality_id: ID
        $passport_series_id: ID
        $passport_no: String
        $passport_issue_date: String
        $passport_issued_by_id: ID
        $passport_comment: String
        $gender: String
        $marital: String
        $children: String
        $military: Int
        $sentence: Int
        $dead: Int
        $relocation: Int
        $shift: Int
        $dontdisturb: Int
        $dontdisturb_notes: String
        $vip: Int
        $vip_notes: String
        $blacklist: Int
        $blacklist_notes: String
        $min_salary: String
        $salary_currency: String
        $description_ru: String
        $description_en: String
    ) {
        updatePerson(
            id: $id,
            firstname: $firstname 
            lastname: $lastname 
            patronymic: $patronymic 
            born_date: $born_date 
            nationality_id: $nationality_id 
            passport_series_id: $passport_series_id 
            passport_no: $passport_no 
            passport_issue_date: $passport_issue_date 
            passport_issued_by_id: $passport_issued_by_id 
            passport_comment: $passport_comment 
            gender: $gender 
            marital: $marital 
            children: $children
            military: $military
            sentence: $sentence
            dead: $dead
            relocation: $relocation
            shift: $shift
            dontdisturb: $dontdisturb
            vip: $vip
            blacklist: $blacklist
            min_salary: $min_salary
            salary_currency: $salary_currency
            dontdisturb_notes: $dontdisturb_notes
            vip_notes: $vip_notes
            blacklist_notes: $blacklist_notes
            description_ru: $description_ru
            description_en: $description_en
        ) {
            id
        }
    }
`