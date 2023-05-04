import React from "react";
import { Link } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";

export const TransferCompleted = ({ data, user_id }) => {
  return (
    <Link to={`/transfers/detail/${data.transfer_id}`}>
      <div className="dark:text-whites mx-auto flex max-w-[385px] rounded-lg border bg-gray-800 py-4 shadow hover:shadow-xl dark:bg-gray-800">
        {/* Old bike requests */}
        <div className="flex w-full justify-evenly">
          <div className="flex items-center justify-center">
            <img
              src={data.bike.image.obj_url}
              alt="alt"
              className="h-[60px] w-[60px] rounded-lg text-sm mt-1"
            />
          </div>

          <div className="flex flex-col">
            <h1 className="text-lg text-white">
              {user_id === data.sender.id
                ? `Modtager: ${data.receiver.phone_number}`
                : `Afsender: ${data.sender.phone_number}`}
            </h1>

            <span className="flex-wrap items-start break-words text-sm text-gray-300">
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
            </span>

            <h4 className="text-xs text-gray-300">
              Dato: {new Date(data.closed_at).toLocaleDateString('en-GB')}
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
