import { queries } from "graphql";

export default apolloClient =>
  apolloClient
    .query({
      query: queries.User.GET_PROFILE
    })
    .then(({ data }) => {
      return { authUser: data.profile };
    })
    .catch(() => {
      // Fail gracefully
      return { authUser: null };
    });
