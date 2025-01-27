import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getBlogDetails } from "../../lib/apis/blogApis";

const BlogDetails = () => {
  const [blogDetails, setBlogDetails] = useState({});

  const params = useParams();

  const { blogTitle } = params;

  useEffect(() => {
    const onGetBlogDetails = async () => {
      const result = await getBlogDetails(blogTitle);

      if (result?.data) {
        return setBlogDetails(result?.data);
      }
    };

    if (blogTitle) {
      onGetBlogDetails();
    }
  }, [blogTitle]);

  return (
    <div className="container">
      <div className="flex justify-between ">
        <div className="basis-3/5">
          {blogDetails?.blog?.title}
          <p>{blogDetails?.blog?.content}</p>
        </div>
        <div className="basis-2/5"></div>
      </div>
    </div>
  );
};

export default BlogDetails;
