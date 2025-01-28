import axios from "axios";

const baseUrl = "https://blog-application-hyc2.onrender.com";

export const getAllBlogs = async (page) => {
  try {
    const response = await axios.get(`${baseUrl}/blogs?page=${page}&limit=10`);
    return { data: response?.data };
  } catch (error) {
    return { error: error?.message || "Something went wrong!" };
  }
};

export const getBlogDetails = async (blogTitle) => {
  try {
    const response = await axios.get(`${baseUrl}/blogs/${blogTitle}`);

    return { data: response?.data };
  } catch (error) {
    return { error: error?.message || "Something went wrong!" };
  }
};
