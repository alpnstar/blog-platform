import React from "react";
import Button from "./UI/Button/Button";
import {useNavigate} from "react-router-dom";

const PostItem = ({data, removePost, index, buttons=true}) => {
    const navigate = useNavigate();
  return (
      <div
          className="posts__post-item"
      >
          <div className="posts__post-content">
              <h3>{data.title}</h3>
              <p>{index}</p>
              <p>{data.body}</p>
          </div>
          {buttons &&
              <div className="posts__buttons-wrapper">
                  <div className="posts__button">
                      <Button onClick={() => {
                          navigate('/posts/' + data.id);
                      }}>Открыть</Button>
                  </div>
                  <div className="posts__button">
                      <Button onClick={() => {
                          removePost(data)
                      }}>Удалить</Button>
                  </div>
              </div>}
      </div>
  );
};

export default PostItem;
