import React, { useRef, useState } from "react";
import PostList from "./components/PostList";
import MyButton from "./components/UI/button/MyButton";
import MyInput from "./components/UI/input/MyInput";
import "./styles/App.css";

function App() {
  // Хуки состояния (локальный state)
  const [posts, setPosts] = useState([
    { id: 1, title: "JavaScript 1", body: "Description" },
    { id: 2, title: "JavaScript 2", body: "Description" },
    { id: 3, title: "JavaScript 3", body: "Description" },
    { id: 4, title: "JavaScript 4", body: "Description" },
    { id: 5, title: "JavaScript 5", body: "Description" },
  ]);

  // Управляемые компоненты
  const [post, setPost] = useState({
    title: "",
    body: "",
  });

  // Неуправляемый компонент
  const bodyInputRef = useRef();

  const addNewPost = (e) => {
    e.preventDefault();

    // Сетаем посты в локальный state
    setPosts([...posts, {...post, id: Date.now()}]);

    // Обнуление полей ввода
    setPost({
      title: "",
      body: "",
    });

    // Для неуправляемого компонента (вывод пример)
    // console.log('body: ', bodyInputRef.current.value);
  };

  return (
    <div className="App">
      <form>
        {/* Управляемые компоненты */}
        <MyInput
          value={post.title}
          onChange={(e) => setPost({...post, title: e.target.value})}
          type="text"
          placeholder="Название поста"
        />
        <MyInput
          value={post.body}
          onChange={(e) => setPost({...post, body: e.target.value})}
          type="text"
          placeholder="Описание поста"
        />

        {/* Неуправляемый (неконтролируемый) компонент */}
        {/* <MyInput ref={bodyInputRef} type="text" placeholder="Описание поста" /> */}

        <MyButton onClick={addNewPost}>Создать пост</MyButton>
      </form>

      <PostList posts={posts} title="Список постов" />
    </div>
  );
}

export default App;
