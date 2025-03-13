import React, { useState } from 'react';
import AddBlog from '../../components/AddBlog';
import BlogList from './BlogList';
import './BlogPage.scss'; // Import the BlogPage styles

function BlogPage() {
  const [blogs, setBlogs] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddBlog = (newBlog) => {
    setBlogs([...blogs, newBlog]);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="blog-page">
      <h1 className="blog-page__title">Blog Page</h1>
      <button  onClick={handleOpenModal} className="add-button">
        Add Blog
      </button>
      <AddBlog isOpen={isModalOpen} onClose={handleCloseModal} onBlogAdded={handleAddBlog} />
      <BlogList blogs={blogs} />
    </div>
  );
}

export default BlogPage;
