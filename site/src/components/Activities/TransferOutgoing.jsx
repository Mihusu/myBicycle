import React, { useState } from "react";
import secureLocalStorage from "react-secure-storage";
import { Link, useNavigate } from "react-router-dom";
import formatPhonenumber from "../../Helpers/phone";

const API_URL = import.meta.env.VITE_API_URL;

export const TransferOutgoing = ({ data }) => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function retractBikeRequest() {
    setIsSubmitting(true);

    try {
      const retract_bike_request =
        API_URL + `/transfers/${data.transfer_id}/retract`;

      const token = secureLocalStorage.getItem("accesstoken");

      const response = await fetch(retract_bike_request, {
        method: "PUT",
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      if (!response.ok) {
        return;
      }

      setTimeout(() => {
        navigate(`/mybikes`);
        setIsSubmitting(false);
      }, 1500);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="flex flex-col max-w-[385px] mb-4 rounded-lg border dark:text-whites mx-auto bg-gray-800 py-4 shadow hover:shadow-xl dark:bg-gray-800">
      <div className="flex justify-center text-xl text-white">Anmodning</div>
      <div className="mt-2 flex w-full justify-evenly">
        <div className="ml-2 flex items-start justify-center">
          <img
            src={data.bike.image.obj_url}
            alt="alt"
            className="mt-3 h-[56px] w-[56px] rounded-lg text-sm mr-2"
          />
        </div>

        <div className="mr-2 flex flex-col space-y-1">
          <h1 className="mr-1 text-lg font-semibold text-white">Modtager: {formatPhonenumber(data.receiver.phone_number)}</h1>
          <p className="flex-wrap items-start break-words text-sm text-gray-300">
            Du er ved at afgive ejerskab af cyklen
          </p>

          <h4 className="text-xs text-gray-300">
            Dato: {new Date(data.created_at).toLocaleDateString('en-GB')}
          </h4>
        </div>
      </div>

      {/* Actions */}
      <div
        className="mt-4"
        style={{ display: "flex", justifyContent: "center" }}
      >
        <button
          className={`btn w-40 max-w-xs bg-red-600 text-white ${
            isSubmitting && "loading"
          }`}
          type="submit"
          onClick={() => retractBikeRequest()}
          style={{ marginRight: "6px" }}
        >
          {!isSubmitting && <>Fortryd</>}
        </button>
        <Link to={`/transfers/detail/${data.transfer_id}`}>
          <button
            className="btn w-40 max-w-xs bg-sky-400 text-white"
            type="button"
            style={{ marginLeft: "6px" }}
          >
            Åbn
          </button>
        </Link>
      </div>
    </div>
  );
};
