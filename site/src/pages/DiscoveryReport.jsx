import React from "react";
import { useLocation } from "react-router-dom";
import { LayoutWithBack } from "../components/Layout/LayoutWithBack";

// This page will handle the info of a missing/stolen bike that has been found.
export const DiscoveryReport = ({ }) => {
  //
  const { state } = useLocation();

  return (
    <LayoutWithBack title="Rapportering">
      <div className="h-50 mx-auto mb-12 flex max-w-[385px] py-4 px-4 rounded-lg border bg-gray-800 shadow-lg hover:shadow-xl dark:bg-gray-800 sm:px-6 md:px-8 lg:px-10">
        <div className="text-center font-semibold ">
          <h1 className="text-white">Rapport af fundet cykel:</h1>
          <span className="text-gray-400 text-sm">{state.info.frame_number}</span>

          <img className="my-2" src={state.info.image.obj_url} alt="alt" />

          <h2 className="text-white">Fundet ved følgende adresse:</h2>
            <p className="py-2 mb-2 text-gray-400 text-sm">{state.info.address}</p>

          <h2 className="text-white">Note:</h2>
          <span className="text-gray-400 text-sm">{state.info.comment}</span>

        </div>
      </div>
    </LayoutWithBack>
  );
};

export default DiscoveryReport;
