import React from "react";
import useSWR from "swr";
import secureLocalStorage from "react-secure-storage";
import { Layout } from "../components/Layout/Layout";
import { TransferIncoming } from "../components/Activities/TransferIncoming";
import { TransferOutgoing } from "../components/Activities/TransferOutgoing";
import { TransferCompleted } from "../components/Activities/TransferCompleted";
import { BikeDiscovery } from "../components/Activities/BikeDiscovery";

const API_URL = import.meta.env.VITE_API_URL;

const get_bike_requests = async (url, token) => {
  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  return await response.json();
};

const ActivityPage = () => {
  const token = secureLocalStorage.getItem("accesstoken");
  const user_id = secureLocalStorage.getItem("user_id");

  const { data, error, isLoading } = useSWR(
    [API_URL + "/activities", token],
    ([url, token]) => get_bike_requests(url, token), 
    { refreshInterval: 5000 }
  );

  if (error) return <div>failed to load, due to error {error}</div>;

  // render data
  return (
    <Layout title="Aktiviteter" isLoading={isLoading}>
      <div className="">
        {data &&
          data.outgoing_transfer_requests.map((transfer_info, key) => (
            <TransferOutgoing data={transfer_info} key={key} />
          ))}
      </div>
      <div className="mt-4">
        {data &&
          data.incoming_transfer_requests.map((transfer_info, key) => (
            <TransferIncoming data={transfer_info} key={key} />
          ))}
      </div>
      <div className="">
        {data &&
          data.discoveries.map((discovery_info, key) => (
            <BikeDiscovery data={discovery_info} key={key} />
          ))}
      </div>

      <div className="mb-2 mt-8 flex justify-center text-2xl text-white">
        Gennemførte overførelser
      </div>
      <div className="mb-4 flex flex-col space-y-2">
        {data &&
          data.completed_transfers.map((transfer_info, key) => (
            <TransferCompleted
              data={transfer_info}
              key={key}
              user_id={user_id}
            />
          ))}
      </div>
    </Layout>
  );
};

export default ActivityPage;
