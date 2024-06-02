import { useState , useEffect } from "react";
import { updateBlog } from "../reducers/blogReducer";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { setNotification } from "../reducers/notificationReducer";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import CircularProgress from "@mui/material/CircularProgress";
import BlogFooter from "./BlogFooter";

const BlogEdit = ({ blog }) => {
  console.log("Rendering BlogEdit component"); // Add console log here
  const dispatch = useDispatch();
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [editSuccess, setEditSuccess] = useState(false);

  const history = useHistory();

  useEffect(() => {
    if (editSuccess) {
      window.location.reload();
    }
  }, [editSuccess]);


  if (blog === undefined) {
    return <CircularProgress />;
  }
  if (blog && newTitle === "") {
    setNewTitle(blog.title);
    setNewContent(blog.content);
  }

 

  const editBlog = (event) => {
    event.preventDefault();
    const blogObject = {
      ...blog,
      title: newTitle,
      content: newContent,
      dateCreated: new Date(),
    };
    editNewBlog(blogObject);
    setNewContent("");
    setNewTitle("");
  };

  const editNewBlog = async (blogObject) => {
    setLoading(true);
    try {
      const notif1 = {
        message: `Post was successfully edited`,
        type: "success",
      };
      await dispatch(updateBlog(blogObject));
      setEditSuccess(true);
      history.push(`/forum/posts/edit/${blog._id}`);
      dispatch(setNotification(notif1, 2500));
    } catch (exception) {
      const notif2 = {
        message: `Cannot edit post`,
        type: "failure",
      };
      dispatch(setNotification(notif2, 2500));
    }
    setLoading(false);
  };

  return (
    <>
      <div className="">
        <main className="pt-8 pb-16 lg:pt-16 lg:pb-12 bg-white dark:bg-gray-900 min-h-screen">
          <div className="flex justify-between px-4 mx-auto max-w-6xl ">
            <article className="mx-auto w-full max-w-6xl	 format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">
              <header className="mb-4 lg:mb-6 not-format">
                <h1 className="ml-30 mt-12  text-3xl font-extrabold leading-tight text-gray-900 lg:mb-6 lg:text-4xl dark:text-white">
                  Edit Post
                </h1>
                <address className="flex items-center mb-6 not-italic"></address>
              </header>
              <form onSubmit={editBlog} className="flex flex-col gap-4">
              <div className="ml-30 mt-4">
                  <div className="  block">
                    <label htmlFor="post-title" className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-400">Title of Post</label>
                  </div>
                  <TextField
                    id="post-title"
                    type="text"
                    variant="outlined"
                    required={true}
                    value={newTitle}
                    onChange={(event) => setNewTitle(event.target.value)}
                    style={{ width: "90%" }} 
                  />
                </div>
                <div className="ml-30 mt-6">
                  <div className="mb-2  block">
                    <label htmlFor="post-content" className=" mb-2 block text-sm font-medium text-gray-700 dark:text-gray-400">Content of Post</label>
                  </div>
                  <TextareaAutosize
                    id="post-content"
                    aria-label="minimum height"
                    minRows={10}
                    placeholder="Content of Post"
                    value={newContent}
                    onChange={(event) => setNewContent(event.target.value)}
                    style={{ width: "90%" }} 
                  />
                </div>
                <div className="ml-30 mt-6 "> 
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={loading}
                >
                  {loading ? <CircularProgress size={24} /> : "Submit"}
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

export default BlogEdit;
