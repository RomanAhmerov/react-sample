import React from "react";

const PostItem = (props) => {



  return (
    <div className="post">
      <div className="post__conteiner">
        <strong>{props.number}. {props.post.title}</strong>

        <div>{props.post.body}</div>
      </div>

      <button className="post__btns">Удалить</button>
    </div>
  );
};

export default PostItem;
