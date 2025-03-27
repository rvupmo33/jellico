import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useBlogStore } from "../store/blog";

const HomePage = () => {
  const { blogs, fetchBlogs } = useBlogStore();

  const truncateText = (text, limit) => {
    if (!text) return "";
    return text.length > limit ? text.substring(0, limit) + "..." : text;
  };

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  const firstBlog = blogs.length > 0 ? blogs[0] : null;
  const heroImage = firstBlog?.image || "placeholder.jpg";

  return (
    <div>
      <div className="welcomeBarContainer">
        <h1>Welcome to Jellico</h1>
        <h5>Your safe digital space for ideas, creativity, and connection</h5>
        <div className="subscriptionLinkContainer">
          {/* <a href="#">Subscribe to our newsletter here &nbsp;</a> */}
        </div>
      </div>
      {/* Hero Section */}

      <div className="heroContainer">
        <div
          className="firstBlogContainer"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          {firstBlog && (
            <div className="heroText">
              <h2>{truncateText(firstBlog.title, 80)}</h2>
              <p>{truncateText(firstBlog.content, 150)}</p>
              <Link to={`/blog/${firstBlog._id}`} className="readMore">
                Read More
              </Link>
            </div>
          )}
        </div>

        <div className="tabsContainer">
          <div className="tabContent">
            <ul className="blogsList">
              {blogs.slice(1, 4).map((blog, idx) => (
                <li key={idx} className="blogItem">
                  <img src={blog.image || "placeholder.jpg"} alt={blog.title} />
                  <div className="blogText">
                    <h3>{truncateText(blog.title, 45)}</h3>
                    <Link to={`/blog/${blog._id}`}>Read more</Link>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Blog Cards Section */}
      {blogs.length > 4 ? (
        <div className="cards-container">
          {blogs.slice(4).map((blog) => (
            <div
              className="card"
              key={blog._id}
              style={{
                backgroundImage: `url(${blog.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="card-content">
                <h3>{blog.title}</h3>
                <p>{blog.content.substring(0, 100)}...</p>
                <Link className="card-link" to={`/blog/${blog._id}`}>
                  Read More
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div>
          {console.log(blogs.length)}
          <p style={{ textAlign: "center", marginTop: 80 }}>
            No Blogs found...{" "}
            <Link
              to={"/create"}
              style={{
                color: "#7175ad",
                textDecoration: "none",
              }}
            >
              Create a blog post?
            </Link>
          </p>
        </div>
      )}
    </div>
  );
};

export default HomePage;
