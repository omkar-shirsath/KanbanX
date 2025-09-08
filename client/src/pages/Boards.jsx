import React from 'react'
import { useParams } from 'react-router-dom'
import Board from '../components/Board'
import { useEffect, useState } from 'react'
import axios from 'axios'

const Boards = () => {

    const { id } = useParams()
    const [myBoard, setMyBoard] = useState(null)
     const url = import.meta.env.VITE_BACKEND_URL;


    const fetchBoardDetails = async () => {
        try {
            const response = await axios.get(`${url}/boards/${id}`)
            setMyBoard(response.data)
        } catch (error) {
            console.error('Error fetching board details:', error)
        }
    }
    useEffect(() => {

        if (id) {
            fetchBoardDetails()
        }
    }, [id])


    return (
        <>
            {myBoard && <Board board={myBoard} columns={myBoard.columns} />}
        </>
    )
}

export default Boards