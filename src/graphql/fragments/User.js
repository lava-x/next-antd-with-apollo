import gql from "graphql-tag";

export const fragmentUser = gql`
  fragment fragmentUser on User {
    id
    firstName
    lastName
    username
    email
  }
`;

export default fragmentUser;
