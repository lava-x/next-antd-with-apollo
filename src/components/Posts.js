import React, { PureComponent } from 'react';
import Moment from 'react-moment';
import { Card, Button } from 'antd';
import PostVoter from 'components/PostVoter';

const { Meta } = Card;

export default class Posts extends PureComponent {
  render() {
    const {
      posts, meta, loading, onActionVote,
    } = this.props;
    const areMorePosts = posts.length < meta.count;

    return (
      <div className="wrapper">
        <div className="posts-wrapper">
          {posts.map((post) => (
            <div key={post.id} className="post-item">
              <Card
                actions={[
                  <PostVoter
                    id={post.id}
                    votes={post.votes}
                    onActionVote={onActionVote}
                  />,
                ]}
              >
                <Meta
                  title={post.title}
                  description={(
                    <Moment format="do,MMM YYYY hh:mm:ss A">
                      {post.createdAt}
                    </Moment>
                  )}
                />
              </Card>
            </div>
          ))}
        </div>
        {areMorePosts && (
          <div className="loading-wrapper">
            <Button onClick={this.props.onActionLoadMore}>
              {loading ? 'Loading...' : 'Show More'}
            </Button>
          </div>
        )}
        <style jsx>
          {`
          .wrapper {
            width: 100%;
            position: relative;
            padding: 20px 0;

            .loading-wrapper {
              padding: 10px;
              text-align: center;
            }

            .posts-wrapper {
              &::after {
                content: '';
                clear: both;
                display: table;
              }

              .post-item {
                width: 100%;
                margin: 5px;
              }

              @media screen and (min-width: 768px) {
                .post-item {
                  width: calc(33% - 10px);
                  float: left;
                }
              }

              @media screen and (min-width: 1024px) {
                .post-item {
                  width: calc(25% - 10px);
                  float: left;
                }
              }
            }
          }
        `}
        </style>
      </div>
    );
  }
}
