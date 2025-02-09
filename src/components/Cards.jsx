import React from "react";

const Cards = ({_id ,image, eventName, description, date, createrName }) => {
 
  return (
    <div className=" ">
      <div className="card bg-amber-400 lg:w-80 md:2-80 sm: w-60 shadow-xl">
        <figure>
          <img src={image} alt="image" className="sm:w-10 md:w-[100%]" />
        </figure>
        <div className="flex flex-col mt-2 mb-2">
          <span className="text-base font-semibold ml-2 text-amber-800">
            Event Title: <span>{eventName}</span>
          </span>
          <p className="ml-2 text-amber-800 italic text-sm">{description}</p>
          <h2 className="text-base font-semibold ml-2 text-amber-800">
            Organized By: {createrName}
          </h2>
          <h2 className="text-base font-semibold ml-2 text-amber-800">
            Date: {date}
          </h2>
        </div>
        <button type="button" className="btn hover:bg-gray-800 hover:text-white btn-outline text-black w-20 mb-2 mx-auto"> Join</button>
      </div>
    </div>
  );
};

export default Cards;
