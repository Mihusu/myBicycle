import React, { useEffect } from "react";
import useSWR from "swr"
import { TbActivityHeartbeat } from "react-icons/tb";
import { MdDirectionsBike } from "react-icons/md";
import { IoIosMenu } from "react-icons/io";
import { Link } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";


const API_URL = import.meta.env.VITE_API_URL


const get_activities = (url, token) => {

    return fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then((res) => res.json())
        .catch((err) => console.log(err))
}

export const Footer = () => {

    const ACTIVITY_CHECKING_INTERVAL = 1000; //ms

    const token = secureLocalStorage.getItem('accesstoken');

    const { data } = useSWR(
        [API_URL + '/activities', token],
        ([url, token]) => get_activities(url, token),
        { refreshInterval: ACTIVITY_CHECKING_INTERVAL, revalidateOnMount: false }
    )

    return (
        <div className="fixed bottom-0 left-0 flex flex-row justify-around w-full items-center sm:px-6 md:px-8 lg:px-10 bg-gray-800 border-t border-white rounded-t-md">
            <div className="flex btm-nav-lg py-1 mt-auto sm:px-6 md:px-8 lg:px-10">
                <Link to="/mybikes">
                    <button className="flex flex-col space-y-1 rounded hover:bg-orange-500 dropdown-active px-8 py-1">
                        <MdDirectionsBike className="mx-auto" color="white" size={40} />
                        <p className="text-sky-400/100">Hjem</p>
                    </button>
                </Link>
                <Link to="/activities">
                    <button className="flex rounded hover:bg-orange-500 dropdown-active px-8 py-1">
                        <div className="relative flex flex-col space-y-1">
                            <TbActivityHeartbeat className="mx-auto" color="white" size={40} />
                            <p className="text-sky-400/100">Aktiviteter</p>
                            {/* Alert badge */}
                            {data?.alerts && <div className="absolute bottom-12 left-14 badge badge-md bg-sky-400/100 border-sky-400/100 text-white">{data.alerts}</div>}
                        </div>

                    </button>
                </Link>
                <Link to="/settings">
                    <button className="flex flex-col space-y-1 rounded hover:bg-orange-500 dropdown-active px-8 py-1">
                        <IoIosMenu className="mx-auto" color="white" size={40} />
                        <p className="text-sky-400/100">Menu</p>
                    </button>
                </Link>
            </div>
        </div>

    )
}
