import PostService from "api/PostService";
import Loader from "components/UI/loader/Loader";
import { useFetching } from "hooks/useFeatching";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const PostIdPage = () => {
  // Route params
  // Берем значениня с url - '/posts/id'
  const params = useParams();

  // Local State
  const [post, setPost] = useState({ id: "", title: "" });
  const [comments, setComments] = useState([]);

  // Hooks
  const [fetchPostById, isLoading] = useFetching(async () => {
    const response = await PostService.getById(params.id);
    setPost(response.data);
  });

  const [fetchComments, isComtLoading] = useFetching(async () => {
    const response = await PostService.geCommentsByPostId(params.id);
    setComments(response.data);
  });

  useEffect(() => {
    // @ts-ignore
    fetchPostById();
    // @ts-ignore
    fetchComments();
  }, []);

  return (
    <div>
      <h1>Вы открыли страницу поста c ID = {params.id}</h1>

      {isLoading || isComtLoading ? (
        <Loader />
      ) : (
        <div>
          <div>
            {post.id}. {post.title}
          </div>

          <h2>Коментарии</h2>
          {comments.map((c) => (
            <div style={{marginTop: 15}} key={c.id}>
              <h5>{c.email}</h5>
              <div >{c.body}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PostIdPage;
