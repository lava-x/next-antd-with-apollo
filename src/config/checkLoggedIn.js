import { queries } from "graphql";

export default apolloClient =>
  apolloClient
    .query({
      query: queries.User.GET_PROFILE
    })
    .then(({ data }) => {
      const profile = data.profile && data.profile.id ? data.profile : null;
      return { authUser: profile };
    })
    .catch(() => {
      // Fail gracefully
      return { authUser: null };
    });
