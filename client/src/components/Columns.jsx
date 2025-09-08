import React, { useState } from 'react'
import axios from 'axios';

const Columns = ({ title, cards, columnId, color = "orange" }) => {
        const url = import.meta.env.VITE_BACKEND_URL;


    const handleDeleteColumn = () => {

        axios.delete(`${url}/columns/${columnId}`)
            .then(response => {
                console.log('Column deleted successfully');
                // Optionally, you can add more logic here, like updating the state or notifying the user
            })
            .catch(error => {
                console.error('There was an error deleting the column!', error);
            });
    };
    const [bgColor, setBgColor] = useState(`bg-gray-200`)
    return (
        <>
            <div className='w-[50%] h-full'>
                <div className={`${bgColor} rounded-md m-2 text-center p-2 flex items-center justify-between`}>
                    {title}
                    <div className="flex justify-end p-2">
                        <button onClick={handleDeleteColumn}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-400 hover:text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5-4h4a2 2 0 012 2v1H8V5a2 2 0 012-2zm-6 4h16" />
                            </svg>
                        </button>
                    </div>
                </div>

                {
                    cards
                }



            </div>
        </>
    )
}

export default Columns