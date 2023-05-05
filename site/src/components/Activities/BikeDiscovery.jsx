import React from "react";
import { IoIosArrowForward } from "react-icons/io";
import { Link } from "react-router-dom";
export const BikeDiscovery = ({ data }) => {
  return (
    <Link to={`/discoveryreport/${data.id}`} state={{ info: data }}>
      <div className="flex flex-col mx-auto max-w-[385px] rounded-lg border bg-gray-800 hover:shadow-xl dark:bg-gray-800 py-4 mb-4 shadow dark:text-whites">
        {/* Old bike requests */}
        <div className="flex justify-center text-white text-xl">Rapportering</div>
        <div className="flex justify-evenly my-2 w-full">
          <div className="flex items-start justify-center mr-1">
            <img
              src={data.image.obj_url}
              alt="alt"
              className="rounded-lg w-[60px] h-[60px] text-sm mt-1.5"
            />
          </div>

          <div className="flex flex-col mr-2">
            <h1 className="text-md text-white">
              Fundet cykel med følgende 
            </h1>
            <p className="text-md text-white">stelnummer: {data.frame_number}</p>

            <h4 className="py-1 text-xs">Dato: {new Date(data.created_at).toLocaleDateString('en-GB')}</h4>
          </div>

          <div className="flex items-center">
            <IoIosArrowForward color="white" size={25} />
          </div>
        </div>
      </div>
    </Link>
  );
};
