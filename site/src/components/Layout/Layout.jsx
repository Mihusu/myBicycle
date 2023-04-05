import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Footer } from './Footer'

export const Layout = ({ title = "Ukendt", isLoading = false, children }) => {

    const [showSidebar, setShowSidebar] = useState(false);

    const toggleSidebar = () => { setShowSidebar(!showSidebar) }

    return (
        <>
            <div id='layout'>
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

                {/* Sidebar */}
                <div className={`absolute top-0 -right-64 w-3/5 h-full bg-gray-800 border-l border-white rounded-tl-lg transition ease-in-out ${showSidebar ? '-translate-x-64' : 'translate-x-0'} `}>
                    <ul className="flex flex-col justify-center items-center p-2 space-y-4 text-white">
                        <li onClick={toggleSidebar} className='self-end p-2 hover:bg-orange-400 rounded-sm cursor-pointer'>X</li>
                        <Link to="/claimbike">
                            <li className='px-16 hover:bg-orange-400 rounded-sm'>
                                Indløs cykel
                            </li>
                        </Link>
                        <li className='px-16 hover:bg-orange-400 rounded-sm'>Profil</li>
                    </ul>
                </div>

            </div>

            <Footer toggleSidebar={toggleSidebar} />
        </>
    )
}
