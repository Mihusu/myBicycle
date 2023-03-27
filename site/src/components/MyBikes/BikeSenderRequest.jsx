import React from "react";
import secureLocalStorage from "react-secure-storage";
import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const API_URL = import.meta.env.VITE_API_URL;

export const BikeSenderRequest = ({ data }) => {
    const [isOpen, setIsOpen] = useState(false);

    async function retractBikeRequest() {
        const retract_bike_request =
            API_URL + `/transfers/${data.transfer_id}/retract`;

        const token = secureLocalStorage.getItem("accesstoken");

        const response = await fetch(retract_bike_request, {
            method: "PUT",
            headers: {
                Authorization: "Bearer " + token,
            },
        });

        const res = await response.json();
        console.log(res);
    }

    return (
        <div className="flex flex-col mx-auto max-w-[425px] rounded-lg bg-gray-800 py-4 shadow dark:text-whites">
            <div className="flex justify-center text-white text-xl">Anmodning</div>
            <motion.div
                transition={{ layout: { duration: 1, type: "spring" } }}
                layout
                onClick={() => setIsOpen(!isOpen)}
                className="flex justify-evenly mt-2 ml-1 w-full"
            >
                <div className="flex items-center justify-center">
                    <img
                        src={data.bike.image.obj_url}
                        alt="alt"
                        className="rounded-lg w-[64px] h-[64px] text-sm"
                    />
                </div>

                <div className="flex flex-col mr-7">
                    <h1 className="text-lg text-white">
                        Modtager: {data.receiver.phone_number}
                    </h1>

                    <span className="flex-wrap items-start text-sm">
                        Du anmoder om overførsel af en cykel
                    </span>

                    <h4 className="text-xs">Dato: {new Date(data.created_at).toLocaleDateString()}</h4>
                </div>
            </motion.div>

            {isOpen && (
                <div className="mt-4" style={{ display: "flex", justifyContent: "center" }}>
                    <button
                        className="btn flex w-40 max-w-xs justify-evenly bg-red-500 text-green-100 "
                        type="submit"
                        onClick={() => retractBikeRequest()}
                        style={{ marginRight: "6px" }}>
                        Afvis
                    </button>
                    <Link to={`/transfers/detail/${data.transfer_id}`}>
                        <button
                            className="btn flex w-40 max-w-xs justify-evenly bg-green-500 text-green-100"
                            type="button"
                            style={{ marginLeft: "6px" }}>
                            Åben
                        </button>
                    </Link>
                </div>
            )}

        </div>
    );
};
