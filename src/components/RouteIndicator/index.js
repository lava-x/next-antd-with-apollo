import React from "react";
import Router from "next/router";
import styles from "./styles";

const DONE_DURATION = 250;

// https://gist.github.com/jaydenseric/15a61ecfe3b52599409787c33fcfe9da
const RouteIndicator = () => {
  const [loading, setLoading] = React.useState(null);
  const [timeoutId, setTimeoutId] = React.useState(null);

  const onLoad = () => setLoading(true);
  const onDone = () => {
    setLoading(false);
    setTimeoutId(
      setTimeout(() => {
        setTimeoutId(null);
        setLoading(null);
      }, DONE_DURATION)
    );
  };

  React.useEffect(() => {
    Router.events.on("routeChangeStart", onLoad);
    Router.events.on("routeChangeComplete", onDone);
    Router.events.on("routeChangeError", onDone);

    return () => {
      Router.events.off("routeChangeStart", onLoad);
      Router.events.off("routeChangeComplete", onDone);
      Router.events.off("routeChangeError", onDone);
    };
  });

  React.useEffect(
    () => () => {
      if (timeoutId) clearTimeout(timeoutId);
    },
    [timeoutId]
  );

  // const loading = true;
  const loadingStringState = loading ? "loading" : "done";
  const classNameString = loading === null ? "" : loadingStringState;

  return (
    <div className={classNameString}>
      <style jsx>{styles}</style>
    </div>
  );
};

export default RouteIndicator;
