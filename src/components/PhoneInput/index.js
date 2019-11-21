import React, { Component } from "react";
import ReactPhoneInput from "react-phone-input-2";

import styles from "./styles";

class PhoneInputComponent extends Component {
  handleOnChange = (value, data) => {
    if (this.props.handleOnChange) {
      const countryCode = data.dialCode;
      const phoneNumber = value
        .replace(/[^0-9]+/g, "")
        .slice(data.dialCode.length);
      this.props.handleOnChange(
        value,
        parseInt(countryCode, 10),
        parseInt(phoneNumber, 10)
      );
    }
  };

  render() {
    const value = this.props.value || "";
    const regions = !!this.props.regions || [
      "america",
      "europe",
      "asia",
      "oceania",
      "africa"
    ];
    const defaultCountry = !!this.props.defaultCountry || "my";
    const disabled = !!this.props.disabled || false;
    return (
      <>
        <ReactPhoneInput
          value={value}
          regions={regions}
          disabled={disabled}
          defaultCountry={defaultCountry}
          onChange={this.handleOnChange}
          placeholder="Mobile Number"
          searchPlaceholder="Mobile Number2"
          containerStyle={{
            borderRadius: "2px",
            width: "100%"
          }}
          inputStyle={{
            border: "none",
            borderRadius: "2px",
            backgroundColor: "rgba(110, 111, 115, 0.5)",
            color: "#ffffff",
            fontSize: "18px",
            height: "50px",
            width: "100%"
          }}
        />
        <style jsx>{styles}</style>
      </>
    );
  }
}

export default PhoneInputComponent;
