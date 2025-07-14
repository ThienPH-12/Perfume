import React, { useState, useEffect } from "react";
import AddBlog from "../../components/AddBlog";
import apiClient from "../../api/apiClient";
import apiPaths from "../../api/apiPath";
import { ErrorToastify, SuccessToastify } from "../../components/Toastify";

function BlogManage() {
  const [blogs, setBlogs] = useState([]);
  const [isBlogModalOpen, setIsBlogModalOpen] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);

  const fetchBlogs = async () => {
    try {
      const response = await apiClient.get(apiPaths.blogs);
      const blogsWithImages = await Promise.all(
        response.data.map(async (blog) => {
          try {
            const imageResponse = await apiClient.get(apiPaths.getBlogImageById(blog.blogId), {
              responseType: "blob",
            });
            const imageUrl = URL.createObjectURL(imageResponse.data);
            return { ...blog, imageUrl };
          } catch (error) {
            console.error("Error fetching image for blog ID:", blog.blogId, error);
            return { ...blog, imageUrl: "placeholder-image-url" };
          }
        })
      );
      setBlogs(blogsWithImages);
    } catch (error) {
      ErrorToastify("Error fetching blogs: " + error);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleBlogAddedOrUpdated = (message) => {
    fetchBlogs();
    setIsBlogModalOpen(false);
    setSelectedBlog(null); // Reset selected blog
    SuccessToastify(message);
  };

  const handleAddBlog = () => {
    setSelectedBlog(null); // Reset selected blog
    setIsBlogModalOpen(true); // Open modal for adding
  };

  const handleEditBlog = (blog) => {
    setSelectedBlog(blog); // Pass the selected blog to the modal
    setIsBlogModalOpen(true);
  };

  const handleDeleteBlog = async (blogId) => {
    try {
      await apiClient.delete(apiPaths.getBlogById(blogId));
      setBlogs(blogs.filter((blog) => blog.blogId !== blogId)); // Fix blogId filter
      SuccessToastify("Blog deleted successfully");
    } catch (error) {
      ErrorToastify("Error deleting blog: " + error);
    }
  };

  return (
    <div className="crudContainer">
      <h2>Blogs</h2>
      <button onClick={handleAddBlog} className="add-button">
        Add Blog
      </button>
      <table className="crud-table">
        <thead>
          <tr>
            <th>No</th>
            <th>Image</th>
            <th>Title</th>
            <th>Description</th>
            <th>Created Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {blogs.map((blog, index) => (
            <tr key={blog.blogId}>
              <td>{index + 1}</td>
              <td>
                <img
                  src={blog.imageUrl}
                  alt={blog.blogTitle}
                  style={{ width: "400px", height: "400px", objectFit: "cover" }} // Updated size to 400x400
                />
              </td>
              <td>{blog.blogTitle}</td>
              <td className="text-start">{blog.blogContent}</td> 
              <td>{new Date(blog.createDateTime).toLocaleString()}</td> 
              <td>
                <button onClick={() => handleEditBlog(blog)}>Edit</button>
                <button onClick={() => handleDeleteBlog(blog.blogId)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <AddBlog
        isOpen={isBlogModalOpen}
        onClose={() => setIsBlogModalOpen(false)}
        onBlogAddedOrUpdated={handleBlogAddedOrUpdated} // Updated prop name
        blog={selectedBlog} // Pass selected blog for editing
      />
    </div>
  );
}

export default BlogManage;
