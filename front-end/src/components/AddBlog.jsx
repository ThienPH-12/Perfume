import React, { useState, useEffect } from "react";
import { Modal, Form } from "react-bootstrap"; // Removed Toast import
import "bootstrap/dist/css/bootstrap.min.css";
import "./AddBlog.scss";
import apiClient from "../api/apiClient";
import { ErrorToastify } from "./Toastify"; // Fixed import
import apiPaths from "../api/apiPath";

function AddBlog({ isOpen, onClose, onBlogAdded }) {
  const [show, setShow] = useState(isOpen);
  const [blogReq, setBlogReq] = useState({
    blogTitle: "",
    blogContent: "",
  });
  const [image, setImage] = useState(null);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setBlogReq({ ...blogReq, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    setShow(isOpen);
  }, [isOpen]);

  const handleClose = () => {
    setShow(false);
    onClose();
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
    if (!image) {
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

    setBlogReq({ ...blogReq });

    const formDataToSend = new FormData();
    formDataToSend.append("imageFile", image);
    formDataToSend.append(
      "blogReq",
      new Blob([JSON.stringify(blogReq)], { type: "application/json" })
    );

    try {
      await console.log("formDataToSend", formDataToSend);
      const response = apiClient.post(apiPaths.blogAdd, formDataToSend);
      onBlogAdded(response.data);
      handleClose();
    } catch (error) {
      ErrorToastify("There was an error when adding the blog:"+error);
    }
  };

  return (
    <>
      <Modal size="xl" show={show} onHide={handleClose}>
        <div id="AddBlog">
          <Modal.Header closeButton>
            <Modal.Title>Thêm BLog Mới</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formBlogTitle">
                <Form.Label>Tiêu đề</Form.Label>
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
                <Form.Label>Nội dung</Form.Label>
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
                <Form.Label>Hình ảnh</Form.Label>
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
                Xác nhận
              </button>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <button className="add-button" onClick={handleClose}>
              Đóng
            </button>
          </Modal.Footer>
        </div>
      </Modal>
    </>
  );
}

export default AddBlog;
