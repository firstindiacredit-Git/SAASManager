// import React from 'react'
// import { useNavigate } from 'react-router-dom'
// export function Back() {
//     const navigate = useNavigate()
    

//     return (
//         <>
//         <button className='text-3xl rounded-sm' onClick={() => navigate(-1)}>⬅</button>
            
//         </>
//     )
// }

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeftLong } from "react-icons/fa6";

export function Back() {
    const navigate = useNavigate();

    return (
        <button
            onClick={() => navigate(-1)}
            className="flex items-center space-x-2 text-lg px-3 py-2 rounded-md text-gray-700 -translate-x-3 hover:-translate-x-4 hover:text-blue-500 transition duration-200"
        >
            <FaArrowLeftLong />
            {/* Add icon with specified size */}
            {/* <span>Back</span> Optional text for better accessibility */}
        </button>
    );
}
