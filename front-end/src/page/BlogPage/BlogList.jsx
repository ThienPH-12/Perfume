import React from 'react';

function BlogList({ blogs }) {
  return (
    <div>
      {blogs.length === 0 ? (
        <p>No blogs available.</p>
      ) : (
        blogs.map((blog, index) => (
          <div key={index} className="blog-item">
            <h2>{blog.title}</h2>
            <p>{blog.content}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default BlogList;
