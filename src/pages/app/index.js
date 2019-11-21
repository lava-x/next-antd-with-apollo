import { Component } from "react";
import redirect from "config/redirect";

class Index extends Component {
  static getInitialProps(context) {
    redirect(context.ctx, "/admin/post");
  }

  render() {
    return null;
  }
}

export default Index;
