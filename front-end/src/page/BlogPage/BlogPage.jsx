import React, { useEffect, useState } from "react";
import AddBlog from "../../components/AddBlog";
import "./BlogPage.scss"; // Import the BlogPage styles
import apiClient from "../../api/apiClient";
import apiPaths from "../../api/apiPath";
import { Link } from "react-router-dom";
import { ErrorToastify, SuccessToastify } from "../../components/Toastify"; // Import Toastify

function BlogPage() {
  const [data, setData] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const token = localStorage.getItem("token");

  const fetchBlogs = async () => {
    try {
      const response = await apiClient.get(apiPaths.blogs);
      setData(response.data);
    } catch (error) {
      ErrorToastify(error.message); // Display error using Toastify
    }
  };

  const handleAddBlog = async (newBlog) => {
    try {
      SuccessToastify("Thêm Blog thành công!"); // Display success toast
      await fetchBlogs(); // Refresh blog list
    } catch (error) {
      ErrorToastify(error.message); // Display error using Toastify
    }
  };

  const [isDataFetched, setIsDataFetched] = useState(false);
  useEffect(() => {
    if (!isDataFetched) {
      fetchBlogs();
      setIsDataFetched(true);
    }
  }, [isDataFetched]);

  useEffect(() => {
    if (data && data.length > 0) {
      const fetchImagesAndUpdateBlogs = async () => {
        const updatedBlogs = await Promise.all(
          data.map(async (blog) => {
            try {
              const response = await apiClient.get(
                apiPaths.getBlogImageById(blog.blogId),
                {
                  responseType: "blob",
                }
              );
              const imageUrl = URL.createObjectURL(response.data);
              return { ...blog, imageUrl };
            } catch (error) {
              console.error(
                "Error fetching image for blog ID:",
                blog.id,
                error
              );
              return { ...blog, imageUrl: "placeholder-image-url" };
            }
          })
        );
        setBlogs(updatedBlogs);
      };

      fetchImagesAndUpdateBlogs();
    }
  }, [data]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div id="BlogPage">
      <div className="blog-page">
        <h1 className="blog-page__title">Blog</h1>
        {token && (
          <button onClick={handleOpenModal} className="add-button">
            Thêm mới Blog
          </button>
        )}
        <AddBlog
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onBlogAdded={handleAddBlog}
        />
        <div className="blog-container">
          <div className="grid">
            <div className="rowCustom">
              {blogs.length === 0 ? (
                <h2 className="text-center no-blogs">Hiện không có Blog nào</h2>
              ) : (
                blogs.map((blog) => {
                  const {
                    blogId,
                    blogTitle,
                    blogContent,
                    createDateTime,
                    imageUrl,
                  } = blog;
                  return (
                    <Link
                      to={`/blog/${blogId}`}
                      key={blogId}
                      className="blog-link"
                    >
                      <div className="blog-item">
                        <img
                          src={imageUrl}
                          alt={blogTitle}
                          className="blog-image"
                        />
                        <div className="card-body">
                          <div>
                            <h5 className="card-title">{blogTitle}</h5>
                            <div style={{ width: "100%" }}>
                              <p className="card-text">{blogContent}</p>
                            </div>
                          </div>
                          <div>
                            <p className="card-text">
                              <small className="text-muted">
                                {new Date(createDateTime).toLocaleString()}
                              </small>
                            </p>
                          </div>
                        </div>
                      </div>
                    </Link>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogPage;
