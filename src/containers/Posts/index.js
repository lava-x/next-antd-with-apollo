import { mutations, queries } from "graphql";
import { graphql } from "@apollo/react-hoc";
import { flowRight as compose } from "lodash";
import Component from "./component";

export default Component;

/**
export default compose(
  graphql(queries.Post.GET_ALL_POST, {
    // props: (results) => {
    //   console.log('mapResultsToProps ----->', results);
    //   const { data } = results;
    //   return data;
    // },
    options: {
      variables: {
        skip: 0,
        first: 10
      }
    }
  }),
  graphql(mutations.Post.UPVOTE_POST, {
    // props: (results) => {
    //   console.log('mapResultsToProps ----->', results);
    //   const { data } = results;
    //   return data;
    // },
  })
)(Component);
 */
