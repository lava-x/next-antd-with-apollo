import gql from "graphql-tag";

export const fragmentUserBasic = gql`
  fragment fragmentUserBasic on UserWithBasicInfo {
    id
    phoneNumber
    firstName
    lastName
    username
    email
    avatar
    isAdmin
  }
`;

export default fragmentUserBasic;
