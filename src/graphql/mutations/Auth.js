import gql from "graphql-tag";

import { fragmentUser } from "graphql/fragments/User";

export const SIGNIN = gql`
  mutation signin($countryCode: Int!, $phoneNumber: Int!, $password: String!) {
    signin(
      countryCode: $countryCode
      phoneNumber: $phoneNumber
      password: $password
    ) {
      token
      user {
        ...fragmentUser
      }
    }
  }
  ${fragmentUser}
`;

export default {
  SIGNIN
};
