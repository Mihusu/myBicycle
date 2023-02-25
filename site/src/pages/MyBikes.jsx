import { useState } from "react";
import BikeComponent from "../components/MyBikes/BikeComponent";

const MineCykler = () => {
  const [count, setCount] = useState(0);
  let col_val = 500;

  return (
    <div className="container max-w-sm mx-auto p-2 space-y-2 ">
      {[...Array(4)].map((_, key) => {
        return <BikeComponent />;
      })}
    </div>
  );
};

export default MineCykler;
