import React from "react";
import { useLocation } from "react-router-dom";
import { Layout } from "../components/Layout/Layout";

// This page will handle the info of a missing/stolen bike that has been found.
export const DiscoveryReport = ({}) => {
  //
  const { state } = useLocation();

  return (
    <Layout title="Aktiviteter">
      <div className="h-50 mx-auto mx-auto  mb-4 flex flex w-80 max-w-[425px] rounded-lg border bg-gray-800 shadow-lg hover:shadow-xl dark:bg-gray-800 sm:px-6 md:px-8 lg:px-10">
        <div className="text-center font-semibold ">
          <h1 className="text-white">Rapport af fundet cykel:</h1>
          <span className="text-gray-400">{state.info.frame_number}</span>

          <img className="my-2" src={state.info.image.obj_url} alt="alt" />

          <div className="">
            <h2 className="text-white">Fundet ved følgende adresse:</h2>
            <div className="py-2 text-center">
              <span className="text-gray-400">{state.info.address}</span>
              <h2 className="text-white">Beskrivelse:</h2>
              <span className="text-gray-400">{state.info.comment}</span>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DiscoveryReport;
