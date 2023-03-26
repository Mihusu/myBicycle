import React from "react";
import secureLocalStorage from "react-secure-storage";
import useSWR from 'swr';
import { LayoutWithBack } from "../components/Layout/LayoutWithBack"
import { BikeComponent } from "../components/MyBikes/BikeComponent";
import { SwipeButton } from "../components/MyBikes/SwipeButton";

const API_URL = import.meta.env.VITE_API_URL

const get_bike_request_detail = async (url, token) => {
    const response = await fetch(url, {
        method: "GET",
        headers: {
            Authorization: "Bearer " + token,
        },
    })
    return await response.json();
}

const ViewTransferDetail = () => {

    const token = secureLocalStorage.getItem('accesstoken')

    const { data, error, isLoading } = useSWR([API_URL + '/bikes/me', token], ([url, token]) => get_bike_request_detail(url, token))

    if (error) return <div>failed to load, due to error {error}</div>
    if (isLoading) return <div>loading...</div>

    console.log(data);

    return (
        <LayoutWithBack title="Overførsel">
            {data && data.map((bike_info, key) =>
                <BikeComponent data={bike_info} key={key} />
            )}
            <div className="flex justify-center my-8 bg-white rounded-lg mx-auto shadow dark:bg-gray-800 dark:text-white sm:px-3 md:px-8 lg:px-10 py-4" style={{ maxWidth: "425px" }}>
                <h1 className="mb-2" style={{ maxWidth: "425px" }}>
                    Ejeren:
                    <div className="mt-2 ml-10 text-lg">Navn: Something</div>
                    <img src="image-url" alt="alt-text" className="inline-block h-4 w-4 mr-4 text-sm" />
                    <span className="text-sm ml-2">Du anmoder om overførsel af en cykel</span>
                    <div className="text-xs ml-10">Dato: {new Date(data.created_at).toLocaleDateString()} </div>
                </h1>
            </div>
        </LayoutWithBack>
    )
}

export default ViewTransferDetail;