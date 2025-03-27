import { create } from "zustand";

export const useBlogStore = create((set) => ({
  blogs: [],
  setBlogs: (blogs) => set({ blogs }),

  createBlog: async (newBlog) => {
    if (!newBlog.title || !newBlog.image || !newBlog.content) {
      return { success: false, message: "Please fill in all fields" };
    }

    try {
      const res = await fetch("http://localhost:3000/api/blogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newBlog),
      });

      if (!res.ok) {
        throw new Error("Failed to create blog");
      }

      const data = await res.json();
      set((state) => ({ blogs: [...state.blogs, data.data] }));
      return { success: true, message: "Blog created successfully" };
    } catch (error) {
      return { success: false, message: `❌ ${error.message}` };
    }
  },

  fetchBlogs: async () => {
    try {
      const res = await fetch("http://localhost:3000/api/blogs");
      if (!res.ok) {
        throw new Error("Failed to fetch blogs");
      }

      const data = await res.json();
      console.log("Fetched Blogs:", data); // Ensure data is received

      set((state) => ({ ...state, blogs: data.data })); // Ensure state is updated

      return { success: true, message: "✅ Blogs fetched successfully" };
    } catch (error) {
      return { success: false, message: `❌ ${error.message}` };
    }
  },
}));
