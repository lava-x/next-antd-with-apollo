import React, { PureComponent } from 'react';
import { Query } from 'react-apollo';
import ErrorMessage from 'components/Error';
import Posts from 'components/Posts';

export default class PostsContainer extends PureComponent {
  // ======================= EVENT
  onActionLoadMore = (allPosts, fetchMore) => {
    return () => {
      fetchMore({
        variables: {
          skip: allPosts.length,
        },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          if (!fetchMoreResult) {
            return previousResult;
          }
          return Object.assign({}, previousResult, {
            // Append the new posts results to the old one
            allPosts: [...previousResult.allPosts, ...fetchMoreResult.allPosts],
          });
        },
      });
    };
  };

  onActionVote = (id, votes) => {
    this.props.mutate({
      variables: { id, votes },
      optimisticResponse: {
        __typename: 'Mutation',
        updatePost: {
          __typename: 'Post',
          id,
          votes: votes,
        },
      },
    });
  };

  // ======================= RENDER
  render() {
    const {
      data: { loading, error, allPosts, _allPostsMeta, fetchMore },
    } = this.props;
    if (error) return <ErrorMessage message="Error loading posts." />;
    if (loading) return <div>Loading</div>;
    return (
      <Posts
        posts={allPosts}
        meta={_allPostsMeta}
        loading={loading}
        onActionLoadMore={this.onActionLoadMore(allPosts, fetchMore)}
        onActionVote={this.onActionVote}
      />
    );
  }
}
