import React, { PureComponent } from "react";
import { Result, Button } from "antd";
import Link from "next/link";
import styles from "./styles";

class ErrorScreen extends PureComponent {
  getMessage = () => {
    const { statusCode } = this.props;
    switch (statusCode) {
      case 403:
        return "Sorry, you are not authorized to access this page.";
      case 404:
        return "Sorry, the page you visited does not exist.";
      case 500:
        return "The server is wrong.";
      default:
        return "There are some problems with your operation.";
    }
  };

  renderResult() {
    const { statusCode } = this.props;
    if (!statusCode) {
      return (
        <Result
          status="warning"
          title="There are some problems with your operation."
          extra={
            <Link href="/">
              <Button shape="round" size="large" type="primary">
                Back Home
              </Button>
            </Link>
          }
        />
      );
    }
    const message = this.getMessage();
    return (
      <Result
        status={`${statusCode}`}
        title={statusCode}
        subTitle={message}
        extra={
          <Link href="/">
            <Button shape="round" size="large" type="primary">
              Back Home
            </Button>
          </Link>
        }
      />
    );
  }

  render() {
    return (
      <>
        <div className="error-screen full-height-min flex-vertical-center">
          {this.renderResult()}
        </div>
        <style jsx>{styles}</style>
      </>
    );
  }
}

export default ErrorScreen;
