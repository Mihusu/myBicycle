import React from "react";
import { useState } from "react";

let color = "";
function setColor(arg) {
  color = arg;
  console.log(color);
}

export const Home = () => {
  return (
    
      <div className="flex w-full">
  <div className="grid h-fit max-w-fit flex-grow card bg-base-100 rounded-box place-items-center">

  <div className="card w-96 bg-base-100 shadow-xl image-full">
  <figure><img src="src\assets\redbike.svg" alt="Red" /></figure>
  <div className="card-body">
    
  </div>
</div>

  </div>
  <div className="divider divider-horizontal">OR</div>
  <div className="grid h-fit max-w-fit flex-grow card bg-base-100 rounded-box place-items-center">
  <div className="card w-96 bg-base-100 shadow-xl image-full">
  <figure><img src="src\assets\bluebike.svg" alt="Blue" /></figure>
  <div className="card-body">
    
  </div>
</div>
  </div>
</div>
    
    // <div className="card glass w-96">
    //   <figure>
    //     <img
    //       src="src\assets\redbike.svg"
    //       alt="red bike!"
    //     />
    //   </figure>
    //   <div className="card-body text-center">
    //     <h2 className="card-title self-center">Velkommen til MinCykel</h2>
    //     <p>Vil du tage den røde eller den blå cykel?</p>
    //     <div className="card-actions justify-around">
    //       <button className="btn bg-red-500 ">Rød!</button>
    //       <button className="btn bg-blue-500 ">Blå!</button>
    //     </div>
    //   </div>
    // </div>
  );
};

export default Home;
