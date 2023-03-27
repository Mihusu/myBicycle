import React from "react";
import useSWR from 'swr'
import secureLocalStorage from "react-secure-storage";
import { Layout } from "../components/Layout/Layout";
import { BikeSenderRequest } from "../components/MyBikes/BikeSenderRequest";
import { CompletedBikeRequest } from "../components/MyBikes/CompletedBikeRequest";
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
    const user_id = secureLocalStorage.getItem('user_id')

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
            <div className="mt-4">
                {data && data.incoming_transfer_requests.map((transfer_info, key) =>
                    <BikeReceiverRequest data={transfer_info} key={key} />
                )}
            </div>
            <div className="flex justify-center text-2xl text-white mb-2 mt-8">
                Gennemførte overførelser
            </div>
            <div className="flex flex-col space-y-2 mb-4">
                {data && data.completed_transfers.map((transfer_info, key) =>
                    <CompletedBikeRequest data={transfer_info} key={key} user_id={user_id} />
                )}
            </div>
        </Layout>
    )
}

export default Activity;