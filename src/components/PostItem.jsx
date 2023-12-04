import React from "react";
import Button from "./UI/Button/Button";

export const PostItem = ({ data, removePost, ...props }) => {

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
        <p>{props.itemKey}</p>
        <p>{data.body}</p>
      </div>
      <div className="post__button">
        <Button onClick={() => { removePost(data) }}>Удалить</Button>
      </div>
    </div>
  );
};