import gql from "graphql-tag";

const UPVOTE_POST = gql`
  mutation updatePost($id: ID!, $votes: Int) {
    updatePost(id: $id, votes: $votes) {
      id
      __typename
      votes
    }
  }
`;

export default {
  UPVOTE_POST
};
