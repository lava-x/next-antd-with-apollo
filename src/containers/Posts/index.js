import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import Component from './component';

const GET_ALL_POST = gql`
  query allPosts($first: Int!, $skip: Int!) {
    allPosts(orderBy: createdAt_DESC, first: $first, skip: $skip) {
      id
      title
      votes
      url
      createdAt
    }
    _allPostsMeta {
      count
    }
  }
`;

const UPVOTE_POST = gql`
  mutation updatePost($id: ID!, $votes: Int) {
    updatePost(id: $id, votes: $votes) {
      id
      __typename
      votes
    }
  }
`;
export default compose(
  graphql(GET_ALL_POST, {
    // props: (results) => {
    //   console.log('mapResultsToProps ----->', results);
    //   const { data } = results;
    //   return data;
    // },
    options: {
      variables: {
        skip: 0,
        first: 10,
      },
    },
  }),
  graphql(UPVOTE_POST, {
    // props: (results) => {
    //   console.log('mapResultsToProps ----->', results);
    //   const { data } = results;
    //   return data;
    // },
  })
)(Component);
