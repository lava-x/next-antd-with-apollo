import gql from "graphql-tag";
import { fragmentUserBasic } from "graphql/fragments/User";

export const GET_PROFILE = gql`
  query profile {
    profile {
      ...fragmentUserBasic
    }
  }
  ${fragmentUserBasic}
`;

export default {
  GET_PROFILE
};
