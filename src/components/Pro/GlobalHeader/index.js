import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'antd';
import debounce from 'lodash/debounce';
import './styles.less';

export default class GlobalHeader extends Component {
  static propTypes = {
    collapsed: PropTypes.bool,
    onCollapse: PropTypes.func,
    isMobile: PropTypes.bool,
    logo: PropTypes.node,
    rightContentRender: PropTypes.func,
  };

  triggerResizeEvent = debounce(() => {
    const event = document.createEvent('HTMLEvents');
    event.initEvent('resize', true, false);
    window.dispatchEvent(event);
  });

  componentWillUnmount() {
    this.triggerResizeEvent.cancel();
  }

  toggle = () => {
    const { collapsed, onCollapse } = this.props;
    if (onCollapse) onCollapse(!collapsed);
    this.triggerResizeEvent();
  };

  renderLogo = (logo) => {
    if (typeof logo === 'string') {
      return <img src={logo} alt="logo" />;
    }
    if (typeof logo === 'function') {
      return logo();
    }
    return logo;
  };

  render() {
    const { collapsed, isMobile, logo, rightContentRender } = this.props;
    return (
      <div className="ant-pro-global-header">
        {isMobile && (
          <a className="ant-pro-global-header-logo" key="logo">
            {this.renderLogo(logo)}
          </a>
        )}
        <span className="ant-pro-global-header-trigger" onClick={this.toggle}>
          <Icon type={collapsed ? 'menu-unfold' : 'menu-fold'} />
        </span>
        {rightContentRender && rightContentRender(this.props)}
      </div>
    );
  }
}
