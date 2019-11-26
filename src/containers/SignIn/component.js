import React, { PureComponent } from "react";
import { Form, Input, Button } from "antd";

import Spinner from "components/Spinner";

import styles from "./styles";

const { Password } = Input;

class SignIn extends PureComponent {
  constructor() {
    super();
    this.state = {
      loading: false,
      countryCode: "",
      phoneNumber: ""
    };
  }

  onFormSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        const { password } = values;
        const { countryCode, phoneNumber } = this.state;
        if (!this.props.signInWithMobile) return;
        await this.props.signInWithMobile({
          variables: {
            countryCode: parseInt(countryCode, 10),
            phoneNumber: parseInt(phoneNumber, 10),
            password
          }
        });
      }
    });
  };

  render() {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    return (
      <>
        <Spinner
          className="sign-in-container"
          fullscreen
          spinning={this.state.loading}
        >
          <Form hideRequiredMark onSubmit={this.onFormSubmit}>
            <h1>Sign In</h1>
            <div className="mt20">
              <Form.Item>
                {getFieldDecorator("email", {
                  rules: [
                    {
                      required: true,
                      message: "Email is required."
                    }
                  ]
                })(<Input size="large" placeholder="Email" />)}
              </Form.Item>
            </div>
            <Form.Item>
              {getFieldDecorator("password", {
                rules: [
                  {
                    required: true,
                    message: "Password is required."
                  },
                  { validator: this.validatePassword }
                ]
              })(<Password size="large" placeholder="Password" />)}
            </Form.Item>
            <Button
              type="primary"
              size="large"
              block
              htmlType="submit"
              className="x-large mt20 text-white"
            >
              Sign In
            </Button>
          </Form>
        </Spinner>
        <style jsx>{styles}</style>
      </>
    );
  }
}

const SignInContainer = Form.create({ name: "signInForm" })(SignIn);
export default SignInContainer;
