import React from "react";
import { useParams } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";
import useSWR from "swr";
import { LayoutWithBack } from "../components/Layout/LayoutWithBack";

const API_URL = import.meta.env.VITE_API_URL;

const get_bike_request_detail = async (url, token) => {
  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  return await response.json();
};

const ViewTransferDetail = () => {
  const { transfer_id } = useParams();

  const token = secureLocalStorage.getItem("accesstoken");
  const user_id = secureLocalStorage.getItem("user_id");
  console.log(user_id);

  const { data, error, isLoading } = useSWR(
    [API_URL + `/transfers/${transfer_id}`, token],
    ([url, token]) => get_bike_request_detail(url, token)
  );

  if (error) return <div>failed to load, due to error {error}</div>;

  return (
    <LayoutWithBack title="Overførsel" isLoading={isLoading}>
      {data && (
        <div className="mx-auto flex max-w-[385px] flex-col items-center space-y-4 rounded-lg bg-gray-800 p-4">
          <h2 className="mr-1 text-lg font-semibold text-white">
            {user_id === data.sender.id &&
              data.state === "pending" &&
              "Du er ved at overføre ejerskab"}
            {user_id === data.sender.id &&
              data.state === "declined" &&
              "Din anmodning blev afvist"}
            {user_id === data.sender.id &&
              data.state === "accepted" &&
              "Du overførte din cykel"}
            {user_id === data.receiver.id &&
              data.state === "declined" &&
              "Du afviste en anmodning"}
            {user_id === data.receiver.id &&
              data.state === "accepted" &&
              "Du modtog en cykel"}
          </h2>
          <img
            className="px-4"
            src={data.bike.image.obj_url}
            width="360px"
            height="360px"
          />
          <p className="mr-1 font-semibold text-white">Modtager: </p>
          <p className="font-light text-gray-300">
            {data.receiver.phone_number}
          </p>

          <div className="flex justify-center">
            {/* Outgoing */}
            {!data.closed_at && (
              <h4 className="font-light text-gray-300">
                {new Date(data.created_at).toLocaleDateString()} •{" "}
                {new Date(data.created_at)
                  .toLocaleTimeString()
                  .replaceAll(".", ":")}
              </h4>
            )}
            {/* Finished */}
            {data.closed_at && (
              <h4 className="font-light text-gray-300">
                {new Date(data.closed_at).toLocaleDateString()} •{" "}
                {new Date(data.closed_at)
                  .toLocaleTimeString()
                  .replaceAll(".", ":")}
              </h4>
            )}
          </div>
        </div>
      )}
    </LayoutWithBack>
  );
};

export default ViewTransferDetail;
