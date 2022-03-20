import React from "react";
import MyButton from "./UI/button/MyButton";
import { useNavigate } from "react-router-dom";

const PostItem = (props) => {
  const router = useNavigate();

  return (
    <div className="post">
      <div className="post__conteiner">
        <strong>
          {props.post.id}. {props.post.title}
        </strong>

        <div>{props.post.body}</div>
      </div>

      <div className="posts__btns">
        <MyButton
          onClick={() => router(`/posts/${props.post.id}`)}
          className="post__btns"
        >
          Открыть
        </MyButton>

        <MyButton
          onClick={() => props.remove(props.post)}
          className="post__btns"
        >
          Удалить
        </MyButton>
      </div>
    </div>
  );
};

export default PostItem;
