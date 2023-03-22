import React from 'react'
import { Footer } from '../Footers/footer'

export const Layout = ({ title = "Ukendt", children }) => {
    return (
        <>
            <div id='layout' className='bg-gray-800 w-screen h-screen'>
                <div className='p-4 pb-20'>
                    {/* Header */}
                    <div className='mb-4 border-b-gray-400'>
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
