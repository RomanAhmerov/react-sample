import React from "react";
import PostItem from "./PostItem";

const PostList = ({ posts, title }) => {
  return (
    <div>
      <h1 style={{ textAlign: "center" }}>{title} постов</h1>

      {posts.map((post, index) => (
        <PostItem key={post.id} post={post} number={index + 1} />
      ))}
    </div>
  );
};

export default PostList;
