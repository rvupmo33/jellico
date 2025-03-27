import React, { useState } from "react";
import { useBlogStore } from "../store/blog";

const CreatePage = () => {
  const [message, setMessage] = useState({ visible: false, text: "" });
  const [newBlog, setNewBlog] = useState({
    title: "",
    image: "",
    content: "",
  });

  const { createBlog } = useBlogStore();

  const handleCreateBlog = async () => {
    // Validate input
    if (!newBlog.title || !newBlog.image || !newBlog.content) {
      setMessage({ visible: true, text: "Error: All fields are required!" });
      return;
    }

    const { success, message } = await createBlog(newBlog);

    setMessage({
      visible: true,
      text: success ? `Success: ${message}` : `Error: ${message}`,
    });

    if (success) {
      setNewBlog({ title: "", image: "", content: "" });
    }

    // Auto-hide message after 3 seconds
    setTimeout(() => setMessage({ visible: false, text: "" }), 3000);
  };

  return (
    <div className="create-container">
      <h3>Create a blog post</h3>
      <p>Let your creativity flow and inspire others...</p>
      <br />
      <input
        type="text"
        name="title"
        value={newBlog.title}
        onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value })}
        placeholder="Enter blog title"
      />
      <input
        type="text"
        name="image"
        value={newBlog.image}
        onChange={(e) => setNewBlog({ ...newBlog, image: e.target.value })}
        placeholder="Enter blog image URL"
      />
      <textarea
        name="content"
        value={newBlog.content}
        onChange={(e) => setNewBlog({ ...newBlog, content: e.target.value })}
        placeholder="Enter blog content"
      />
      <button onClick={handleCreateBlog}>Create Blog</button>

      {message.visible && <p className="pop-up">{message.text}</p>}
    </div>
  );
};

export default CreatePage;
