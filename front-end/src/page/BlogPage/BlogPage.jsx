import React, { useEffect, useState } from "react";
import AddBlog from "../../components/AddBlog";
import "./BlogPage.scss"; // Import the BlogPage styles
import apiClient from "../../api/apiClient";
import { Toast } from "react-bootstrap";
import apiPaths from "../../api/apiPath";
function BlogPage() {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [blogs, setBlogs] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const token = localStorage.getItem("token");
  const [showToast, setShowToast] = useState(false);

  const handleAddBlog = (newBlog) => {
    setBlogs([...blogs, newBlog]);
    setShowToast(true);
  };

  const [isDataFetched, setIsDataFetched] = useState(false);
  useEffect(() => {
    const refreshData = async () => {
      try {
        const response = await apiClient.get(apiPaths.blogs);
        setData(response.data);
        console.log(response.data);
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
                `/blog/image/${blog.blogId}`,
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
    <>
      <div className="blog-page">
        <h1 className="blog-page__title">Blog Page</h1>
        <div className="error-message">{error}</div>
        {token && (
          <button onClick={handleOpenModal} className="add-button">
            Add Blog
          </button>
        )}
        <AddBlog
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onBlogAdded={handleAddBlog}
        />
        <div className="grid">
          {blogs.length === 0 ? (
            <h2
              className="text-center"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              No Blogs Available
            </h2>
          ) : (
            blogs.map((blog) => {
              const { blogTitle, blogContent, createDateTime, imageUrl } = blog;
              return (
                <div
                  className="blog-item"
                  style={{
                    width: "24rem",
                    height: "18rem",
                    boxShadow: "rgba(0, 0, 0, 0.24) 0px 2px 3px",
                    margin: "10px",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <img
                    src={imageUrl}
                    alt={blogTitle}
                    style={{
                      width: "100%",
                      height: "180px",
                      objectFit: "cover",
                      padding: "5px",
                      margin: "0",
                    }}
                  />
                  <div
                    className="card-body"
                    style={{
                      flexGrow: 1,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      padding: "10px",
                    }}
                  >
                    <div>
                      <h5
                        className="card-title"
                        style={{ margin: "0 0 10px 0" }}
                      >
                        {blogTitle}
                      </h5>
                      <div >
                        <p className="card-text"style={{ height: "10%", width: "240px" }}>{blogContent}</p>
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
              );
            })
          )}
        </div>
      </div>
      <Toast
        onClose={() => setShowToast(false)}
        show={showToast}
        delay={3000}
        autohide
        style={{
          position: "absolute",
          top: 20,
          right: 20,
        }}
      >
        <Toast.Header>
          <strong className="mr-auto">Success</strong>
        </Toast.Header>
        <Toast.Body>Blog added successfully!</Toast.Body>
      </Toast>
    </>
  );
}

export default BlogPage;
