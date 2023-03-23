import React from 'react'
import { HiArrowLeft } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom'
import { Footer } from './Footer'

export const LayoutWithBack = ({ title = "Ukendt", children }) => {

    const navigate = useNavigate();

    return (
        <>
            <div id='layout' className=''>
                <div className='p-4 pb-20'>
                    {/* Header */}
                    <div className='flex justify-around items-center mb-4 border-b-gray-400'>
                        <button onClick={() => navigate(-1)}>
                            <HiArrowLeft size={24} />
                        </button>
                        <h1 className='text-3xl text-white'>{title}</h1>
                    </div>
                    {/* Content */}
                    {children}
                </div>

            </div>
            <Footer />
        </>
    )
}
