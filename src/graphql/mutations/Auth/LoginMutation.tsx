import * as React from 'react'
import { gql } from '@apollo/client'

export const _LOGIN = gql`
    mutation Login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            id
            name
            email
            token
        }
    }
`