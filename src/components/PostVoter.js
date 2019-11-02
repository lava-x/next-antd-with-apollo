import React from "react";
import PropTypes from "prop-types";
import { Button, Icon } from "antd";

const PostUpvoter = props => {
  const onAction = upvote => () => {
    const { id, votes, onActionVote } = props;
    if (onActionVote) {
      onActionVote(id, upvote ? votes + 1 : votes - 1);
    }
  };
  return (
    <>
      <Button onClick={onAction(false)}>
        <Icon type="down" />
      </Button>
      <strong className="pl10 pr10">{props.votes}</strong>
      <Button onClick={onAction(true)}>
        <Icon type="up" />
      </Button>
    </>
  );
};

PostUpvoter.propTypes = {
  onActionVote: PropTypes.func.isRequired
};

export default PostUpvoter;
