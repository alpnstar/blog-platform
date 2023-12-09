import React from "react";
import "./PostItem";
import PostItem from "./PostItem";
import { CSSTransition, TransitionGroup } from "react-transition-group";

const PostList = ({ posts, removePost }) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
      }}
      className="post__list">
      <TransitionGroup>
        {posts.map((item, index, array) => {
          return (
            <CSSTransition
              key={item.id}
              timeout={500}
              classNames="post"
            >
              <PostItem
                data={item}
                removePost={removePost}
                itemKey={index + 1
                } />
            </CSSTransition>
          )
        })}
      </TransitionGroup>

    </div>
  );
};
export default PostList;