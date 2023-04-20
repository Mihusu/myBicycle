import React from "react";
import { useLocation } from "react-router-dom";

// This page will handle the info of a missing/stolen bike that has been found.
export const DiscoveryReport = ({}) => {
  //
  const { state } = useLocation();

  return (
    <div className="">
      <h1>Rapport af fundet cykel: {state.info.frame_number}</h1>
      <img src={state.info.image.obj_url} alt="alt" />

      <div className="">
        <h2>Fundet ved følgende adresse:</h2>
        <span>{state.info.address}</span>
        <h2>Beskrivelse:</h2>
        <span>{state.info.comment}</span>
      </div>
    </div>
  );
};

export default DiscoveryReport;
