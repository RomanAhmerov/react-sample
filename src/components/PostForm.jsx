// @ts-ignore
import React, { useState } from "react";
import MyButton from "./UI/button/MyButton";
import MyInput from "./UI/input/MyInput";

function PostForm({ create }) {
  // -- Local State
  // Управляемые компоненты
  const [post, setPost] = useState({
    title: "",
    body: "",
  });

  // -- Functions
  const addNewPost = (e) => {
    e.preventDefault();

    const newPost = {
      id: Date.now(),
      ...post,
    };

    // Родительский callback - для создания нового поста
    // * - связь ребенка с родителем
    create(newPost);

    // Обнуление полей ввода
    setPost({
      title: "",
      body: "",
    });

    // Для неуправляемого компонента (вывод пример)
    // console.log('body: ', bodyInputRef.current.value);
  };

  return (
    <div>
      <form>
        {/* Управляемые компоненты */}
        <MyInput
          // @ts-ignore
          value={post.title}
          onChange={(e) => setPost({ ...post, title: e.target.value })}
          type="text"
          placeholder="Название поста"
        />
        <MyInput
          // @ts-ignore
          value={post.body}
          onChange={(e) => setPost({ ...post, body: e.target.value })}
          type="text"
          placeholder="Описание поста"
        />

        {/* Неуправляемый (неконтролируемый) компонент */}
        {/* <MyInput ref={bodyInputRef} type="text" placeholder="Описание поста" /> */}

        <MyButton onClick={addNewPost}>Создать пост</MyButton>
      </form>
    </div>
  );
}

export default PostForm;
