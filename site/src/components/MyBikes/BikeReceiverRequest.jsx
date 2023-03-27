import React from "react";
import secureLocalStorage from "react-secure-storage";
import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const API_URL = import.meta.env.VITE_API_URL

export const BikeReceiverRequest = ({ data }) => {

    const [isOpen, setIsOpen] = useState(false);

    async function declineBikeRequest() {

        const decline_bike_request = (API_URL + `/transfers/${data.transfer_id}/reject`)

        const token = secureLocalStorage.getItem('accesstoken')

        const response = await fetch(decline_bike_request, {
            method: "PUT",
            headers: {
                Authorization: "Bearer " + token,
            },
        })

        const res = await response.json()
        console.log(res)
    }

    return (
        <div className="flex justify-center bg-white rounded-lg mx-auto shadow dark:bg-gray-800 dark:text-white sm:px-3 md:px-8 lg:px-10 py-2 mb-8" style={{ maxWidth: "425px" }}>
            <div className="flex flex-col items-center">
            <motion.div
                    transition={{ layout: { duration: 1, type: "spring" } }}
                    layout
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex flex-col space-y-2 cursor-pointer rounded-lg bg-gradient-to-r to-blue-500"
                >
                <div className="p-2 text-2xl">
                    Sender
                    <div className="space-y-2 mt-2">
                        <h1 className="mb-2 text-lg">
                            <div className="ml-10">Mobilnummer: {data.sender.phone_number}</div>
                            <img src="image-url" alt="alt-text" className="inline-block h-4 w-4 mr-4 text-sm" />
                            <span className="text-sm ml-2">Du har modtaget en overførsel af en cykel</span>
                            <div className="text-xs ml-10">Dato: {new Date(data.created_at).toLocaleDateString()} </div>
                        </h1>
                    </div>
                </div>
                </motion.div>
                {isOpen && (
                <div className="py-2" style={{ display: "flex", justifyContent: "center" }}>
                    <button className="btn flex w-40 max-w-xs justify-center bg-red-500 text-green-100 " type="submit" onClick={ () => declineBikeRequest()} style={{ marginRight: '0.2px' }}>
                        Afvis
                    </button>
                    <Link to={`/transfers/accept/${data.transfer_id}`}>
                        <button className="btn flex w-40 max-w-xs justify-center bg-green-500 text-green-100" type="button" style={{ marginLeft: '0.2px' }}>
                            Åben
                        </button>
                    </Link>
                </div>
                )}
            </div>
        </div>
    )
}