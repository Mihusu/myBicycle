import React from 'react';
import { IconContext } from 'react-icons';
import { TbActivityHeartbeat } from 'react-icons/tb';
import { MdDirectionsBike } from 'react-icons/md';
import { IoIosMenu } from 'react-icons/io';


export const Footer = () => {
    return (
        <div className="flex flex-row justify-around w-full items-center mt-auto">
            <div className="btm-nav-lg py-1">
                <button className="rounded hover:bg-orange-500 dropdown-active px-10 py-1">
                    <IconContext.Provider value={{ className: "mx-auto", color: "white", size: 40 }}>
                        <>
                            <MdDirectionsBike />
                            <p className="text-sky-400/100">Hjem</p>
                        </>
                    </IconContext.Provider>
                </button>
                <button className="rounded hover:bg-orange-500 dropdown-active px-10 py-1">
                    <IconContext.Provider value={{ className: "mx-auto", color: "white", size: 44 }}>
                        <>
                            <TbActivityHeartbeat />
                            <p className="text-sky-400/100">Aktiviteter</p>
                        </>
                    </IconContext.Provider>
                </button>
                <button className="rounded hover:bg-orange-500 dropdown-active px-10 py-1">
                    <IconContext.Provider value={{ className: "mx-auto", color: "white", size: 44 }}>
                        <>
                            <IoIosMenu />
                            <p className="text-sky-400/100">Menu</p>
                        </>
                    </IconContext.Provider>
                </button>
            </div>
        </div>
    )
}

