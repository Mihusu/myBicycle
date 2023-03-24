import React from "react";
import useSWR from 'swr'
import secureLocalStorage from "react-secure-storage";
import { Layout } from "../components/Layout/Layout";
import { BikeSenderRequest } from "../components/MyBikes/BikeSenderRequest";
import { OldBikeRequest } from "../components/MyBikes/OldBikeRequest";

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

    const { data, error, isLoading, mutate } = useSWR([API_URL + '/activities', token], ([url, token]) => get_bike_requests(url, token))

    if (error) return <div>failed to load, due to error {error}</div>
    if (isLoading) return <div>loading...</div>

    console.log(data);

    // render data
    return (
        <Layout title="Aktiviteter">
            <>
                { data && data.outgoing_transfer_requests.map((bike_info, key) =>
                    <BikeSenderRequest data={bike_info} mutate={mutate} key={key} />
                )}
            </>
            <OldBikeRequest />
        </Layout>
    )
}

export default Activity;