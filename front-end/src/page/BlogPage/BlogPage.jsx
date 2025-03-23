import React, { useEffect, useState } from "react";
import AddBlog from "../../components/AddBlog";
import "./BlogPage.scss"; // Import the BlogPage styles
import apiClient from "../../api/apiClient";
import { Toast } from "react-bootstrap";
import apiPaths from "../../api/apiPath";
import { Link } from "react-router-dom";

function BlogPage() {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [blogs, setBlogs] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const token = localStorage.getItem("token");
  const [showToast, setShowToast] = useState(false);

  const handleAddBlog = (newBlog) => {
    window.location.reload();
    setShowToast(true);
  };

  const [isDataFetched, setIsDataFetched] = useState(false);
  useEffect(() => {
    const refreshData = async () => {
      try {
        const response = await apiClient.get(apiPaths.blogs);
        setData(response.data);
      } catch (error) {
        setError(error.message);
      }
    };

    if (!isDataFetched) {
      refreshData();
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
        <h1 className="blog-page__title">Trang Blog</h1>
        <div className="error-message">{error}</div>
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
      <Toast
        onClose={() => setShowToast(false)}
        show={showToast}
        delay={3000}
        autohide
        className="toast"
      >
        <Toast.Header>
          <strong className="mr-auto">Thành công</strong>
        </Toast.Header>
        <Toast.Body>Thêm Blog thành công!</Toast.Body>
      </Toast>
    </div>
  );
}

export default BlogPage;
