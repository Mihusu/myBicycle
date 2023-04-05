import React from "react";
import secureLocalStorage from "react-secure-storage";
import useSWR from 'swr';
import { Link } from "react-router-dom";
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
                            Afsender: {data.sender.phone_number}
                        </h1>

                        <span className="flex-wrap items-start text-sm">
                            Du har modtaget en cykel overførsel
                        </span>

                        <h4 className="text-xs">Dato: {new Date(data.created_at).toLocaleDateString()}</h4>

                    </div>
                </div>
            </div>

            <Link to={`/mybikes`}>
                <div className="flex justify-center">
                    <button className="btn my-4 mt-8 flex w-full justify-center gap-2 bg-green-500 py-2 px-4 text-green-100" type="submit" onClick={() => approveBikeRequest()} style={{ maxWidth: "425px" }}>
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
