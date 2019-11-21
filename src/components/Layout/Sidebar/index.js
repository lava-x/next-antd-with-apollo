import React, { Component } from "react";
import _ from "lodash";
import classnames from "classnames";
import { Menu, Icon, Button, Layout } from "antd";
import redirect from "config/redirect";

import Header from "components/Layout/Header";
import { menus } from "./settings";
import styles from "./styles";

const { Sider, Content } = Layout;

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: true
    };
  }

  // ========================= EVENTS
  onToggleSider = () => {
    this.setState(prevState => ({
      collapsed: !prevState.collapsed
    }));
  };

  linkTo = e => {
    const hasBusinessProfile = this.hasBusinessProfile();
    const { businessProfile } = this.props;
    if (e.as) {
      if (hasBusinessProfile) {
        redirect({}, e.as(businessProfile.id));
      } else {
        redirect({}, "/");
      }
      return;
    }
    redirect({}, e.path);
  };

  // ========================= HELPER
  hasConfig = () => {
    const { config } = this.props;
    return !_.isNil(config);
  };

  shouldHideLayout = () => {
    const { config } = this.props;
    return this.hasConfig() && config.shouldHideLayout;
  };

  isBusiness = () => {
    const { config } = this.props;
    return this.hasConfig() && config.isBusiness;
  };

  getMenus = () => {
    const isBusiness = this.isBusiness();
    return isBusiness ? menus.business : menus.user;
  };

  getSelectedMenuFromPath = () => {
    const { asPath } = this.props.router;
    const { pathname } = this.props.router;
    const isWithin = _.filter(this.getMenus(), o => {
      return _.includes(o.includes, asPath) || _.includes(o.includes, pathname);
    });
    if (!!isWithin && isWithin.length > 0) {
      return _.map(isWithin, o => o.key);
    }
    if (this.isBusiness()) {
      return ["dashboard"];
    }
    return ["home"];
  };

  hasBusinessProfile = () => {
    const { businessProfile } = this.props;
    return !_.isNil(businessProfile);
  };

  // ========================= VIEW
  render() {
    const { children, ...restProps } = this.props;
    const { collapsed } = this.state;
    const shouldHideLayout = this.shouldHideLayout();

    const selectedMenus = this.getMenus();

    const childrenWithProps = React.Children.map(children, child => {
      if (!child || typeof child === "boolean") {
        return null;
      }
      return React.cloneElement(child, {
        sider: !shouldHideLayout,
        collapsed: !shouldHideLayout && collapsed
      });
    });

    return (
      <Layout className="ts-layout-with-sider" hasSider={!shouldHideLayout}>
        {!shouldHideLayout && (
          <Sider
            className="ts-sider-wrapper"
            collapsedWidth={80}
            trigger={null}
            collapsible
            collapsed={collapsed}
            defaultCollapsed
          >
            <div className="full-height flex-vertical-center">
              <Menu
                mode="inline"
                theme="theme"
                defaultSelectedKeys={this.getSelectedMenuFromPath()}
              >
                {_.map(selectedMenus, e => {
                  return (
                    <Menu.Item key={e.key} onClick={() => this.linkTo(e)}>
                      {e.icon}
                      <span>{e.title}</span>
                    </Menu.Item>
                  );
                })}
              </Menu>
              <Button
                className={classnames("sider-trigger", {
                  "is-collapsed": collapsed
                })}
                type="link"
                onClick={this.onToggleSider}
              >
                <Icon type="menu" />
              </Button>
            </div>
          </Sider>
        )}
        <Layout
          className={classnames("ts-content-wrapper", {
            sider: !shouldHideLayout,
            collapsed: !shouldHideLayout && collapsed
          })}
        >
          {!shouldHideLayout && <Header {...restProps} />}
          <Content>{childrenWithProps}</Content>
        </Layout>

        <style jsx>{styles}</style>
      </Layout>
    );
  }
}

export default Sidebar;
