import React from "react";
import "./PostItem";
import PostItem from "./PostItem";
import {CSSTransition, TransitionGroup} from "react-transition-group";

const PostList = ({posts, removePost}) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
      }}
      className="post__list">
      <TransitionGroup>
          {posts.map((item, index) => {
              return (
            <CSSTransition
              key={item.id}
              timeout={500}
              classNames="post"
            >
                <PostItem
                    index={index}
                    data={item}
                    removePost={removePost}
                />
            </CSSTransition>
          )
        })}
      </TransitionGroup>

    </div>
  );
};
export default PostList;