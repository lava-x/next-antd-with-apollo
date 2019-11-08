import _ from "lodash";
import redirect from "config/redirect";
import {
  SIGN_IN_PATH,
  ONBOARDING_PATH,
  DEFAULT_PATH_AFTER_SIGN_IN,
  PATHS_ONLY_ALLOWED_BEFORE_AUTH,
  PATHS_NOT_ALLOWED_AFTER_AUTH,
  PATHS_FOR_ADMIN_ONLY
} from "config/constant";

export const checkIsPathMatchesAny = (paths, checkPaths, partial = false) => {
  const results = _.filter(paths, e => {
    if (_.isString(checkPaths)) {
      if (partial) return _.includes(e, checkPaths);
      return e === checkPaths;
    }
    return _.some(checkPaths, o => {
      if (partial) return _.includes(e, o);
      return e === o;
    });
  });
  return results.length > 0;
};

export const restrictPathBeforeAuth = path => {
  const paths = _.concat(
    PATHS_ONLY_ALLOWED_BEFORE_AUTH,
    PATHS_NOT_ALLOWED_AFTER_AUTH
  );
  return !checkIsPathMatchesAny(paths, path);
};

export default (context, authUser) => {
  const { asPath, pathname } = context;
  const navigatingToPaths = [asPath, pathname];

  const config = {};

  if (pathname === "/_error") {
    // eslint-disable-next-line
    console.log("page not found:", asPath);
    return config;
  }

  if (authUser) {
    // you can do things like checking user roles
    // and see if they are trying to navigate somewhere else
    const isNotAdmin = true; // authUser.roles;
    if (
      isNotAdmin &&
      checkIsPathMatchesAny(navigatingToPaths, PATHS_FOR_ADMIN_ONLY)
    ) {
      redirect(context, DEFAULT_PATH_AFTER_SIGN_IN);
      return config;
    }

    // you can also do things to check on user onboarding states
    // and ensure they have to go through the onboarding before doing anything else
    const requireOnboarding = true; // authUser.setupIsRequired OR authUser.onboardingStatus
    if (
      requireOnboarding &&
      checkIsPathMatchesAny(navigatingToPaths, [ONBOARDING_PATH])
    ) {
      redirect(context, ONBOARDING_PATH);
      return config;
    }

    // always redirect user goes to account whenever user try to access path that is forbidden or restricted
    const isRestrictPathForAuth = checkIsPathMatchesAny(
      PATHS_NOT_ALLOWED_AFTER_AUTH,
      navigatingToPaths
    );
    if (isRestrictPathForAuth) {
      // eslint-disable-next-line
      console.log("===== isAtRestrictPath ");
      redirect(context, DEFAULT_PATH_AFTER_SIGN_IN);
    }
    return config;
  }

  // always redirect user to signin whenever user access path that is required signin or restricted
  // eslint-disable-next-line
  console.log("********* check paths: ", navigatingToPaths);
  const isRestrictBeforeAuth = restrictPathBeforeAuth(navigatingToPaths);
  if (isRestrictBeforeAuth) {
    // eslint-disable-next-line
    console.log("===== isRestrictBeforeAuth ");
    redirect(context, SIGN_IN_PATH);
    return config;
  }

  // allow user to access path if passed all condition above
  // eslint-disable-next-line
  console.log("===== nothingForAuth ");
  return config;
};
