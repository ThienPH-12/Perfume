import React, { useState, useEffect } from "react";
import { Modal, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./AddBlog.scss";
import apiClient from "../api/apiClient";
import { ErrorToastify } from "./Toastify";
import apiPaths from "../api/apiPath";

function AddBlog({ isOpen, onClose, onBlogAddedOrUpdated, blog }) {
  const [blogReq, setBlogReq] = useState({
    blogId: null,
    blogTitle: "",
    blogContent: "",
  });
  const [image, setImage] = useState(null);
  const [errors, setErrors] = useState({});

  const clearForm = () => {
    setBlogReq({
      blogId: null,
      blogTitle: "",
      blogContent: "",
    });
    setImage(null);
    setErrors({});
  };

  useEffect(() => {
    if (isOpen) {
      if (blog) {
        setBlogReq({
          blogId: blog.blogId,
          blogTitle: blog.blogTitle,
          blogContent: blog.blogContent,
        });
      } else {
        clearForm();
      }
    } else {
      clearForm();
    }
  }, [isOpen, blog]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBlogReq({ ...blogReq, [name]: value });
  };

  const validateInputs = () => {
    const newErrors = {};
    if (!blogReq.blogTitle.trim()) {
      newErrors.blogTitle = "Title cannot be blank.";
    } else if (blogReq.blogTitle.split(" ").length > 100) {
      newErrors.blogTitle = "Title cannot exceed 100 words.";
    }
    if (!blogReq.blogContent.trim()) {
      newErrors.blogContent = "Content cannot be blank.";
    } else if (blogReq.blogContent.split(" ").length < 150) {
      newErrors.blogContent = "Content must have at least 150 words.";
    }
    if (!image && !blog) {
      newErrors.imageFile = "Image cannot be blank.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateInputs()) {
      return;
    }

    const formDataToSend = new FormData();
    if (image) {
      formDataToSend.append("imageFile", image);
    }
    formDataToSend.append(
      "blogReq",
      new Blob([JSON.stringify(blogReq)], { type: "application/json" })
    );

    try {
      if (blog) {
        await apiClient.put(apiPaths.blogSave, formDataToSend);
        onBlogAddedOrUpdated("Blog updated successfully!");
      } else {
        await apiClient.post(apiPaths.blogSave, formDataToSend);
        onBlogAddedOrUpdated("Blog added successfully!");
      }
      onClose();
    } catch (error) {
      ErrorToastify(error.response.data || "An error occurred while saving the blog.");
    }
  };

  return (
    <Modal size="xl" show={isOpen} onHide={onClose}>
      <div id="AddBlog">
        <Modal.Header closeButton>
          <Modal.Title>{blog ? "Edit Blog" : "Add Blog"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Control type="hidden" name="blogId" value={blogReq.blogId || ""} />
            <Form.Group controlId="formBlogTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter blog title"
                name="blogTitle"
                value={blogReq.blogTitle}
                onChange={handleChange}
                isInvalid={!!errors.blogTitle}
              />
              <Form.Control.Feedback type="invalid">
                {errors.blogTitle}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="formBlogContent">
              <Form.Label>Content</Form.Label>
              <Form.Control
                as="textarea"
                rows={10}
                placeholder="Enter blog content"
                name="blogContent"
                value={blogReq.blogContent}
                onChange={handleChange}
                isInvalid={!!errors.blogContent}
              />
              <Form.Control.Feedback type="invalid">
                {errors.blogContent}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="formBlogImage">
              <Form.Label>Image(Tối đa 100Kb)</Form.Label>
              <Form.Control
                type="file"
                name="imageFile"
                onChange={(e) => setImage(e.target.files[0])}
                isInvalid={!!errors.imageFile}
              />
              <Form.Control.Feedback type="invalid">
                {errors.imageFile}
              </Form.Control.Feedback>
            </Form.Group>
            <button className="add-button" type="submit">
              {blog ? "Update" : "Add"}
            </button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <button className="add-button" onClick={onClose}>
            Close
          </button>
        </Modal.Footer>
      </div>
    </Modal>
  );
}

export default AddBlog;
