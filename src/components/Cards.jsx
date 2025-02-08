import React from "react";

const Cards = ({ image, eventName, description, date }) => {
  return (
    <div className=" ">
    <div className="card bg-amber-200 w-80 shadow-xl">
      <figure>
        <img src={image} alt="image" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">Event Title-{'>'} {eventName}</h2>
        <p>{description}</p>
        <h2 className="card-title">Date-{'>'} {date}</h2>
      </div>
    </div>
  
    </div>
  
  );
};

export default Cards;
