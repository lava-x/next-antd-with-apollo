import _ from "lodash";
import Router from "next/router";

export default (context, target, method = "replace") => {
  if (context.res) {
    // server
    // 303: "See other"
    context.res.writeHead(303, { Location: target });
    context.res.end();
  } else {
    if (method === "hard-reload") {
      window.location.href = target;
      return;
    }

    // "next/router" supported methods
    if (!_.includes(["replace", "push"], method)) {
      // eslint-disable-next-line
      console.error("redirect method not valid!");
      return;
    }
    // In the browser, we just pretend like this never even happened ;)
    Router[method](target);
  }
};
