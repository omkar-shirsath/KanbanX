import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Card, Col, Row } from 'react-bootstrap';
import { Modal, Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'

import { toast } from 'react-toastify'


// import { FaRegClipboard } from 'react-icons/fa';

const DashBoardHome = ({ userId }) => {
  const navigate = useNavigate();

  const [show, setShow] = useState(false);
  const [newBoard, setNewBoard] = useState({ title: '', description: '' });
  const [boards, setBoards] = useState([])
  const url = import.meta.env.VITE_BACKEND_URL;


  const getUserBoards = async (id) => {
    try {
      const response = await axios.get(`${url}/boards/api/${id}`)
      setBoards(response.data)
    } catch (error) {
      console.error('Error fetching boards:', error)
    }
  }

  const fetchData = async () => {

    if (userId) {
      await getUserBoards(userId)
    }
  }
  useEffect(() => {
    fetchData()
  }, [userId])


  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewBoard({ ...newBoard, [name]: value });
  };

  const handleSubmit = async (e) => {
    const toastId = toast.loading("Creating New Board...");

    e.preventDefault();
    // Add logic to create a new board
    try {
      await axios.post(`${url}/boards`, {
        title: newBoard.title,
        desc: newBoard.description,
        userId: userId
      });
      toast.update(toastId, {
        render: "Board created successfully!",
        type: "success",
        isLoading: false,
        autoClose: 2000,
      });
      // console.log('Board created successfully:', response.data);
      fetchData()

    } catch (error) {
      console.error('There was an error creating the board!', error);
      toast.update(toastId, {
        render: 'Board Not Created!',
        type: "error",
        isLoading: false,
        autoClose: 2000,
      });
    }

    handleClose();
  };

  const handleDelete = async (id) => {
    const toastId = toast.loading("Deleting Board...");

    try {
      await axios.delete(`${url}/boards/${id}`);
      toast.update(toastId, {
        render: "Board deleted successfully!",
        type: "success",
        isLoading: false,
        autoClose: 2000,
      });
      fetchData();
    } catch (error) {
      console.error('There was an error deleting the board!', error);
      toast.update(toastId, {
        render: 'Board not deleted!',
        type: "error",
        isLoading: false,
        autoClose: 2000,
      });
    }
  }

  const handleView = (id) => {
    navigate(`/board/${id}`)
  }

  return (
    <div>

      <Row className='p-3'>
        <Col>
          <h3 className='py-2'>My boards</h3>
        </Col>
        <Col className='text-right'>
          <button className='btn btn-primary' onClick={handleShow}>Create New Board</button>
        </Col>
      </Row>
      <Row >
        {boards.length == 0 ? "No Boards availble" : boards.map((board) => (
          <Col key={board.id} sm={12} md={6} lg={4} className='p-2'>
            <Card>
              <Card.Body>
                <Card.Title>
                  {/* <FaRegClipboard />  */}
                  {board.title}
                </Card.Title>
                <Card.Text>
                  {board.description}
                </Card.Text>
                <Button variant="danger" className="float-right mx-2" onClick={() => handleDelete(board._id)}>
                  Delete
                </Button>
                <Button variant="info" className="float-right mx-2" onClick={() => { handleView(board._id) }}>
                  View
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create New Board</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit} >
            <Form.Group controlId="formBoardTitle" className='mb-2'>
              <Form.Label>Board Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter board name"
                name="title"
                value={newBoard.title}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formBoardDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter description"
                name="description"
                value={newBoard.description}
                onChange={handleChange}
              />
            </Form.Group>
            <Button variant="primary" className='my-2' type="submit">
              Create
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>

  )
}

export default DashBoardHome