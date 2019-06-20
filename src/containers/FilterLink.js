import { compose, graphql } from 'react-apollo';
import { queries, mutations } from 'graphql';
import Link from 'components/Link';

const { GET_FILTER } = queries.Todos;
const { SET_TODO_FILTER } = mutations.Todos;

const withActiveState = graphql(GET_FILTER, {
  props: ({ ownProps, data }) => ({
    active: ownProps.filter === data.visibilityFilter,
  }),
});

const withVisibilityFilter = graphql(SET_TODO_FILTER, {
  props: ({ mutate, ownProps }) => ({
    onClick: () => mutate({ variables: { filter: ownProps.filter } }),
  }),
});

export default compose(
  withVisibilityFilter,
  withActiveState
)(Link);
