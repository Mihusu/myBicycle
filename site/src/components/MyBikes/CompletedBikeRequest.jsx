import React from "react";
import { Link } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import { IconContext } from "react-icons";

export const CompletedBikeRequest = ({ data }) => {
  return (
    <div
      className="mx-auto mb-2 flex  justify-center rounded-lg bg-gray-800 py-4 shadow dark:bg-gray-800 dark:text-white sm:px-3 md:px-8 lg:px-10"
      style={{ maxWidth: "425px" }}
    >
      {/* Old bike requests */}
      <Link to={`/transfers/detail/${data.transfer_id}`}>
        <button className="flex flex-col">
          <h1 className="mb-2 text-xl">
            <div className="mr-3 text-lg text-white">
              Mobilnummer: {data.receiver.phone_number}{" "}
            </div>
            <div className="flex items-center justify-center">
              <img
                src="image-url"
                alt="alt-text"
                className="mr-3 inline-block h-4 w-4 text-sm"
              />
              <span className="ml-2 mr-5 text-sm text-white">
                Du anmoder om overførsel af en cykel
              </span>
              <IconContext.Provider
                value={{ className: "mx-auto", color: "white", size: 25 }}
              >
                <>
                  <IoIosArrowForward />
                </>
              </IconContext.Provider>
            </div>
            <div className="mr-40 text-xs">
              Dato: {new Date(data.closed_at).toLocaleDateString()}
            </div>
          </h1>
        </button>
      </Link>
    </div>
  );
};
