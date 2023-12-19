import React, {useEffect, useState} from "react";
import Button from "./UI/Button/Button";

const PostItem = ({data, removePost, index}) => {
  return (
    <div
      style={{
        border: "5px teal solid",
        background: "trasparent",

        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',

        padding: '5px',
      }}
      className="posts__post-item"
    >
      <div className="posts__post-content">
        <h3>{data.title}</h3>
          <p>{index}</p>
        <p>{data.body}</p>
      </div>
      <div className="post__button">
        <Button onClick={() => { removePost(data) }}>Удалить</Button>
      </div>
    </div>
  );
};

export default PostItem;
