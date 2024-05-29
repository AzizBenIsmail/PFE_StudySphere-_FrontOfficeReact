import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";

const BlogFooter = () => {
  return (
    <div className="dark:bg-gray-800 py-1">
      <footer className="p-4 bg-white rounded-lg shadow md:flex md:items-center md:justify-between md:p-6 dark:bg-gray-800">
        <Typography
          variant="body2"
          color="textSecondary"
          className="text-sm text-gray-500 sm:text-center dark:text-gray-400"
        >
          © {new Date().getFullYear()}{" "}
          <Link to="/" className="hover:underline">
            AK SWE Services
          </Link>
          . All Rights Reserved.
        </Typography>
        <ul className="flex flex-wrap items-center mt-3 text-sm text-gray-500 dark:text-gray-400 sm:mt-0">
          <li>
            <Link to="/" className="mr-4 hover:underline md:mr-6">
              About
            </Link>
          </li>
          <li>
            <Link to="#" className="mr-4 hover:underline md:mr-6">
              Privacy Policy
            </Link>
          </li>
          <li>
            <Link to="#" className="mr-4 hover:underline md:mr-6">
              Licensing
            </Link>
          </li>
          <li>
            <Link to="#" className="hover:underline">
              Contact
            </Link>
          </li>
        </ul>
      </footer>
    </div>
  );
};

export default BlogFooter;
