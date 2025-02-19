import React, { useEffect, useState } from "react";
import { getUserDetails } from "../apis/User";
import { deleteEvent } from "../apis/Event";
import ChatRoom from "../components/ChatRoom";
import { GiConsoleController } from "react-icons/gi";

const Profile = () => {
  const token = JSON.parse(localStorage.getItem("token"));
  const [user, setUser] = useState("");
  const [enterChatRoom, setEnterChatRoom] = useState(false);
  const [roomName, setRoomName] = useState("");

  const fetchUserDetails = async () => {
    const response = await getUserDetails(token);
    setUser(response.userDetails);
  };
  useEffect(() => {
    fetchUserDetails();
  }, []);

  const deleteEventHandler = async (eventId) => {
    const res = await deleteEvent(token, eventId);
    if (res.success) {
      alert("Event deleted successfully");
      fetchUserDetails();
    }
  };

  const chatRoomHandler = (eventName) => {
    // console.log("event", eventName)
    setRoomName(eventName);
    setEnterChatRoom(true);
  };
  // console.log("roon", roomName)
  return (
    <div className="w-11/12 mx-auto h-full overflow-auto">
      {/* edit/ delete account */}
      {!enterChatRoom && (
        <div>
          <div className="text-black ">
              <h1 className="uppercase">Welcome! {user.name}</h1>
            </div>
        
          {/* events created*/}
          <div className="flex flex-col gap-4">
            <div className="">
              <h1 className="text-amber-900  underline uppercase font-mono mx-auto w-11/12 text-3xl font-bold text-center mb-2 mt-2">
                Events Created
              </h1>
              <div className="grid place-items-center gap-y-3 md:grid-cols-2 mx-auto lg:grid-cols-3 sm:grid-cols-1">
                {user &&
                  user.eventCreated.map((event, i) => {
                    return (
                      <div className="card bg-amber-400 lg:w-60 md:w-60 sm:w-60 shadow-xl">
                        <figure>
                          <img
                            src={event.image}
                            alt="image"
                            className="lg:w-full "
                          />
                        </figure>
                        <span className="text-base font-semibold ml-2 text-amber-800">
                          Event Title: <span>{event.eventName}</span>
                        </span>
                        <p className="ml-2 text-amber-800 italic text-sm">
                          {event.description}
                        </p>
                        <h2 className="text-base font-semibold ml-2 text-amber-800">
                          Organized By: {event.createrName}
                        </h2>
                        <h2 className="text-base font-semibold ml-2 text-amber-800">
                          Date: {event.date}
                        </h2>
                        <h2 className="text-base font-semibold ml-2 text-amber-800">
                          Attendees: {event.attendees.length}
                        </h2>
                        <div className="flex mx-auto gap-x-2">
                          <button
                            className="btn text-base hover:bg-gray-800 hover:text-white btn-outline text-black w-30 mb-2 mt-2"
                            onClick={() => chatRoomHandler(event.eventName)}
                          >
                            Chat Group
                          </button>
                          <button
                            className="btn text-base hover:bg-red-900 hover:text-white btn-outline text-red-900 w-20 mb-2 mt-2"
                            onClick={() => deleteEventHandler(event._id)}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
            {/* events joined */}
            <div>
              <h1 className="text-amber-900 underline uppercase font-mono mx-auto w-11/12 text-3xl font-bold text-center mb-2 mt-2">
                Events Attending/Attended
              </h1>
              <div className="grid place-items-center gap-y-3 md:grid-cols-2 mx-auto lg:grid-cols-3 sm:grid-cols-1">
                {user &&
                  user.eventAttending.map((event, i) => {
                    return (
                      <div className="card bg-amber-400 lg:w-80 md:w-60 sm:w-60 shadow-xl">
                        <figure>
                          <img
                            src={event.image}
                            alt="image"
                            className="lg:w-full "
                          />
                        </figure>
                        <span className="text-base font-semibold ml-2 text-amber-800">
                          Event Title: <span>{event.eventName}</span>
                        </span>
                        <p className="ml-2 text-amber-800 italic text-sm">
                          {event.description}
                        </p>
                        <h2 className="text-base font-semibold ml-2 text-amber-800">
                          Organized By: {event.createrName}
                        </h2>
                        <h2 className="text-base font-semibold ml-2 text-amber-800">
                          Date: {event.date}
                        </h2>
                        <h2 className="text-base font-semibold ml-2 text-amber-800">
                          Attendees: {event.attendees.length}
                        </h2>
                        {Date.now() < new Date(event.date).getTime() ? (
                          <button
                            className="btn text-base hover:bg-gray-800 hover:text-white btn-outline text-black w-30 mb-2 mt-2 ml-2"
                            onClick={() => chatRoomHandler(event.eventName)}
                          >
                            Chat Group
                          </button>
                        ) : (
                          <button className="ml-2 border border-gray-500 text-gray-500 py-1.5 rounded-md w-30 mb-2 cursor-not-allowed">
                            Chat Group
                          </button>
                        )}
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      )}

      {enterChatRoom && <ChatRoom roomName={roomName} />}
    </div>
  );
};

export default Profile;
