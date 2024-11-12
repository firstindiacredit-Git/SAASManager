import React from 'react'
import { useNavigate } from 'react-router-dom'
export function Back() {
    const navigate = useNavigate()
    

    return (
        <>
        <button className='text-black text-3xl rounded-sm' onClick={() => navigate(-1)}>⬅</button>
            
        </>
    )
}
