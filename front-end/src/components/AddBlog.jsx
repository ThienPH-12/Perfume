import React, { useState, useEffect } from "react";
import { Modal, Form } from "react-bootstrap"; // Removed Toast import
import "bootstrap/dist/css/bootstrap.min.css";
import "./AddBlog.scss";
import { addBlog } from "../api/apiClient";
import { jwtDecode } from "jwt-decode";

function AddBlog({ isOpen, onClose, onBlogAdded }) {
  const [show, setShow] = useState(isOpen);
  const [blogReq, setBlogReq] = useState({
    blogTitle: "",
    blogContent: "",
    createUserName: "",
  });
  const [image, setImage] = useState(null);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const decodedToken = jwtDecode(token);
    setBlogReq({ ...blogReq, createUserName: decodedToken.sub });

    const formDataToSend = new FormData();
    formDataToSend.append("imageFile", image);
    formDataToSend.append(
      "blogReq",
      new Blob([JSON.stringify(blogReq)], { type: "application/json" })
    );

    try {
      await console.log("formDataToSend", formDataToSend);
      const response = await addBlog(formDataToSend); // Use the new function from apiClient
      onBlogAdded(response.data);
      handleClose();
    } catch (error) {
      console.error("There was an error adding the blog!", error);
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <div id="AddBlog">
          <Modal.Header closeButton>
            <Modal.Title>Add New Blog</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formBlogTitle">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter blog title"
                  name="blogTitle"
                  value={blogReq.blogTitle}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="formBlogContent">
                <Form.Label>Content</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Enter blog content"
                  name="blogContent"
                  value={blogReq.blogContent}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="formBlogImage">
                <Form.Label>Image</Form.Label>
                <Form.Control
                  type="file"
                  name="imageFile"
                  onChange={(e) => setImage(e.target.files[0])}
                />
              </Form.Group>
              <button className="add-button" type="submit">
                Submit
              </button>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <button className="add-button" onClick={handleClose}>
              Close
            </button>
          </Modal.Footer>
        </div>
      </Modal>
    </>
  );
}

export default AddBlog;
