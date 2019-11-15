import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Modal } from 'antd';
import _ from 'lodash';
import styles from './styles';

class Dialog extends Component {
  static propTypes = {
    children: PropTypes.node,
    options: PropTypes.shape({
      onDialogPop: PropTypes.func,
      onDialogDismiss: PropTypes.func,
      onDialogCancel: PropTypes.func,
    }),
  };

  constructor(props) {
    super(props);
    this.state = {
      visibility: false,
    };
  }

  // ------------------------------------ LIFECYCLE
  componentDidMount() {
    if (this.props.onRef) {
      this.props.onRef(this);
    }
  }

  componentWillUnmount() {
    if (this.props.onRef) {
      this.props.onRef(undefined);
    }
  }

  // ------------------------------------ EVENTS
  onDialogPop = () => {
    const options = this.props.options;
    if (options && options.onDialogPop) {
      options.onDialogPop();
    }
    this.setState({
      visibility: true,
    });
  };

  onDialogDismiss = () => {
    const options = this.props.options;
    if (options && options.onDialogDismiss) {
      options.onDialogDismiss();
    }
    this.setState({
      visibility: false,
    });
  };

  onDialogCancel = (e) => {
    const options = this.props.options;
    if (options && options.onDialogCancel) {
      options.onDialogCancel();
    }
    this.setState({
      visibility: false,
    });
  };

  // ------------------------------------ RENDER
  render() {
    const { visibility } = this.state;
    const {
      className,
      children,
      closable,
      maskClosable,
      ...restProps
    } = this.props;
    const newProps = Object.assign({}, restProps);
    delete newProps.options;
    delete newProps.onRef;
    return (
      <Fragment>
        <Modal
          {...newProps}
          footer={null}
          visible={visibility}
          onCancel={this.onDialogCancel}
          closable={
            _.isNull(closable) || _.isUndefined(closable) ? true : closable
          }
          maskClosable={
            _.isNull(maskClosable) || _.isUndefined(maskClosable)
              ? true
              : maskClosable
          }
          wrapClassName={classNames('dialog-wrapper', className)}
        >
          {children}
        </Modal>
        <style jsx>{styles}</style>
      </Fragment>
    );
  }
}

export default Dialog;
