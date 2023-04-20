import React from "react";
import { useNavigate } from "react-router-dom";

// This page will handle the info of a missing/stolen bike that has been found.
export const FoundBikeReport = () => {
  //

  const navigate = useNavigate();

  return (
    <div className="">
      <h1>Rapport af fundet cykel</h1>
      <img src={img} alt="icons" />

      <div className="">
        <h2>Fundet ved følgende adresse:</h2>
        <span></span>
        <h2>Beskrivelse:</h2>
        <span></span>
      </div>
    </div>
  );
};

export default Home;
