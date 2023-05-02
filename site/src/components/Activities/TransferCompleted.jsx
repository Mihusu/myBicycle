import React from "react";
import { Link } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";

export const TransferCompleted = ({ data, user_id }) => {

    return (
        <Link to={`/transfers/detail/${data.transfer_id}`}>
            <div className="flex mx-auto max-w-[425px] rounded-lg border bg-gray-800 hover:shadow-xl dark:bg-gray-800 py-4 shadow dark:text-whites">
                {/* Old bike requests */}
                <div className="flex justify-evenly w-full">

                    <div className="flex items-center justify-center">
                        <img
                            src={data.bike.image.obj_url}
                            alt="alt"
                            className="rounded-lg w-[64px] h-[64px] text-sm"
                        />
                    </div>

                    <div className="flex flex-col">
                        <h1 className="text-lg text-white">
                            {user_id === data.sender.id 
                            ? `Modtager: ${data.receiver.phone_number}` 
                            : `Afsender: ${data.sender.phone_number}` }
                        </h1>

                        <span className="flex-wrap items-start text-sm break-words">
                            {user_id === data.sender.id && data.state === "declined"   && "Din anmodning blev afvist"}
                            {user_id === data.sender.id && data.state === "accepted"   && "Du overførte din cykel"}
                            {user_id === data.receiver.id && data.state === "declined" && "Du afviste en anmodning"}
                            {user_id === data.receiver.id && data.state === "accepted" && "Du modtog en cykel"}
                        </span>

                        <h4 className="text-xs">Dato: {new Date(data.closed_at).toLocaleDateString()}</h4>
                    </div>

                    <div className="flex items-center">
                        <IoIosArrowForward color="white" size={25} />
                    </div>

                </div>
            </div>
        </Link>
    );
};
