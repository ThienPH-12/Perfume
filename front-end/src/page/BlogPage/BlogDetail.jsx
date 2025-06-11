import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import apiClient from "../../api/apiClient";
import apiPaths from "../../api/apiPath";
import { ErrorToastify } from "../../components/Toastify"; // Import Toastify
import "./BlogDetail.scss"; // Update the Blog styles import

function BlogDetail() { // Rename component to BlogDetail
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await apiClient.get(apiPaths.getBlogById(id));
        const blogData = response.data;

        const imageResponse = await apiClient.get(apiPaths.getBlogImageById(id), {
          responseType: "blob",
        });
        const imageUrl = URL.createObjectURL(imageResponse.data);

        setBlog({ ...blogData, imageUrl });
      } catch (error) {
        ErrorToastify(error.message); // Display error using Toastify
      }
    };

    fetchBlog();
  }, [id]);

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

export default BlogDetail; // Update export name
