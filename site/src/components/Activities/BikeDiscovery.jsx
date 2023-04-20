import React from "react";
import { IoIosArrowForward } from "react-icons/io";
import { Link } from "react-router-dom";
export const BikeDiscovery = ({ data }) => {
  return (
    <Link to="/discoveryreport/${data.id" state={{ info: data }}>
      <div className="dark:text-whites mx-auto flex max-w-[425px] rounded-lg bg-gray-800 py-4 shadow">
        {/* Old bike requests */}
        <div className="flex w-full justify-evenly">
          <div className="flex items-center justify-center">
            <img
              src={data.image.obj_url}
              alt="alt"
              className="h-[64px] w-[64px] rounded-lg text-sm"
            />
          </div>

          <div className="flex flex-col">
            <h1 className="text-lg text-white">
              Fundet cykel med følgende stelnummer:{data.frame_number}
            </h1>

            <h4 className="text-xs">
              Dato: {new Date(data.created_at).toLocaleDateString()}
            </h4>
          </div>

          <div className="flex items-center">
            <IoIosArrowForward color="white" size={25} />
          </div>
        </div>
      </div>
    </Link>
  );
};
