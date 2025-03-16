import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import apiClient from "../../api/apiClient";
import apiPaths from "../../api/apiPath";
import "./Blog.scss"; // Import the Blog styles

function Blog() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await apiClient.get(apiPaths.getBlogById(id));
        const blogData = response.data;

        const imageResponse = await apiClient.get(`/blog/image/${id}`, {
          responseType: "blob",
        });
        const imageUrl = URL.createObjectURL(imageResponse.data);

        setBlog({ ...blogData, imageUrl });
      } catch (error) {
        setError(error.message);
      }
    };

    fetchBlog();
  }, [id]);

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!blog) {
    return <div>Loading...</div>;
  }

  const { blogTitle, blogContent, createDateTime, imageUrl } = blog;

  return (
    <div className="blog-detail">
      <h1 className="blog-detail__title">{blogTitle}</h1>
      <img
        src={imageUrl}
        alt={blogTitle}
        className="blog-detail__image"
      />
      <div className="blog-detail__content">
        <p>{blogContent}</p>
        <p className="blog-detail__date">
          <small className="text-muted">
            {new Date(createDateTime).toLocaleString()}
          </small>
        </p>
      </div>
    </div>
  );
}

export default Blog;
