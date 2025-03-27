import React, { useEffect, useState } from "react";
import { useBlogStore } from "../store/blog";
import { useParams } from "react-router-dom";
import { format } from "date-fns";

const BlogPostPage = () => {
  const { id } = useParams();
  const { blogs, fetchBlogs } = useBlogStore();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    if (blogs.length === 0) {
      fetchBlogs();
    }
    const foundBlog = blogs.find((b) => b._id === id);
    setBlog(foundBlog);
  }, [blogs, id, fetchBlogs]);

  if (!blog) return <p>Loading...</p>;

  return (
    <div>
      <div className="blog-post">
        <img src={blog.image} alt={blog.title} />
        <p className="date">{format(new Date(blog.createdAt), "PPP")}</p>
        <h1>{blog.title}</h1>
        <p>{blog.content}</p>
      </div>
    </div>
  );
};

export default BlogPostPage;
