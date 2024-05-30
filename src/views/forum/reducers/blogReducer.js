import { createSlice } from "@reduxjs/toolkit";
import * as blogService from "../../../Services/ApiBlog";

const blogSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    create(state, action) {
      const blog = action.payload;
      state.push(blog);
    },
    setBlogs(state, action) {
      return action.payload;
    },
    edit(state, action) {
      const updatedBlog = action.payload;
      return state.map((item) =>
        item.id === updatedBlog.id ? updatedBlog : item
      );
    },
    remove(state, action) {
      const id = action.payload;
      return state.filter((blogs) => blogs.id !== id);
    },
    comment(state, action) {
      const updatedBlog = action.payload;
      return state.map((item) =>
        item.id === updatedBlog.id ? updatedBlog : item
      );
    },
  },
});

export const { create, setBlogs, edit, remove, comment } = blogSlice.actions;

export const initializeBlogs = () => {
  return async (dispatch) => {
    const response = await blogService.getAll();
    const blogs = response.data; // Only keep necessary data
    dispatch(setBlogs(blogs));
  };
};

export const createBlog = (blog) => {
  return async (dispatch) => {
    const response = await blogService.create(blog);
    const newBlog = response.data; // Only keep necessary data
    dispatch(create(newBlog));
  };
};

export const updateBlog = (updatedBlog) => {
  return async (dispatch) => {
    const response = await blogService.update(updatedBlog);
    const updatedBlogData = response.data; // Only keep necessary data
    dispatch(edit(updatedBlogData));
  };
};

export const deleteBlog = (id) => {
  return async (dispatch) => {
    await blogService.remove(id);
    dispatch(remove(id));
  };
};

export const commentBlog = (comment, id) => {
  const formattedComment = { content: comment };
  return async (dispatch) => {
    const response = await blogService.postComment(formattedComment, id);
    const updatedBlog = response.data; // Only keep necessary data
    dispatch(comment(updatedBlog));
  };
};

export default blogSlice.reducer;
