import { gql } from '@apollo/client'

export const GET_AREA_LIST = gql`
query GetAreaList {
    areaList(orderBy: [{column: ID, order: DESC}]) {
        id
        name {
            ru
            en
        }
    }
}
`;