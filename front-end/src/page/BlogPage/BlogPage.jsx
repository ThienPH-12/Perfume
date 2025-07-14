import React, { useEffect, useState } from "react";
import "./BlogPage.scss"; // Import the BlogPage styles
import apiClient from "../../api/apiClient";
import apiPaths from "../../api/apiPath";
import { useNavigate } from "react-router-dom";
import { ErrorToastify } from "../../components/Toastify"; // Import Toastify

function BlogPage() {
  const [data, setData] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  const fetchBlogs = async () => {
    try {
      const response = await apiClient.get(apiPaths.blogs);
      setData(response.data);
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

  useEffect(() => {
    const sections = document.querySelectorAll(".blog-container");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 } // Trigger when 10% of the element is visible
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect(); // Cleanup observer on component unmount
  }, []);

  return (
    <div id="BlogPage">
      <div className="blog-page">
        <h1 className="blog-page__title">Blog</h1>
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
                    <div
                      key={blogId}
                      className="blog-link"
                      onClick={() => navigate(`/blog/${blogId}`)}
                      style={{ cursor: "pointer" }}
                    >
                      <div className="blog-item">
                        <img
                          src={imageUrl}
                          alt={blogTitle}
                          className="blog-image"
                        />
                        <div className="card-body text-break">
                          <h5 className="card-title">{blogTitle}</h5>
                          ______
                          <div style={{ width: "100%" }}>
                            <p className="card-text">{blogContent.substring(0, 100)}</p>
                          </div>
                        </div>
                        <div>
                          <p style={{ padding: "10px" }}>
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
        </div>
      </div>
    </div>
  );
}

export default BlogPage;
