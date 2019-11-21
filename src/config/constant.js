// graphql
export const GRAPHQL_ENDPOINT =
  //  for Post api
  // "https://api.graph.cool/simple/v1/cixmkt2ul01q00122mksg82pn";
  // for graphql is
  "http://localhost:4000/graphql";

// default path after login
export const DEFAULT_PATH_AFTER_SIGN_IN = "/Admin";

// path for login page
export const SIGN_IN_PATH = "/signin";

// onboarding path
export const ONBOARDING_PATH = "/onboard";

// path accessible by public
// by default, this works as a whitelist.
// everything else that is not listed here will not be accessible by the public
export const PATHS_ONLY_ALLOWED_BEFORE_AUTH = ["/", SIGN_IN_PATH];

// restricted path that can't be accessed if user has already signed in
export const PATHS_NOT_ALLOWED_AFTER_AUTH = ["/", SIGN_IN_PATH];

export const PATHS_FOR_ADMIN_ONLY = ["/Admin"];

export const NO_LAYOUT_PATH = ["/", SIGN_IN_PATH];
