import React, { useEffect, useRef, useState } from "react";
import PostService from "api/PostService";
import PostFilter from "components/PostFilter";
import PostForm from "components/PostForm";
import PostList from "components/PostList";
import MyButton from "components/UI/button/MyButton";
import Loader from "components/UI/loader/Loader";
import MyModal from "components/UI/modal/MyModal";
import Pagination from "components/UI/pagination/Pagination";
import { useFetching } from "hooks/useFeatching";
import { usePosts } from "hooks/usePosts";
import { getPageCount } from "utils/pages";

function Posts() {
  // -- Local State
  // Хуки состояния (локальный state)
  const [posts, setPosts] = useState([]);
  const [vFilter, setFilter] = useState({ sort: "", query: "" });
  const [modal, setModal] = useState(false);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  // DOM Elements
  const lastElement = useRef();

  // Save Data
  const observer = useRef(); // с помощью useRef() - можно сохранять данные от рендера к рендеру

  // Использование кастомного хука (DAL)
  const [fetchPosts, isPostsLoading, postError] = useFetching(async () => {
    const response = await PostService.getAll(limit, page);
    // setPosts(response.data); // Pagination v.
    setPosts([...posts, ...response.data]);
    const totalCount = getPageCount(response.headers["x-total-count"], limit);
    setTotalPages(totalCount);
  });

  /** Отсортированный (с помощью поиска и фильтрации) список постов */
  const sortedAndSearchPosts = usePosts(posts, vFilter.sort, vFilter.query);

  // -- Functions (BLL)
  /** Создание поста */
  const createPost = (newPost) => {
    setPosts([...posts, newPost]);
    setModal(false);
  };

  /** Удаление поста */
  const removePost = (post) => {
    setPosts(posts.filter((p) => p.id !== post.id));
  };

  /** Переход на другую страницу */
  const changePage = (page) => {
    setPage(page);
  };

  // -- Life cycle
  // Динамическая лента загрузки
  useEffect(() => {
    if (isPostsLoading) return;

    // @ts-ignore
    if (observer.current) observer.current.disconnect();

    const callback = function (entries, observer) {
      if (entries[0].isIntersecting && page < totalPages) {
        setPage(page + 1);
      }
    };
    // @ts-ignore
    observer.current = new IntersectionObserver(callback);
    // @ts-ignore
    observer.current.observe(lastElement.current);
  }, [isPostsLoading]);


  // Загрузка постов
  useEffect(() => {
    // @ts-ignore
    fetchPosts();
  }, [page]);

  return (
    <div className="App">
      {/* -- Модальное окно -- */}
      <MyButton style={{ marginTop: 20 }} onClick={() => setModal(true)}>
        Создать пост
      </MyButton>

      <MyModal visible={modal} setVisible={setModal}>
        {/* -- Форма -- */}
        <PostForm create={createPost} />
      </MyModal>

      <hr style={{ margin: "15px 0" }} />

      {/* Поиск и фильтр */}
      <PostFilter vFilter={vFilter} setFilter={setFilter} />

      {/* -- Посты -- */}
      {/* Условная отрисовка  */}
      {postError && (
        <h4 style={{ margin: 20, color: "red", textAlign: "center" }}>
          Произошла ошибка: {postError}
        </h4>
      )}

      <PostList
        remove={removePost}
        posts={sortedAndSearchPosts}
        title="Список постов"
      />

      <div
        ref={lastElement}
        style={{ height: 20, backgroundColor: "red" }}
      ></div>

      {isPostsLoading && (
        <div
          style={{ display: "flex", justifyContent: "center", marginTop: 50 }}
        >
          <Loader />
        </div>
      )}

      {/* Пагинация */}
      <Pagination page={page} totalPages={totalPages} changePage={changePage} />
    </div>
  );
}

export default Posts;
