import React from 'react'
import { Footer } from './Footer'

export const Layout = ({ title = "Ukendt", isLoading = false, children }) => {

    return (
        <>
            <div id='layout' className=''>
                <div className='p-4 pb-20'>
                    {/* Header */}
                    <div className='flex justify-center mb-4 border-b-gray-400'>
                        <h1 className='text-3xl text-white'>{title}</h1>
                    </div>
                    {/* Content */}
                    {isLoading ?
                        <div className='flex justify-center'>
                            <button className="btn btn-outline border-none loading"></button>
                        </div>
                        :
                        children
                    }
                </div>

            </div>
            <Footer />
        </>
    )
}
