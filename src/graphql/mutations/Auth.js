import gql from "graphql-tag";

import { fragmentUser } from "graphql/fragments/User";

export const SIGNIN = gql`
  mutation signin($email: String!, $password: String!) {
    signin(email: $email, password: $password) {
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
