// import { createSlice } from "@reduxjs/toolkit";
// import * as blogService from "../../../Services/ApiBlog";

// const blogSlice = createSlice({
//   name: "blogs",
//   initialState: [],
//   reducers: {
//     create(state, action) {
//       const blog = action.payload;
//       state.push(blog);
//     },
//     setBlogs(state, action) {
//       return action.payload;
//     },
//     edit(state, action) {
//       const updatedBlog = action.payload;
//       return state.map((item) =>
//         item.id === updatedBlog.id ? updatedBlog : item
//       );
//     },
//     remove(state, action) {
//       const id = action.payload;
//       return state.filter((blogs) => blogs._id !== id);
//     },
//     comment(state, action) {
//       const updatedBlog = action.payload;
//       return state.map((item) =>
//         item.id === updatedBlog.id ? updatedBlog : item
//       );
//     },
//   },
// });

// export const { create, setBlogs, edit, remove, comment } = blogSlice.actions;

// export const initializeBlogs = () => {
//   return async (dispatch) => {
//     const response = await blogService.getAll();
//     const blogs = response.data; // Only keep necessary data
//     dispatch(setBlogs(blogs));
//   };
// };

// export const createBlog = (blog) => {
//   return async (dispatch) => {
//     const response = await blogService.create(blog);
//     const newBlog = response.data; // Only keep necessary data
//     dispatch(create(newBlog));
//   };
// };

// export const updateBlog = (updatedBlog) => {
//   return async (dispatch) => {
//     const response = await blogService.update(updatedBlog);
//     const updatedBlogData = response.data; // Only keep necessary data
//     dispatch(edit(updatedBlogData));
//   };
// };

// export const deleteBlog = (id) => {
//   return async (dispatch) => {
//     await blogService.remove(id);
//     dispatch(remove(id));
//   };
// };

// export const commentBlog = (comment, id) => {
//   const formattedComment = { content: comment };
//   return async (dispatch) => {
//     const response = await blogService.postComment(formattedComment, id);
//     const updatedBlog = response.data; // Only keep necessary data
//     dispatch(comment(updatedBlog));
//   };
// };

// export default blogSlice.reducer;


import { createSlice } from "@reduxjs/toolkit";
import * as blogService from "../../../Services/ApiBlog";
import Cookies from 'js-cookie';

const blogSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    create(state, action) {
      const blog = action.payload;
      state.push(blog);
      console.log("New blog created:", blog);
    },
    setBlogs(state, action) {
      const blogs = action.payload;
      console.log("Setting blogs:", blogs);
      return blogs;
    },



    edit(state, action) {
      console.log("Action type received in edit reducer:", action.type);
      const updatedBlog = action.payload;
      console.log("Editing blog:", updatedBlog);
      console.log("Keys of updatedBlog:", Object.keys(updatedBlog));
      return state.map((item) => {
        console.log("Mapping item1:", item);
        console.log("Item ID:", item._id);
        console.log("updatedBlog._id for update:", updatedBlog._id);
        return item._id === updatedBlog._id ? updatedBlog : item;
      });
    },
    
    
    
    
    
    
    remove(state, action) {
      const id = action.payload;
      console.log("Removing blog with ID:", id);
      return state.filter((blog) => {
        console.log("Filtering blog:", blog);
        console.log("Comparing ids:", blog._id !== id);
        return blog._id !== id;
      });
    },
    comment(state, action) {
      const updatedBlogcomment = action.payload;
      console.log("Adding comment to blogoooooo:", updatedBlogcomment);
      return state.map((item) => {
        console.log("Mapping item2:", item);
        console.log("updatedBlog.id for comment:", updatedBlogcomment._id);
        return item._id === updatedBlogcomment._id ? updatedBlogcomment : item;
      });
    },
  },
});

export const { create, setBlogs, edit, remove, comment } = blogSlice.actions;


export const initializeBlogs = () => {
  return async (dispatch) => {
    const jwt_token = Cookies.get('jwt_token');
    if (!jwt_token) {
      window.location.replace('/login-page');
      return;
    }
    
    const config = {
      headers: {
        Authorization: `Bearer ${jwt_token}`,
      },
    };

    const response = await blogService.getAll(config);
    const blogs = response.data;
    console.log("Initializing blogs:", blogs);
    dispatch(setBlogs(blogs));
  };
};

export const createBlog = (blog) => {
  return async (dispatch) => {
    const jwt_token = Cookies.get('jwt_token');
    if (!jwt_token) {
      window.location.replace('/login-page');
      return;
    }
    
    const config = {
      headers: {
        Authorization: `Bearer ${jwt_token}`,
      },
    };

    const response = await blogService.create(blog, config);
    const newBlog = response.data;
    console.log("Creating new blog:", newBlog);
    dispatch(create(newBlog));
  };
};

// export const updateBlog = (updatedBlog) => {
//   return async (dispatch) => {
//     console.log("Payload before dispatching to updateBlog:", updatedBlog);
   
//     try {
//       const response = await blogService.update(updatedBlog);
//       console.log("Response from update API:", response); // Log the entire response object
//       const updatedBlogData = response.data;
//       console.log("Updatingfffff blog:", updatedBlogData);
//       dispatch(edit(updatedBlogData));
//       console.log("Action type dispatched by updateBlog:", edit.type);
//     } catch (error) {
//       console.error('Error updating blog:', error);
//     }
//   };
// };

export const updateBlog = (updatedBlog) => {
  return async (dispatch) => {
    try {
      const jwt_token = Cookies.get('jwt_token');
      if (!jwt_token) {
        window.location.replace('/login-page');
        return;
      }
      
      const config = {
        headers: {
          Authorization: `Bearer ${jwt_token}`,
        },
      };

      const response = await blogService.update(updatedBlog._id, updatedBlog, config); // Pass updatedBlog._id as the first argument
      console.log("Response from update API:", response); // Log the entire response object
      //const updatedBlogData = response.data;
     // console.log("Updating blog:", updatedBlogData);
      dispatch(edit(response));
    } catch (error) {
      console.error('Error updating blog:', error);
    }
  };
};


export const deleteBlog = (id) => {
  return async (dispatch) => {
    const jwt_token = Cookies.get('jwt_token');
    if (!jwt_token) {
      window.location.replace('/login-page');
      return;
    }
    
    const config = {
      headers: {
        Authorization: `Bearer ${jwt_token}`,
      },
    };

    await blogService.remove(id, config);
    console.log("Deleting blog with ID:", id);
    dispatch(remove(id));
  };
};
export const commentBlog = (comment, id) => {
  const formattedComment = { content: comment };
  return async (dispatch) => {
    try {
      const jwt_token = Cookies.get('jwt_token');
      if (!jwt_token) {
        window.location.replace('/login-page');
        return;
      }
      
      const config = {
        headers: {
          Authorization: `Bearer ${jwt_token}`,
        },
      };

      const response = await blogService.postComment(formattedComment, id, config);
      console.log("Response from comment API:", response);
      const updatedBlogcomment = response.data; // Extract the updated comment from the response
      console.log("Adding comment to blog:", updatedBlogcomment);
      dispatch(comment(updatedBlogcomment)); // Dispatch the comment action with the updated comment data
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };
};


export default blogSlice.reducer;
