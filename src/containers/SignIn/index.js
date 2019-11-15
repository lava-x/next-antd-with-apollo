import { flowRight as compose } from "lodash";
import { graphql, withApollo } from "@apollo/react-hoc";
import { mutations } from "graphql";
import redirect from "config/redirect";
import Notification from "components/Notification";
import { setAuthToken } from "config/withAuthSync";
import { DEFAULT_PATH_AFTER_SIGN_IN } from "config/constant";
import SignInContainer from "./component";

const ComposedSignIn = compose(
  withApollo,
  graphql(mutations.Auth.SIGNIN, {
    name: "signInWithMobile",
    options: props => ({
      onCompleted: data => {
        const { client: apolloClient } = props;
        const { token } = data.signin;
        apolloClient.cache.reset().then(() => {
          setAuthToken(token);
          redirect({}, DEFAULT_PATH_AFTER_SIGN_IN, "force-reload");
        });
        Notification({
          duration: 5,
          type: "success",
          message: "Sign in successful!"
        });
      },
      onError: () => {
        Notification({
          duration: 5,
          type: "error",
          message: `Failed to sign in`
        });
      }
    })
  })
)(SignInContainer);

export default ComposedSignIn;
