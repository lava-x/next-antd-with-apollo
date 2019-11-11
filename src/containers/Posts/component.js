import React from "react";
import { mutations, queries } from "graphql";
import { useMutation, useQuery } from "@apollo/react-hooks";
import ErrorMessage from "components/Error";
import Posts from "components/Posts";

const onActionLoadMore = (allPosts, fetchMore) => () => {
  fetchMore({
    variables: {
      skip: allPosts.length
    },
    updateQuery: (previousResult, { fetchMoreResult }) => {
      if (!fetchMoreResult) {
        return previousResult;
      }
      return {
        ...previousResult, // Append the new posts results to the old one
        allPosts: [...previousResult.allPosts, ...fetchMoreResult.allPosts]
      };
    }
  });
};

const onActionVote = updatePost => (id, votes) => {
  updatePost({
    variables: { id, votes },
    optimisticResponse: {
      __typename: "Mutation",
      updatePost: {
        __typename: "Post",
        id,
        votes
      }
    }
  });
};

const PostsContainer = () => {
  const { data, loading, error } = useQuery(queries.Post.GET_ALL_POST, {
    variables: {
      skip: 0,
      first: 10
    }
  });
  const [updatePost /* { loading, error } */] = useMutation(
    mutations.Post.UPVOTE_POST
  );

  if (error) return <ErrorMessage message="Error loading posts." />;
  if (loading) return <div>Loading</div>;

  const { allPosts, _allPostsMeta, fetchMore } = data;

  return (
    <Posts
      posts={allPosts}
      meta={_allPostsMeta}
      loading={loading}
      onActionLoadMore={onActionLoadMore(allPosts, fetchMore)}
      onActionVote={onActionVote(updatePost)}
    />
  );
};

export default PostsContainer;
