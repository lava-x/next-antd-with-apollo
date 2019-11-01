import React, { PureComponent } from 'react';
import Posts from 'containers/Posts';
import styles from './styles';

export default class Home extends PureComponent {
  render() {
    return (
      <div className="home full-height-min flex-vertical-center">
        <Posts />
        <style jsx>{styles}</style>
      </div>
    );
  }
}
