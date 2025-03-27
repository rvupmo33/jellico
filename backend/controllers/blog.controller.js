import Blog from "../models/blog.model.js";
import mongoose from "mongoose";

export const createBlog = async (req, res) => {
  const blog = req.body; // requests the blog from req.body

  if (!blog.title || !blog.image || !blog.content) {
    // validation to check if all fields are filled in
    return res
      .status(400)
      .json({ success: false, message: "Please provide all fields" });
  }

  const newBlog = new Blog(blog); // create new blog using the blog info from request

  try {
    await newBlog.save();
    res.status(201).json({ success: true, data: newBlog });
  } catch (error) {
    console.error("Error in create product: ", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.status(200).json({ success: true, data: blogs });
  } catch (error) {
    console.error("Error in fetching blogs: ", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const updateBlog = async (req, res) => {
  const { id } = req.params; // get id from params

  const blog = req.body; // get the rest of the data from body

  if (!mongoose.Types.ObjectId.isValid(id)) {
    // check if blog is is valid
    return res
      .status(404)
      .json({ success: false, message: "Blog Id not found." });
  }

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(id, blog, {
      new: true,
    });
    res.status(200).json({ success: true, data: updateBlog });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const deleteBlog = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: "Blog Id not found." });
  }

  try {
    await Blog.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Blog deleted" });
  } catch (error) {
    console.log("Error in deleting blog: ", error.message);

    res.status(500).json({ success: false, message: "Server Error" });
  }
};
