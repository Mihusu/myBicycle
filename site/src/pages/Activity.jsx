import React from "react";
import useSWR from 'swr'
import secureLocalStorage from "react-secure-storage";
import { Layout } from "../components/Layout/Layout";
import { BikeSenderRequest } from "../components/MyBikes/BikeSenderRequest";
import { OldBikeRequest } from "../components/MyBikes/OldBikeRequest";
import { BikeReceiverRequest } from "../components/MyBikes/BikeReceiverRequest";

const API_URL = import.meta.env.VITE_API_URL

const get_bike_requests = async (url, token) => {
    const response = await fetch(url, {
        method: "GET",
        headers: {
            Authorization: "Bearer " + token,
        },
    })
    return await response.json();
}

const Activity = () => {

    const token = secureLocalStorage.getItem('accesstoken')

    const { data, error, isLoading } = useSWR([API_URL + '/activities', token], ([url, token]) => get_bike_requests(url, token))

    if (error) return <div>failed to load, due to error {error}</div>
    if (isLoading) return <div>loading...</div>

    console.log(data);

    // render data
    return (
        <Layout title="Aktiviteter">
            <div className="">
                {data && data.outgoing_transfer_requests.map((transfer_info, key) =>
                    <BikeSenderRequest data={transfer_info} key={key} />
                )}
            </div>
            <div className="mt-8">
                {data && data.incoming_transfer_requests.map((transfer_info, key) =>
                    <BikeReceiverRequest data={transfer_info} key={key} />
                )}
            </div>
            <div className="flex justify-center text-2xl text-white">
            Gennemførte overførelser
            </div>
            <div className="mt-2">
                {data && data.completed_transfers.map((transfer_info, key) =>
                    <OldBikeRequest data={transfer_info} key={key} />
                )}
            </div>
        </Layout>
    )
}

export default Activity;