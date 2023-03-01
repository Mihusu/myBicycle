import React from "react";

const RadioButton = ({ labelName, name, color, value }) => {
  const [isChecked, setIsChecked] = React.useState(false);

  const handleOnChange = (e) => {
    setIsChecked(e.target.checked);
  };

  return (
    <div className="form-control place-items-center ">
      <label className="cursor-pointer label w-full flex justify-between">
        <span className="label-text px-2">{labelName}</span>
        <input
          type="radio"
          name={name}
          defaultChecked={isChecked}
          className={color}
          value={value}
          onChange={handleOnChange}
          required
        />
      </label>
    </div>
  );
};
export default RadioButton;
