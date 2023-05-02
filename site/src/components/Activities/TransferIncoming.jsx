import React from "react";
import secureLocalStorage from "react-secure-storage";
import { Link, useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

export const TransferIncoming = ({ data }) => {
    
    const navigate = useNavigate()
    async function declineBikeRequest() {
        const decline_bike_request =
            API_URL + `/transfers/${data.transfer_id}/reject`;

        const token = secureLocalStorage.getItem("accesstoken");

        const response = await fetch(decline_bike_request, {
            method: "PUT",
            headers: {
                Authorization: "Bearer " + token,
            },
        });

        const res = await response.json();
        navigate(0)
    }

    return (
        <div className="flex flex-col mx-auto max-w-[425px] rounded-lg border bg-gray-800 hover:shadow-xl dark:bg-gray-800 py-4 shadow dark:text-whites">
            <div className="flex justify-center text-white text-xl">Anmodning</div>
            <div className="flex justify-evenly mt-2 w-full">
                <div className="flex items-start justify-center ml-2">
                    <img
                        src={data.bike.image.obj_url}
                        alt="alt"
                        className="rounded-lg w-[56px] h-[56px] text-sm mt-3"
                    />
                </div>

                <div className="flex flex-col space-y-1 mr-2">
                    <h1 className="text-lg text-white">
                        Afsender: {data.sender.phone_number}
                    </h1>

                    <p className="flex-wrap items-start text-sm break-words">
                        Du har modtaget et tilbud om at overtage ejerskab
                    </p>

                    <h4 className="text-xs">Dato: {new Date(data.created_at).toLocaleDateString()}</h4>
                </div>
            </div>

            {/* Actions */}
            <div className="flex justify-center mt-4">
                <button
                    className="btn bg-red-600 w-40 max-w-xs text-white mr-2"
                    type="submit"
                    onClick={() => declineBikeRequest()}
                    reloadDocument="true">
                    Afvis
                </button>
                <Link to={`/transfers/accept/${data.transfer_id}`}>
                    <button
                        className="btn bg-sky-400 w-40 max-w-xs text-white ml-2"
                        type="button"
                    >
                        Åbn
                    </button>
                </Link>
            </div>
        </div>
    );
};
