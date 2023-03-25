import React from "react";
import secureLocalStorage from "react-secure-storage";
import { Link } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL

export const BikeReceiverRequest = ({ data }) => {

    async function declineBikeRequest() {

        const decline_bike_request = (API_URL + `/transfers/${data._id}/reject`)

        const token = secureLocalStorage.getItem('accesstoken')

        const response = await fetch(decline_bike_request, {
            method: "POST",
            headers: {
                Authorization: "Bearer " + token,
            },
        })

        const res = await response.json()
        console.log(res)
    }

    return (
        <div className="flex justify-center bg-white rounded-lg mx-auto shadow dark:bg-gray-800 dark:text-white sm:px-3 md:px-8 lg:px-10 py-4" style={{ maxWidth: "425px" }}>
            <div className="flex flex-col items-center">
                <div className="p-2 text-2xl">
                    Anmodning
                    <div className="space-y-2 py-4">
                        <h1 className="mb-2 text-xl">
                            <div className="ml-10">Navn: Something</div>
                            <img src="image-url" alt="alt-text" className="inline-block h-4 w-4 mr-4 text-sm" />
                            <span className="text-sm ml-2">Du har modtaget en overførsel af en cykel</span>
                            <div className="text-xs ml-10">Dato: {new Date(data.created_at).toLocaleDateString()} </div>
                        </h1>
                    </div>
                </div>
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <button className="btn flex w-40 max-w-xs justify-center bg-red-500 text-green-100 " type="submit" onClick={ () => declineBikeRequest()} style={{ marginRight: '0.2px' }}>
                        Afvis
                    </button>
                    <Link to={'/activities/detail'}>
                        <button className="btn flex w-40 max-w-xs justify-center bg-green-500 text-green-100" type="button" style={{ marginLeft: '0.2px' }}>
                            Åben
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    )
}