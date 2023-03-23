import React from "react";
import { Layout } from "../components/Layout/Layout";
import useSWR from 'swr'
import secureLocalStorage from "react-secure-storage";
import { BikeRequest } from "../components/MyBikes/BikeRequest";
import { OldBikeRequest } from "../components/MyBikes/OldBikeRequest";


const API_URL = import.meta.env.VITE_API_URL

const Activity = () => {

    const get_requests = async (url, token) => {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                Authorization: "Bearer " + token,
            },
        })
        return await response.json();
    }

    const token = secureLocalStorage.getItem('accesstoken')

    const { data, error, isLoading } = useSWR([API_URL + '/activities', token], ([url, token]) => get_requests(url, token))

    console.log(data);
    if (error) return <div>failed to load, due to error {error}</div>
    if (isLoading) return <div>loading...</div>

    console.log(data);

    // render data
    return (
        <Layout title="Aktiviteter">
            <BikeRequest/>
            
            <OldBikeRequest/>
        </Layout>
    )
}

export default Activity;