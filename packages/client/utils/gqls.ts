import { gql } from '@apollo/client';

export const FIND_DBS_NAME = gql`
  query findDbsName {
    findDbs {
      dbs {
        name
      }
    }
  }
`;
