import gql from "graphql-tag";
import { fragmentUser } from "graphql/fragments/User";

export const GET_PROFILE = gql`
  query profile {
    profile {
      ...fragmentUser
    }
  }
  ${fragmentUser}
`;

export default {
  GET_PROFILE
};
