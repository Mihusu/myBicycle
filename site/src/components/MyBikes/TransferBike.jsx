import React from "react";

export const TransferBike = () => {
  return (
    <div className="m-0 box-border flex flex-col justify-center px-4 ">
      <div className="pt-4 pb-2 font-light text-gray-800 dark:text-white">
        Overfør til:
        <span className="required-dot text-red-500"> *</span>
      </div>
      <div className="form-control w-full max-w-xs">
        <PhoneNumber
          name="phone_number"
          control={control}
          rules={{ required: true }}
        />

        <div />
      </div>
    </div>
  );
};
