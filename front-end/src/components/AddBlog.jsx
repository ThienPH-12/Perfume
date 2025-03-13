import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Toast } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { addBlog } from '../api/apiClient';
import { jwtDecode } from 'jwt-decode';

function AddBlog({ isOpen, onClose, onBlogAdded }) {
  const [show, setShow] = useState(isOpen);
  const [blogTitle, setTitle] = useState('');
  const [blogContent, setContent] = useState('');
  const [blogImage, setImage] = useState(null);
  const [showToast, setShowToast] = useState(false);

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
    const formData = new FormData();
    formData.append('blogTitle', blogTitle);
    formData.append('blogContent', blogContent);
    formData.append('createUserName', decodedToken.sub);
    if (blogImage) {
      formData.append('imageFile', blogImage);
    }
    try {
     await console.log('formData', formData);
      const response = await addBlog(formData); // Use the new function from apiClient
      onBlogAdded(response.data);
      setShowToast(true);
      handleClose();
    } catch (error) {
      console.error("There was an error adding the blog!", error);
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
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
                value={blogTitle}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formBlogContent">
              <Form.Label>Content</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter blog content"
                value={blogContent}
                onChange={(e) => setContent(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formBlogImage">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <Toast
        onClose={() => setShowToast(false)}
        show={showToast}
        delay={3000}
        autohide
        style={{
          position: 'absolute',
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

export default AddBlog;
