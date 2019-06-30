import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { SiderMenuProps, defaultRenderLogo } from '../SiderMenu/SiderMenu';
import BaseMenu from '../SiderMenu/BaseMenu';
import { getFlatMenuKeys } from '../SiderMenu/SiderMenuUtils';
import './styles.less';

export default class TopNavHeader extends Component {
  static propTypes = {
    logo: PropTypes.node,
    onCollapse: PropTypes.func,
    rightContentRender: PropTypes.func,
  };

  static getDerivedStateFromProps(props) {
    const { contentWidth } = props;
    return {
      maxWidth:
        (contentWidth === 'Fixed' && window.innerWidth > 1200
          ? 1200
          : window.innerWidth) -
        280 -
        120 -
        40,
    };
  }

  state = {};

  maim = null;

  render() {
    const {
      theme,
      menuData,
      logo,
      title,
      contentWidth,
      rightContentRender,
    } = this.props;
    const { maxWidth } = this.state;
    const flatMenuKeys = getFlatMenuKeys(menuData);
    const baseClassName = 'ant-pro-top-nav-header';
    return (
      <div className={`${baseClassName} ${theme === 'light' ? 'light' : ''}`}>
        <div
          ref={(ref) => {
            this.maim = ref;
          }}
          className={`${baseClassName}-main ${
            contentWidth === 'Fixed' ? 'wide' : ''
          }`}
        >
          <div className={`${baseClassName}-left`}>
            <div className={`${baseClassName}-logo`} key="logo" id="logo">
              <a>
                {defaultRenderLogo(logo)}
                <h1>{title}</h1>
              </a>
            </div>
          </div>
          <div
            style={{ maxWidth, flex: 1 }}
            className={`${baseClassName}-menu`}
          >
            <BaseMenu {...this.props} flatMenuKeys={flatMenuKeys} />
          </div>
          {rightContentRender &&
            rightContentRender({
              ...this.props,
            })}
        </div>
      </div>
    );
  }
}
