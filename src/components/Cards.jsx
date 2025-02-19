import React, { useState, useContext, useEffect } from "react";
import { socketContext } from "../App";
import EditEvent from "./EditEvent";

const Cards = ({
  _id,
  image,
  eventName,
  description,
  date,
  createrName,
  attendees,
}) => {
  const { socket } = useContext(socketContext);
  const [attendeeCount, setAttendeeCount] = useState(attendees.length);
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user._id;
  useEffect(() => {
    const handleUpdateAttendees = ({ eventId, attendees }) => {
      // console.log(attendees);
      if (_id === eventId) {
        setAttendeeCount(attendees);
      }
    };
  
    socket.on("update_attendees", handleUpdateAttendees);
  
    return () => {
      // console.log("Cleanup running: Removing event listenerin cards");
      socket.off("update_attendees", handleUpdateAttendees); 
    };
  }, [socket]);
  const joinEvent = (e) => {
    e.preventDefault();
    socket.emit("join_event", { eventId: _id, userId, eventName });
  };

  const leaveEvent = (e) => {
    e.preventDefault();
    socket.emit("leave_event", { eventId: _id, userId });
  };

return (
    <div className=" ">
      <div className="card bg-amber-400 lg:w-80 md:w-60 sm:w-60 shadow-xl">
        <figure>
          <img src={image} alt="image" className="lg:w-full " />
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
          <h2 className="text-base font-semibold ml-2 text-amber-800">
            Attendees: {attendeeCount}
          </h2>
        </div>
        <div className="flex gap-2 ml-2">
          <button
            type="button"
            className="btn hover:bg-gray-800 hover:text-white btn-outline text-black w-20 mb-2"
            onClick={joinEvent}
          >
            {" "}
            Join
          </button>
          <button
            type="button"
            className="btn hover:bg-gray-800 hover:text-white btn-outline text-black w-20 mb-2"
            onClick={leaveEvent}
          >
            {" "}
            Leave
          </button>
        
        </div>
        <div> <EditEvent eventId = {_id}  /> </div>
      </div>
    </div>
  );
};

export default Cards;
