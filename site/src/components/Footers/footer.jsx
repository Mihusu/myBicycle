import React from "react";
import { IconContext } from "react-icons";
import { TbActivityHeartbeat } from "react-icons/tb";
import { MdDirectionsBike } from "react-icons/md";
import { IoIosMenu } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";


export const Footer = () => {

    return (

        <div className="fixed bottom-0 left-0 flex flex-row justify-around w-full items-center sm:px-6 md:px-8 lg:px-10 bg-gray-800 border-t border-white rounded-t-md">
            <div className="btm-nav-lg py-1 mt-auto sm:px-6 md:px-8 lg:px-10">
                <Link to="/mybikes">
                    <button className="rounded hover:bg-orange-500 dropdown-active px-8 py-1">
                        <IconContext.Provider value={{ className: "mx-auto", color: "white", size: 40 }}>
                            <>
                                <MdDirectionsBike />
                                <p className="text-sky-400/100">Hjem</p>
                            </>
                        </IconContext.Provider>
                    </button>
                </Link>
                <Link to="/activities">
                    <button className="rounded hover:bg-orange-500 dropdown-active px-8 py-1">
                        <IconContext.Provider value={{ className: "mx-auto", color: "white", size: 40 }}>
                            <>
                                <TbActivityHeartbeat />
                                <p className="text-sky-400/100">Aktiviteter</p>
                            </>
                        </IconContext.Provider>
                    </button>
                </Link>
                <Link to="/settings">
                    <button className="rounded hover:bg-orange-500 dropdown-active px-8 py-1">
                        <IconContext.Provider value={{ className: "mx-auto", color: "white", size: 40 }}>
                            <>
                                <IoIosMenu />
                                <p className="text-sky-400/100">Menu</p>
                            </>
                        </IconContext.Provider>
                    </button>
                </Link>
            </div>
        </div>

    )
}

