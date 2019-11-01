import React, { Component } from 'react';
// import Link from 'next/link';
import { Link } from 'i18next';
import ActiveLink from 'components/ActiveLink';
import LogoDark from 'assets/Logo.svg';
import styles from './styles';

class Header extends Component {
  render() {
    return (
      <>
        <nav className="navbar">
          <div className="container">
            <div className="navbar-brand">
              <Link href="/">
                <a className="navbar-item">
                  <img
                    src={LogoDark}
                    alt="LavaX Technologies Sdn Bhd"
                    width="112"
                    height="28"
                  />
                </a>
              </Link>
              <div className="navbar-burger burger">
                <span />
                <span />
                <span />
              </div>
            </div>
            <div className="navbar-menu">
              <div className="navbar-end">
                <ActiveLink
                  href="/todo"
                  activeClass="active"
                  className="navbar-item"
                  alt="Todo"
                  title="Todo"
                />
                <ActiveLink
                  href="/test"
                  activeClass="active"
                  className="navbar-item"
                  alt="test page"
                  title="Test Page"
                />
                <ActiveLink
                  href="/translate"
                  activeClass="active"
                  className="navbar-item"
                  alt="Translate page"
                  title="Translate Page"
                />
              </div>
            </div>
          </div>
        </nav>
        <style jsx>{styles}</style>
      </>
    );
  }
}

export default Header;
