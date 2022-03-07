import React, { useState } from "react";
import PostForm from "./components/PostForm";
import PostList from "./components/PostList";
import MySelect from "./components/UI/select/MySelect";
import "./styles/App.css";

function App() {
  // -- Local State
  // Хуки состояния (локальный state)
  const [posts, setPosts] = useState([
    { id: 1, title: "JavaScript", body: "Description" },
    { id: 2, title: "Python", body: "Description" },
    { id: 3, title: "C++", body: "Description" },
    { id: 4, title: "C#", body: "Description" },
    { id: 5, title: "Java", body: "Description" },
  ]);

  const [selectedSort, setSelectedSort] = useState("");

  // -- Functions
  /** Создание поста */
  const createPost = (newPost) => {
    setPosts([...posts, newPost]);
  };

  /** Удаление поста */
  const removePost = (post) => {
    setPosts(posts.filter((p) => p.id !== post.id));
  };

  /** Сортирование постов */
  const sortPosts = (sort) => {
    setPosts([...posts].sort((a, b) => {
      return a[sort].localeCompare(b[sort])
    }
    ));
  };

  return (
    <div className="App">
      {/* -- Форма -- */}
      <PostForm create={createPost} />

      <hr style={{ margin: "15px 0" }} />

      {/* Сортировка */}
      <div>
        <MySelect
          value={selectedSort}
          onChange={sortPosts}
          defaultValue="Сортировка"
          option={[
            { value: "title", name: "По названию" },
            { value: "body", name: "По описанию" },
          ]}
        />
      </div>

      {/* -- Посты -- */}
      {/* Условная отрисовка */}
      {posts.length !== 0 ? (
        <PostList remove={removePost} posts={posts} title="Список постов" />
      ) : (
        <h1 style={{ textAlign: "center" }}>Посты не найдены!</h1>
      )}
    </div>
  );
}

export default App;
