import React from "react";
import secureLocalStorage from "react-secure-storage";
import useSWR from 'swr';
import { useParams } from "react-router-dom";
import { LayoutWithBack } from "../components/Layout/LayoutWithBack"
import { BikeComponent } from "../components/MyBikes/BikeComponent";
import { SwipeButton } from "../components/MyBikes/SwipeButton";

const API_URL = import.meta.env.VITE_API_URL

const get_bike_request = async (url, token) => {
    const response = await fetch(url, {
        method: "GET",
        headers: {
            Authorization: "Bearer " + token,
        },
    })
    return await response.json();
}

const ViewTransferAccept = () => {

    const { transfer_id } = useParams();

    const token = secureLocalStorage.getItem('accesstoken')

    const { data, error, isLoading } = useSWR([API_URL + `/transfers/${transfer_id}`, token], ([url, token]) => get_bike_request(url, token))

    if (error) return <div>failed to load, due to error {error}</div>
    if (isLoading) return <div>loading...</div>

    console.log(data);

    async function approveBikeRequest() {

        const approve_bike_request = (API_URL + `/transfers/${data.transfer_id}/accept`)

        const response = await fetch(approve_bike_request, {
            method: "PUT",
            headers: {
                Authorization: "Bearer " + token,
            },
        })

        const res = await response.json()
        console.log(res)
    }

    return (
        <LayoutWithBack title="Overførsel">
            <BikeComponent data={data.bike} />

            <div className="flex justify-center bg-white rounded-lg mx-auto shadow dark:bg-gray-800 dark:text-white sm:px-3 md:px-8 lg:px-10 py-4" style={{ maxWidth: "425px" }}>
                <h1 className="mb-2 text-xl">
                    Ejeren:
                    <div className="mt-2 ml-10 text-lg">Mobilnummer: {data.sender.phone_number}</div>
                    <img src="image-url" alt="alt-text" className="inline-block h-4 w-4 mr-4 text-sm" />
                    <span className="text-sm ml-2">Du har modtaget en overførsel af en cykel</span>
                    <div className="text-xs ml-10">Dato: {new Date(data.created_at).toLocaleDateString()} </div>
                </h1>
            </div>
            
            <Link to={`/mybikes`}>
            <div className="flex justify-center">
                <button className="btn my-4 mt-8 flex w-full justify-center gap-2 bg-green-500 py-2 px-4 text-green-100" type="submit" onClick={ () => approveBikeRequest( )} style={{ maxWidth: "425px" }}>
                    Godkend
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="h-8 w-8"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                        />
                    </svg>
                </button>
            </div>
            </Link>
        </LayoutWithBack>
    )
}

export default ViewTransferAccept;
