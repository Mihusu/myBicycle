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

    const { data, error, isLoading } = useSWR(
        [API_URL + `/transfers/${transfer_id}`, token], 
        ([url, token]) => get_bike_request_detail(url, token),
        { refreshInterval: 5000 }
        );

    if (error) return <div>failed to load, due to error {error}</div>
    
    return (
        <LayoutWithBack title="Overførsel" isLoading={isLoading}>
            {data && <div className="flex flex-col mx-auto space-y-4 items-center p-4 border bg-gray-800 hover:shadow-xl dark:bg-gray-800 rounded-lg max-w-[425px]">
                <h2 className="text-lg">
                    {user_id === data.sender.id && data.state === "pending"    && "Du er ved at overføre ejerskab"}
                    {user_id === data.sender.id && data.state === "declined"   && "Din anmodning blev afvist"}
                    {user_id === data.sender.id && data.state === "accepted"   && "Du overførte din cykel"}
                    {user_id === data.receiver.id && data.state === "declined" && "Du afviste en anmodning"}
                    {user_id === data.receiver.id && data.state === "accepted" && "Du modtog en cykel"}
                </h2>
                <img src={data.bike.image.obj_url} width="360px" height="360px"/>
                <p className="text-md">Modtager: {data.receiver.phone_number}</p>
                <div className="flex justify-center">
                    {/* Outgoing */}
                    {!data.closed_at && <h4 className="text-md">{new Date(data.created_at).toLocaleDateString()} • {new Date(data.created_at).toLocaleTimeString().replaceAll(".",":")}</h4>}
                    {/* Finished */}
                    {data.closed_at && <h4 className="text-md">{new Date(data.closed_at).toLocaleDateString()} • {new Date(data.closed_at).toLocaleTimeString().replaceAll(".",":")}</h4>}
                </div>
            </div>}
        </LayoutWithBack>
    )
}

export default ViewTransferDetail;
