import React, { useState } from "react";
import useSWR from "swr";
import secureLocalStorage from "react-secure-storage";
import { Link, useParams, useNavigate } from "react-router-dom";
import { LayoutWithBack } from "../components/Layout/LayoutWithBack";
import { BikeInfo } from "../components/MyBikes/BikeInfo";
import formatPhonenumber from "../Helpers/phone";

const API_URL = import.meta.env.VITE_API_URL;

const get_bike_request = async (url, token) => {
  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(response.status)
  }
  return result;
};

const BikeTransferAccept = () => {
  const navigate = useNavigate();
  const { transfer_id } = useParams();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const token = secureLocalStorage.getItem("accesstoken");

  const { data, error, isLoading } = useSWR(
    [API_URL + `/transfers/${transfer_id}`, token],
    ([url, token]) => get_bike_request(url, token),
    { refreshInterval: 5000 }
  );

  if (error && error.message === "404") {
    console.error(error);
    return navigate("/mybikes");
  } else if (error) return <div>failed to load, due to error </div>;

  async function approveBikeRequest() {
    setIsSubmitting(true);

    const approve_bike_request =
      API_URL + `/transfers/${data.transfer_id}/accept`;

    const response = await fetch(approve_bike_request, {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    const res = await response.json();

    setIsSubmitting(false);
  }

  return (
    <LayoutWithBack title="Anmodning" isLoading={isLoading}>
      {data && data.bike && (
        <>
          <BikeInfo data={data.bike} />
          <div className="dark:text-whites mx-auto mt-8 flex max-w-[385px] rounded-lg border bg-gray-800 hover:shadow-xl dark:bg-gray-800 py-4 shadow">
            <div className="mt-2 flex w-full justify-evenly">
              <div className="flex items-center justify-center">
                <img
                  src={data.bike.image.obj_url}
                  alt="alt"
                  className="h-[60px] w-[60px] rounded-lg text-sm"
                />
              </div>

              <div className="mr-2 flex flex-col">
                <h1 className="text-lg text-white">
                  Afsender:
                  <span className="font-light text-white px-1">
                    {formatPhonenumber(data.sender.phone_number)}
                  </span>
                </h1>

                <span className="flex-wrap items-start text-sm">
                  Du har modtaget en cykel overførsel
                </span>

                <h4 className="text-xs">
                  Dato: {new Date(data.created_at).toLocaleDateString('en-GB')}
                </h4>
              </div>
            </div>
          </div>

          <Link to={`/mybikes`}>
            <div className="flex justify-center">
              <button
                className={`btn my-4 mt-8 flex w-full justify-center gap-2 bg-green-500 py-2 px-4 text-green-100 ${isSubmitting && 'loading'}`}
                type="submit"
                onClick={() => approveBikeRequest()}
                style={{ maxWidth: "385px" }}
              >
                {!isSubmitting &&
                  <>
                    <span className="text-center mb-0.5">Godkend</span>
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
                  </>
                }
              </button>
            </div>
          </Link>
        </>
      )}
    </LayoutWithBack>
  );
};

export default BikeTransferAccept;
