import { gql } from '@apollo/client'

export const GET_PERSON = gql`
    query GetPerson($id: ID!) {
        person(id: $id) {
            id
            firstname
            lastname
            patronymic
            registered_at
            passportSeries {
                id
            }
            passport_no
            passport_issue_date
            passportIssuedBy {
                id
                name
            }
            passport_comment
            born_date
            educationType {
                id
                name {
                    ru
                    en
                }
            }
            marital
            children
            driver_classes
            military
            sentence
            dead
            gender
            relocation
            shift
            dontdisturb
            dontdisturb_notes
            vip
            vip_notes
            blacklist
            blacklist_notes
            status_comment
            hascar
            nationality {
                id
                name {
                    ru
                    en
                }
            }
            min_salary
            salary_currency
            description {
                    ru
                    en
                }
            email
            phone
            status
            created_at
            updated_at
            skills {
                id
                pivot {
                    level
                }
                name {
                    ru
                    en
                }
                skillType {
                    id
                    name {
                        ru
                        en
                    }
                }
            }
        }

        passportSeries {
            id
            name
        }

        nationality {
            id
            name {
                ru
                en
            }
        }
    }
`