import { useSelector } from "react-redux";
import Blog from "../components/Blog";
import { Container, Typography } from "@mui/material"; // Import Material-UI components

const BlogList = () => {
  const blogs = useSelector((state) => state.blogs);
  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes); // Sort blogs by likes in descending order

  return (
    <Container maxWidth="md"> {/* Use Container component for layout */}
      <Typography variant="h4" align="center" gutterBottom>
        Posts
      </Typography>
      {sortedBlogs.length > 0 ? (
        sortedBlogs.map((blog) => <Blog key={blog.id} blog={blog} />)
      ) : (
        <Typography variant="body1" align="center">
          No posts yet... Create one!
        </Typography>
      )}
    </Container>
  );
};

export default BlogList;
