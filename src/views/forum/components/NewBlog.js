import React, { useState , useEffect } from "react";
import { useDispatch } from "react-redux";
import { createBlog } from "../reducers/blogReducer";
import { useHistory } from "react-router-dom";
import { setNotification } from "../reducers/notificationReducer";
import { TextField, Button, TextareaAutosize } from "@mui/material"; // Import TextareaAutosize from Material-UI
import BlogFooter from "./BlogFooter";

const NewBlog = () => {
  const dispatch = useDispatch();
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const history = useHistory();

  const addNewBlog = async (blogObject) => {
    try {
      const notif1 = {
        message: `Post was successfully added`,
        type: "success",
      };
      await dispatch(createBlog(blogObject));
      history.push("/forum"); // Navigate to the "/forum" page
      dispatch(setNotification(notif1, 2500));
    } catch (exception) {
      const notif2 = {
        message: `Cannot add post`,
        type: "failure",
      };
      dispatch(setNotification(notif2, 2500));
    }
  };


  const addBlog = (event) => {
    event.preventDefault();
    const blogObject = {
      title: newTitle,
      content: newContent,
      dateCreated: new Date(),
    };
    addNewBlog(blogObject);
    setNewContent("");
    setNewTitle("");
  };




  return (
    <>
      <div className="">
        <main className="pt-8 pb-16 lg:pt-16 lg:pb-12 bg-white dark:bg-gray-900 min-h-screen">
          <div className="flex justify-between px-4 mx-auto max-w-6xl ">
            <article className="mx-auto w-full max-w-6xl	 format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">
              <header className="mb-4 lg:mb-6 not-format">
                <h1 className="ml-30 mt-12 text-3xl font-extrabold leading-tight text-gray-900 lg:mb-6 lg:text-4xl dark:text-white">
                  Create a Post
                </h1>
                <address className="flex items-center mb-6 not-italic"></address>
              </header>
              <form onSubmit={addBlog} className="flex flex-col gap-4">
                <div className="ml-30 mt-4">
                  <div className="  block">
                    <label htmlFor="post-title" className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-400">Title of Post</label>
                  </div>
                  <TextField
                    id="post-title"
                    type="text"
                    placeholder="An Amazing Post"
                    required={true}
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    variant="outlined"
                    style={{ width: "90%" }} // Set the width here
                  />
                </div>
                <div className="ml-30 mt-6">
                  <div className="mb-2  block">
                    <label htmlFor="post-content" className=" mb-2 block text-sm font-medium text-gray-700 dark:text-gray-400">Content of Post</label>
                  </div>
                  <TextareaAutosize
                    id="post-content"
                    required={true}
                    value={newContent}
                    placeholder="Text"
                    onChange={(e) => setNewContent(e.target.value)}
                    minRows={10}
                    style={{ width: "90%" }} 
                  />
                </div>
                <div className="ml-30 mt-6 ">      
                <Button className=" w-7" type="submit" variant="contained" color="primary">
                  Submit
                </Button>
                </div>
              </form>
            </article>
          </div>
        </main>
      </div>

      
    </>
  );
};

export default NewBlog;
