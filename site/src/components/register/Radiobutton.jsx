import React from "react";

const RadioButton = ({ labelName, name, color }) => {
  const [isChecked, setIsChecked] = React.useState(false);

  const handleOnChange = (e) => {
    setIsChecked(e.target.checked);
  };

  return (
    <div className="form-control place-items-end">
      <label className="cursor-pointer label w-24 flex justify-between">
        <span className="label-text px-2">{labelName}</span>
        <input
          type="radio"
          name={name}
          defaultChecked={isChecked}
          className={color}
          value=""
          onChange={handleOnChange}
        />
      </label>
    </div>
  );
};
export default RadioButton;
