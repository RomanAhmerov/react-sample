import React, { useMemo, useState } from "react";
import PostFilter from "./components/PostFilter";
import PostForm from "./components/PostForm";
import PostList from "./components/PostList";
import MyButton from "./components/UI/button/MyButton";
import MyModal from "./components/UI/modal/MyModal";
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

  const [vFilter, setFilter] = useState({ sort: "", query: "" });
  const [modal, setModal] = useState(false);

  // Computed properties
  /** Отсортированный список постов */
  const sortedPosts = useMemo(() => {
    let sortedPosts = posts;

    if (vFilter.sort) {
      sortedPosts = [...posts].sort((a, b) => {
        return a[vFilter.sort].localeCompare(b[vFilter.sort]);
      });
    }

    return sortedPosts;
  }, [vFilter.sort, posts]);

  /** Отсортированный (с помощью поиска и фильтрации) список постов */
  const sortedAndSearchPosts = useMemo(() => {
    return sortedPosts.filter((post) =>
      post.title.toLocaleLowerCase().includes(vFilter.query.toLocaleLowerCase())
    );
  }, [vFilter.query, sortedPosts]);

  // -- Functions
  /** Создание поста */
  const createPost = (newPost) => {
    setPosts([...posts, newPost]);
    setModal(false);
  };

  /** Удаление поста */
  const removePost = (post) => {
    setPosts(posts.filter((p) => p.id !== post.id));
  };

  return (
    <div className="App">
      {/* -- Модальное окно -- */}
      <MyButton style={{marginTop: 20}} onClick={() => setModal(true)}>Создать пост</MyButton>

      <MyModal visible={modal} setVisible={setModal}>
        {/* -- Форма -- */}
        <PostForm create={createPost} />
      </MyModal>

      <hr style={{ margin: "15px 0" }} />

      {/* Поиск и фильтр */}
      <PostFilter vFilter={vFilter} setFilter={setFilter} />

      {/* -- Посты -- */}
      <PostList
        remove={removePost}
        posts={sortedAndSearchPosts}
        title="Список постов"
      />

      {/* Условная отрисовка - c старая версия
      {sortedAndSearchPosts.length !== 0 ? (
        <PostList
          remove={removePost}
          posts={sortedAndSearchPosts}
          title="Список постов"
        />
      ) : (
        <h1 style={{ textAlign: "center" }}>Посты не найдены!</h1>
      )} */}
    </div>
  );
}

export default App;
