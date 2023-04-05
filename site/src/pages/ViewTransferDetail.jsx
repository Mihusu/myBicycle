import React from "react";
import { useParams } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";
import useSWR from 'swr';
import { LayoutWithBack } from "../components/Layout/LayoutWithBack"
import { BikeComponent } from "../components/MyBikes/BikeComponent";

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

    const { data, error, isLoading } = useSWR([API_URL + `/transfers/${transfer_id}`, token], ([url, token]) => get_bike_request_detail(url, token))

    if (error) return <div>failed to load, due to error {error}</div>
    if (isLoading) return <div>loading...</div>

    console.log(data);

    return (
        <LayoutWithBack title="Overførsel">
            <BikeComponent data={data.bike} />
            <div className="flex max-w-[425px] mx-auto rounded-lg bg-gray-800 shadow dark:text-whites sm:px-3 md:px-8 lg:px-10 py-4 mt-8">
                <div className="flex justify-evenly mt-2 w-full">
                    <div className="flex items-center justify-center">
                        <img
                            src={data.bike.image.obj_url}
                            alt="alt"
                            className="rounded-lg w-[64px] h-[64px] text-sm"
                        />
                    </div>

                    <div className="flex flex-col mr-2">
                        <h1 className="text-lg text-white">
                            Modtager: {data.receiver.phone_number}
                        </h1>

                        <span className="flex-wrap items-start text-sm">
                            Du anmoder om overførsel af en cykel
                        </span>

                        <h4 className="text-xs">Dato: {new Date(data.created_at).toLocaleDateString()}</h4>

                    </div>
                </div>
            </div>
        </LayoutWithBack>
    )
}

export default ViewTransferDetail;
