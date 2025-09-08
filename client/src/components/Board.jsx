import React, { useEffect } from 'react'
// import Columns from './Columns'
// import Card from './Card'
import { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';

import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { toast } from 'react-toastify'


const ItemType = { TASK: "task" };

// Draggable Task Component
const Task = ({ col, task, handleDeleteTask }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: ItemType.TASK,
        item: { id: task._id, columnId: task.columnId },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }));

    return (

        <div className="card mt-2 hover:shadow-lg" ref={drag}>
            <div className="card-body d-flex justify-between items-center ">
                <span>{task.title}</span>
                <div className="d-flex">

                    <button className=" mx-1 hover:text-red-500 hover:scale-105 cursor-pointer" onClick={() => { handleDeleteTask(col._id, task._id) }}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5-4h4a2 2 0 012 2v1H8V5a2 2 0 012-2zm-6 4h16" />
                        </svg>
                    </button>
                </div>
            </div >
        </div >

    );
};

// Droppable Column Component
const Column = ({ col, tasks, moveTask, handleTaskModal, handleDeleteColumn, handleDeleteTask }) => {
    const [{ isOver }, drop] = useDrop(() => ({
        accept: ItemType.TASK,
        drop: (item) => {
            moveTask(item.id, col._id)
        },
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    }));



    return (

        <>
            <div className='w-[50%] h-full' ref={drop} style={{
                backgroundColor: isOver && "lightgray",
            }}>
                <div className={`px-3 bg-gray-200 font-bold rounded-md m-2 text-center p-2 flex items-center justify-between`}>
                    {col.title}
                    <div className="flex justify-end p-2">
                        <button onClick={() => handleTaskModal(col._id)} className="mx-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-400 hover:text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                            </svg>
                        </button>
                        <button onClick={() => handleDeleteColumn(col._id)}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-400 hover:text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5-4h4a2 2 0 012 2v1H8V5a2 2 0 012-2zm-6 4h16" />
                            </svg>
                        </button>
                    </div>
                </div>

                <div className='bg-gray-200 rounded-md m-2 text-center p-2 pb-3'>

                    {col.tasks.length == 0 ? "No Task available" : col.tasks.map((task) => (
                        // {col.tasks.map((task) => (

                        <Task col={col} task={task} handleDeleteTask={handleDeleteTask} />
                    ))}



                </div>


            </div >
        </>

    );
};


const Board = ({ board, columns }) => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
    const [newColumnTitle, setNewColumnTitle] = useState('');
    const [columnsData, setColumnsData] = useState([])

    const handleAddColumn = () => {
        setIsModalOpen(true);
    };

    const url = import.meta.env.VITE_BACKEND_URL;



    const fetchBoardDetails = async (id) => {
        try {
            const response = await axios.get(`${url}/boards/${id}`)
            setColumnsData(response.data.columns)
        } catch (error) {
            console.error('Error fetching board details:', error)
        }
    }

    useEffect(() => {
        setColumnsData(columns);
    }, [])


    const handleSaveColumn = async () => {
        const toastId = toast.loading("Creating new Column...");

        if (newColumnTitle) {

            const res = await axios.post(`${url}/columns/`, {
                title: newColumnTitle,
                boardId: board._id
            })

            toast.update(toastId, {
                render: "Column Created successfully!",
                type: "success",
                isLoading: false,
                autoClose: 2000,
            });

            fetchBoardDetails(board._id);
            setNewColumnTitle('');
            setIsModalOpen(false);
        }
    };

    const handleDeleteColumn = (id) => {

        const toastId = toast.loading("Deleting Column...");


        axios.delete(`${url}/columns/${id}`, {
            boardId: board._id
        }).then(response => {
            // console.log('Column deleted successfully', response);
            toast.update(toastId, {
                render: "Column Deleted successfully!",
                type: "success",
                isLoading: false,
                autoClose: 2000,
            });
            fetchBoardDetails(board._id)
            // Optionally, you can add more logic here, like updating the state or notifying the user
        })
            .catch(error => {
                console.error('There was an error deleting the column!', error);
                toast.update(toastId, {
                    render: 'Column not Deleted!',
                    type: "error",
                    isLoading: false,
                    autoClose: 2000,
                });
            });
    };

    const [newTaskTitle, setNewTaskTitle] = useState('');

    const [columnId, setColumnId] = useState('')
    const handleTaskModal = (id) => {
        setIsTaskModalOpen(true);
        setColumnId(id);
    }

    const handleSaveTask = async () => {

        const toastId = toast.loading("Creating new task...");

        if (newTaskTitle) {
            try {

                await axios.post(`${url}/tasks/`, {
                    title: newTaskTitle,
                    columnId,
                    boardId: board._id
                });
                toast.update(toastId, {
                    render: "Task Created successfully!",
                    type: "success",
                    isLoading: false,
                    autoClose: 2000,
                });
                fetchBoardDetails(board._id);
                setNewTaskTitle('');
                setIsTaskModalOpen(false);
            } catch (error) {
                console.error('Error saving task:', error);
                toast.update(toastId, {
                    render: "Task not created!",
                    type: "error",
                    isLoading: false,
                    autoClose: 2000,
                });
            }
        }
    };

    const handleDeleteTask = async (columnId, taskId) => {

        const toastId = toast.loading("Deleting Task...");

        try {

            await axios.delete(`${url}/tasks/${taskId}?columnId=${columnId}`);
            toast.update(toastId, {
                render: "Task Deleted successfully!",
                type: "success",
                isLoading: false,
                autoClose: 2000,
            });
            fetchBoardDetails(board._id);

        } catch (error) {
            console.error('There was an error deleting the task!', error);
            toast.update(toastId, {
                render: 'Task not deleted!',
                type: "error",
                isLoading: false,
                autoClose: 2000,
            });
        }
    };



    // Move task between columns and update MongoDB
    const moveTask = async (taskId, newColumnId) => {
        try {
            // Update in MongoDB
            const res = await axios.put(`${url}/tasks/${taskId}`, {
                columnId: newColumnId
            })

            console.log(res.data)

        } catch (error) {
            console.error("Error updating task:", error);
        }
        fetchBoardDetails(board._id);

    };

    return (
        <>

            <Modal show={isTaskModalOpen} onHide={() => setIsTaskModalOpen(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Task</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <input
                        type="text"
                        value={newTaskTitle}
                        onChange={(e) => setNewTaskTitle(e.target.value)}
                        placeholder="Task Title"
                        className="form-control"
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setIsTaskModalOpen(false)}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleSaveTask}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={isModalOpen} onHide={() => setIsModalOpen(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Column</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <input
                        type="text"
                        value={newColumnTitle}
                        onChange={(e) => setNewColumnTitle(e.target.value)}
                        placeholder="Column Title"
                        className="form-control"
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleSaveColumn}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>

            <div className='d-flex justify-between items-center border-b'>
                <h3>Project - {board.title}</h3>
                <Button onClick={handleAddColumn} className=" my-3">Add Column</Button>
            </div>


            <DndProvider backend={HTML5Backend}>



                <div className='mt-2 max-w-[100vw] flex flex-row gap-2 min-h-full  mb-2 p-3 justify-between'>

                    {
                        columnsData.map((col) => {
                            return (
                                <>

                                    <Column col={col} moveTask={moveTask} handleTaskModal={handleTaskModal} handleDeleteColumn={handleDeleteColumn} handleDeleteTask={handleDeleteTask} />
                                </>

                                // <Columns columnId={col._id} title={col.title} cards={<Card />} />
                            )
                        })
                    }


                </div >
            </DndProvider>

        </>
    )
}

export default Board