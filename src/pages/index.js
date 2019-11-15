import { Component } from "react";
import redirect from "config/redirect";

import { withTranslation } from "i18next";

class Index extends Component {
  componentDidMount() {
    const { authUser } = this.props;
    if (!authUser) {
      redirect({}, "/signin");
    }
  }

  getInitialProps = () => ({
    namespacesRequired: ["common"]
  });

  render() {
    return null;
  }
}

Index.getInitialProps = async () => ({
  namespacesRequired: ["common"]
});

export default withTranslation("common")(Index);
