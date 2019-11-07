import gql from "graphql-tag";

export const GET_PROFILE = gql`
  query profile {
    profile {
      id
      avatar
      firstName
      lastName
      username
      email
      roles
      verified
      createdAt
      updatedAt
    }
  }
`;

export default {
  GET_PROFILE
};
