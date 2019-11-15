import React, { Component } from "react";
import Link from "next/link";
import _ from "lodash";
import classnames from "classnames";
import { Dropdown, Menu, Icon, Button, Avatar } from "antd";
import LogoDark from "assets/Logo.svg";
import styles from "./styles";

class Header extends Component {
  onHandleMenuClick = e => {
    switch (e.key) {
      case "signout": {
        this.props.onActionSignOut();
        break;
      }
      default:
        break;
    }
  };

  render() {
    const { authUser, mode } = this.props;
    // if there is default avatar, can replace the null to image link
    const avatar = authUser && authUser.avatar ? authUser.avatar : null;
    // To check if there is first Name and Last Name for that User
    // U may replace the entry for your authUser firstname and lastname
    const hasAuthUser = !_.isEmpty(authUser);
    const hasFirstName = hasAuthUser && !_.isEmpty(authUser.firstName);
    const hasLastName = hasAuthUser && !_.isEmpty(authUser.lastName);

    const menu = (
      <Menu onClick={this.onHandleMenuClick}>
        <Menu.Item key="signout">
          <Icon type="logout" />
          Signout
        </Menu.Item>
        <style jsx>{styles}</style>
      </Menu>
    );

    return (
      <div className="ts-layout-header clearfix">
        <div
          className={classnames("logo", { "text-center": mode === "desktop" })}
          span={22}
        >
          <img
            src={LogoDark}
            alt="LavaX Technologies Sdn Bhd"
            width="112"
            height="28"
          />
        </div>

        <div className="header-actions">
          {authUser ? (
            <Dropdown trigger={["click"]} overlay={menu}>
              <a className="d-inline-block">
                <Avatar src={avatar} size={40} />
                <span className="d-inline-block ml10">
                  {hasFirstName ? authUser.firstName : "Admin"}{" "}
                  {hasLastName ? authUser.lastName : null}
                </span>
              </a>
            </Dropdown>
          ) : (
            <Link href="/signin">
              <Button type="primary">Sign In</Button>
            </Link>
          )}
        </div>
        <style jsx>{styles}</style>
      </div>
    );
  }
}

export default Header;
