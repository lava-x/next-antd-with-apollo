import _ from "lodash";
import redirect from "config/redirect";

export const SIGN_IN_PATH = "/signin";

// path accessible by public
// by default, this works as a whitelist.
// everything else that is not listed here will not be accessible by the public
export const publicPaths = ["/", "/faq", "/terms"];

// restricted path that can't be accessed if user has signed in
export const restrictPathsAfterAuth = [SIGN_IN_PATH, "/signup"];

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
  const paths = _.concat(publicPaths, restrictPathsAfterAuth);
  return !checkIsPathMatchesAny(paths, path);
};

export default (context, authUser) => {
  const { asPath, pathname } = context;
  const navigatingToPaths = [asPath, pathname];

  const config = {};
  const defaultPathIfAlreadySignIn = "/account";

  if (pathname === "/_error") {
    // eslint-disable-next-line
    console.log("page not found:", asPath);
    return config;
  }

  if (authUser) {
    // you can do things like checking user roles
    // and see if they are trying to navigate somewhere else
    const isNotAdmin = true; // authUser.roles;
    const pathsForAdmin = ["/admin"];
    if (isNotAdmin && checkIsPathMatchesAny(navigatingToPaths, pathsForAdmin)) {
      redirect(context, defaultPathIfAlreadySignIn);
      return config;
    }

    // you can also do things to check on user onboarding states
    // and ensure they have to go through the onboarding before doing anything else
    const requireOnboarding = true; // authUser.setupIsRequired OR authUser.onboardingStatus
    const pathForOnboarding = "/onboard";
    if (
      requireOnboarding &&
      checkIsPathMatchesAny(navigatingToPaths, [pathForOnboarding])
    ) {
      redirect(context, pathForOnboarding);
      return config;
    }

    // always redirect user goes to account whenever user try to access path that is forbidden or restricted
    const isRestrictPathForAuth = checkIsPathMatchesAny(
      restrictPathsAfterAuth,
      navigatingToPaths
    );
    if (isRestrictPathForAuth) {
      // eslint-disable-next-line
      console.log("===== isAtRestrictPath ");
      redirect(context, defaultPathIfAlreadySignIn);
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
