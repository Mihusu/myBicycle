import React from 'react'
import { HiArrowLeft } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom'
import { Footer } from './Footer'

export const LayoutWithBack = ({ title = "Ukendt", isLoading = false, children}) => {

    const navigate = useNavigate();
    
    return (
        <>
            <div id='layout-back' className=''>
                <div className='p-4 pb-20'>
                    {/* Header */}
                    <div className='flex justify-around items-center mb-4 border-b-gray-400'>
                        <button onClick={() => navigate(-1)}>
                            <HiArrowLeft size={24} />
                        </button>
                        <h1 className='flex-grow text-3xl text-white text-center mr-4'>{title}</h1>
                    </div>
                    {/* Content */}
                    {isLoading ? (
                        <div className="flex justify-center">
                            <button className="btn-outline loading btn border-none" />
                        </div>
                    ) : (
                        children
                    )}
                </div>
            </div>

            <Footer />
        </>
    )
}
