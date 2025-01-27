import { useState, useEffect } from "react";
import BlogCard from "../common/BlogCard";
import ErrorMessage from "../common/ErrorMessage";
import Loader from "../common/Loader";
import { getAllBlogs } from "../../lib/apis/blogApis";

const AllBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [pageNum, setPageNum] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const onGetAllBlogs = async (page) => {
    // setIsLoading(true);
    const result = await getAllBlogs(page);

    if (result?.error) {
      setIsLoading(false);
      return setErrorMessage(result?.error);
    }

    setBlogs((prev) => [...prev, ...(result?.data?.blogs ?? [])]);
    setIsLoading(false);
  };

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;

      if (scrollTop + clientHeight > scrollHeight - 500) {
        setPageNum(pageNum + 1);
      }
    };

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    onGetAllBlogs(pageNum);
  }, [pageNum]);

  return (
    <section className="container h-screen mx-auto my-10">
      <div
        className={` ${
          isLoading
            ? "flex flex-1 h-full justify-center items-center"
            : "grid grid-cols-3"
        }`}
      >
        {isLoading && <Loader />}
        {errorMessage && <ErrorMessage message={errorMessage} />}
        {blogs &&
          blogs.length > 0 &&
          blogs.map((blog, index) => (
            <BlogCard
              key={index}
              title={blog?.title}
              description={blog?.content}
            />
          ))}
      </div>
    </section>
  );
};

export default AllBlogs;
