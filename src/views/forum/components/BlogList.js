// import React from 'react';
// import { useSelector } from 'react-redux';
// import Blog from './Blog';
// import { Container, Typography } from '@mui/material';

// const BlogList = () => {
//   const blogs = useSelector((state) => state.blogs);
//  // console.log("Blogs state in BlogList:", blogs);
//   // Ensure that blogs is an array and sort it by likes

//   const sortedBlogs = Array.isArray(blogs)
//     ? [...blogs].sort((a, b) => b.likes - a.likes)
//     : [];

//     //console.log("Sorted Blogs:", sortedBlogs);

//   return (
//     <Container maxWidth="md">
//       <Typography variant="h4" align="center" gutterBottom>
//         Posts
//       </Typography>
//       {sortedBlogs.length > 0 ? (
//         sortedBlogs.map((blog) => (
//           <Blog key={blog._id} blog={blog} />
//         ))
//       ) : (
//         <Typography variant="body1" align="center">
//           No posts yet... Create one!
//         </Typography>
//       )}
//     </Container>
//   );
// };

// export default BlogList;


// import React from 'react';
// import { useSelector } from 'react-redux';
// import Blog from './Blog';
// import { Container, Typography } from '@mui/material';

// const BlogList = () => {
//   const blogs = useSelector((state) => state.blogs);
//   // console.log("Blogs state in BlogList:", blogs);
//   // Ensure that blogs is an array and sort it by likes

//   const sortedBlogs = Array.isArray(blogs)
//     ? [...blogs].sort((a, b) => b.likes - a.likes)
//     : [];

//   // console.log("Sorted Blogs:", sortedBlogs);

//   return (
//     <Container maxWidth="md">
//       <Typography variant="h4" align="center" gutterBottom>
//         Posts
//       </Typography>
//       {sortedBlogs.length > 0 ? (
//         sortedBlogs.map((blog) => (
//           <Blog key={blog._id} blog={blog} />
//         ))
//       ) : (
//         <Typography variant="body1" align="center">
//           No posts yet... Create one!
//         </Typography>
//       )}
//     </Container>
//   );
// };

// export default BlogList;
import Blog from "../components/Blog";
import { useSelector } from "react-redux";
import { Card, Typography } from "@mui/material"; // Import Material-UI components
import BlogFooter from "./BlogFooter";

const BlogList = () => {
  const blogs = useSelector((state) => state.blogs);
  const blogs1 = [...blogs];

  return (
    <div className="">
      <main className="pt-8 pb-16 lg:pt-16 lg:pb-24 bg-white dark:bg-gray-900 min-h-screen">
        <div className="flex justify-between px-4 mx-auto max-w-6xl ">
          <article className="mx-auto w-full max-w-6xl format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">
            <header className="mb-4 lg:mb-6 not-format">
              <Typography variant="h4" className="mb-4 text-4xl tracking-tight font-bold text-gray-900 dark:text-white">
                Posts
              </Typography>
            </header>
            {blogs1.length > 0 ? (
              blogs1
                .sort((a, b) => (a.likes > b.likes ? -1 : 1))
                .map((blog) => {
                  // Log the _id for debugging
                 // console.log("Blog ID:", blog._id);
                  return (
                    <Card key={blog._id} className="p-6 mb-4">
                      <Blog blog={blog} />
                    </Card>
                  );
                })
            ) : (
              <Card className="p-6 text-base mb-4">
                <Typography className="text-gray-500 dark:text-gray-400">
                  No posts yet... Create one!
                </Typography>
              </Card>
            )}
          </article>
        </div>
      </main>

      <BlogFooter />
    </div>
  );
};

export default BlogList;
