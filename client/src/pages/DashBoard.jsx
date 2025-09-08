import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import NavbarD from '../components/NavbarD'
import Board from '../components/Board'
import JWTAuth from '../auth/JWTAuth'
import axios from 'axios'
import DashBoardHome from '../components/DashBoardHome'



const DashBoard = () => {

    const [user, setUser] = useState({})
    const url = import.meta.env.VITE_BACKEND_URL;

    const getUser = async (id) => {
        try {
            const response = await axios.get(`${url}/users/${id}`)
            setUser(response.data)
        } catch (error) {
            console.error('Error fetching user:', error)
        }
    }

   

    useEffect(() => {
        const fetchData = async () => {
            const userID = JWTAuth()
            if (userID) {
                await getUser(userID)
            }
        }
        fetchData()
    }, [])





    return (
        <>
            <DashBoardHome userId={user._id} />
        </>
    )
}

export default DashBoard