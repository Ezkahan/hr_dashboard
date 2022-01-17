import { gql } from '@apollo/client'

export const DELETE_AREA = gql`mutation DeleteArea($id: ID!) { deleteArea(id: $id) }`