import React, { PureComponent } from "react";
import { Form, Input, Button } from "antd";

import PhoneInputComponent from "components/PhoneInput";
import Spinner from "components/Spinner";

import { validatePhoneInputLength } from "helpers/validations";
import styles from "./styles";

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

  handleOnChange = (value, countryCode, phoneNumber) => {
    this.props.form.setFieldsValue({
      contactNo: value
    });
    this.setState({
      countryCode,
      phoneNumber
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
                {getFieldDecorator("contactNo", {
                  rules: [
                    {
                      required: true,
                      message: "Phone number is required."
                    },
                    {
                      validator: validatePhoneInputLength(this.props.form)
                    }
                  ]
                })(
                  <PhoneInputComponent handleOnChange={this.handleOnChange} />
                )}
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
              })(<Input size="large" type="password" placeholder="Password" />)}
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
