import { CircularProgress } from "@mui/material";
import Blog from "./Blog";

const UserView = ({ userInView }) => {
  if (userInView === undefined) {
    return null;
  }
  const totalVotes = userInView.blogs
    .map((blog) => blog.likes)
    .reduce((accumulator, currentValue) => accumulator + currentValue, 0);

  return (
    <section style={{ background: "#fff" }} className="flex flex-col h-screen">
      <div className="py-20 px-0 mx-auto w-2/3 lg:py-20">
        <h2 className="mb-4 text-5xl font-extrabold text-gray-900 dark:text-white">
          u/{userInView.username}
        </h2>
        <h2 className="mb-8 items-center text-lg font-semibold text-gray-900 dark:text-white">
          {totalVotes} likes
        </h2>
        <h2 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
          Posts added by {userInView.name}
        </h2>
        {userInView.blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </div>
    </section>
  );
};

export default UserView;
