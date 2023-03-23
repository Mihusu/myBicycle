import React from "react";
import secureLocalStorage from "react-secure-storage";
import { Link } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL

export const BikeSenderRequest = ({ data, mutate }) => {

    async function retractBikeRequest() {

        const retract_bike_request = (API_URL + `/transfers/${data._id}/retract`)

        const token = secureLocalStorage.getItem('accesstoken')

        const response = await fetch(retract_bike_request, {
            method: "PUT",
            headers: {
                Authorization: "Bearer " + token,
            },
        })

        const res = await response.json()
        console.log(res)

        //mutate({...data})
    }

    return (
        <div className="flex justify-center bg-white rounded-lg mx-auto shadow dark:bg-gray-800 dark:text-white sm:px-3 md:px-8 lg:px-10 py-4" style={{ maxWidth: "425px" }}>
            <div className="flex flex-col items-center">
                <div className="mb-2 p-2 text-2xl mr-12">
                    Anmodning
                    <div className="space-y-2 py-4">
                        <h1 className="mb-2 text-xl">
                            <div className="ml-10">Navn: Something</div>
                            <img src="image-url" alt="alt-text" className="inline-block h-4 w-4 mr-4 text-sm" />
                            <span className="text-sm ml-2">Du anmoder om overførsel af en cykel</span>
                            <div className="text-xs ml-10">Dato: {new Date(data.created_at).toLocaleDateString()} </div>
                        </h1>
                    </div>
                </div>
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <button className="btn flex w-40 max-w-xs justify-center bg-red-500 text-green-100 " type="submit" onClick={() => retractBikeRequest()} style={{ marginRight: '0.2px' }}>
                        Fortryd
                    </button>
                    <Link to={'/activities/{:id}'}>
                        <button className="btn flex w-40 max-w-xs justify-center bg-green-500 text-green-100" type="button" style={{ marginLeft: '0.2px' }}>
                            Åben
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    )
}