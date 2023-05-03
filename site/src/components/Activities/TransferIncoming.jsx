import React, { useState } from "react";
import secureLocalStorage from "react-secure-storage";
import { Link, useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

export const TransferIncoming = ({ data }) => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function declineBikeRequest() {
    setIsSubmitting(true);

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
    navigate(0);
    setIsSubmitting(false);
  }

  return (
    <div className="dark:text-whites mx-auto flex max-w-[385px] flex-col rounded-lg border bg-gray-800 py-4 shadow hover:shadow-xl dark:bg-gray-800">
      <div className="flex justify-center text-xl text-white">Anmodning</div>
      <div className="mt-2 flex w-full justify-evenly">
        <div className="ml-2 flex items-start justify-center">
          <img
            src={data.bike.image.obj_url}
            alt="alt"
            className="mt-3 h-[56px] w-[56px] rounded-lg text-sm"
          />
        </div>

        <div className="mr-2 flex flex-col space-y-1">
          <h1 className="mr-1 text-lg font-semibold text-white">Afsender:</h1>
          <h2 className="font-light text-gray-300">
            {" "}
            {data.sender.phone_number}
          </h2>

          <p className="flex-wrap items-start break-words text-sm font-semibold text-white">
            Du har modtaget et tilbud om at overtage ejerskab
          </p>

          <h4 className="text-xs font-light text-gray-300">
            Dato: {new Date(data.created_at).toLocaleDateString()}
          </h4>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-4 flex justify-center">
        <button
          className={`btn mr-2 w-40 max-w-xs bg-red-600 text-white ${
            isSubmitting && "loading"
          }`}
          type="submit"
          onClick={() => declineBikeRequest()}
        >
          {!isSubmitting && <>Avis</>}
        </button>
        <Link to={`/transfers/accept/${data.transfer_id}`}>
          <button
            className="btn ml-2 w-40 max-w-xs bg-sky-400 text-white"
            type="button"
          >
            Åbn
          </button>
        </Link>
      </div>
    </div>
  );
};
