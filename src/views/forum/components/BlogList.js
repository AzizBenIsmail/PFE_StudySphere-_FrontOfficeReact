// import React from 'react';
// import { useSelector } from 'react-redux';
// import Blog from './Blog';
// import { Container, Typography } from '@mui/material';

// const BlogList = () => {
//   const blogs = useSelector(state => state.blogs);
//   console.log("Blogs state in BlogList:", blogs); // Add this line for debugging

//   const sortedBlogs = blogs ? [...blogs].sort((a, b) => b.likes - a.likes) : [];

//   return (
//     <Container maxWidth="md">
//       <Typography variant="h4" align="center" gutterBottom>
//         Posts
//       </Typography>
//       {sortedBlogs.length > 0 ? (
//         sortedBlogs.map(blog => <Blog key={blog.id} blog={blog} />)
//       ) : (
//         <Typography variant="body1" align="center">
//           No posts yet... Create one!
//         </Typography>
//       )}
//     </Container>
//   );
// };

// export default BlogList;


import React from 'react';
import { useSelector } from 'react-redux';
import Blog from './Blog';
import { Container, Typography } from '@mui/material';

const BlogList = () => {
  const blogs = useSelector((state) => state.blogs);
  const blogs1 = [...blogs];

  console.log("Blogs state in BlogList:", blogs); // Add this line for debugging
console.log("Blogs state in BlogListssssssssss:", blogs1); // Add this line for debugging


  // Ensure that blogs is an array
  const sortedBlogs = Array.isArray(blogs)
    ? [...blogs].sort((a, b) => b.likes - a.likes)
    : [];

    console.log("Sorted Blogs:", sortedBlogs);

  return (
    <Container maxWidth="md">
      <Typography variant="h4" align="center" gutterBottom>
        Posts
      </Typography>
      {sortedBlogs.length > 0 ? (
        sortedBlogs.map(blog => <Blog key={blog.id} blog={blog} />)
      ) : (
        <Typography variant="body1" align="center">
          No posts yet... Create one!
        </Typography>
      )}
    </Container>
  );
};

export default BlogList;

