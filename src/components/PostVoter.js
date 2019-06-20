import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Button, Icon } from 'antd';

const PostUpvoter = (props) => {
  const onActionVote = (upvote) => {
    return () => {
      const { id, votes, onActionVote } = props;
      if (!!onActionVote) {
        onActionVote(id, upvote ? votes + 1 : votes - 1);
      }
    };
  };
  return (
    <Fragment>
      <Button onClick={onActionVote(false)}>
        <Icon type="down" />
      </Button>
      <strong className="pl10 pr10">{props.votes}</strong>
      <Button onClick={onActionVote(true)}>
        <Icon type="up" />
      </Button>
    </Fragment>
  );
};

PostUpvoter.propTypes = {
  onActionVote: PropTypes.func.isRequired,
};

export default PostUpvoter;
