import React from "react";
import { useParams } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";
import useSWR from 'swr';
import { LayoutWithBack } from "../components/Layout/LayoutWithBack";


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

    const { transfer_id } = useParams();

    const token = secureLocalStorage.getItem('accesstoken');
    const user_id = secureLocalStorage.getItem('user_id');
    console.log(user_id);

    const { data, error, isLoading } = useSWR([API_URL + `/transfers/${transfer_id}`, token], ([url, token]) => get_bike_request_detail(url, token))

    if (error) return <div>failed to load, due to error {error}</div>
    if (isLoading) return <div>loading...</div>

    console.log(data);

    return (
        <LayoutWithBack title="Overførsel">
            <div className="flex flex-col space-y-4 items-center p-4 bg-gray-800 rounded-lg">
                <h2 className="text-lg">Du anmoder om ejerskifte</h2>
                <img src={data.bike.image.obj_url} width="360px" height="360px"/>
            </div>
        </LayoutWithBack>
    )
}

export default ViewTransferDetail;
