import React, { useState, useEffect, useContext } from "react";
import Navbar from "../components/Navbar";
import { allEvents } from "../apis/Event";
import Cards from "../components/Cards";
import { socketContext } from "../App";

const Dashboard = () => {
  const [events, setEvents] = useState([]);
  const { connectSocket } = useContext(socketContext);
  const fetchData = async () => {
    const response = await allEvents();
    setEvents(response.allEvents);
  };
  // console.log(events)
  useEffect(() => {
    fetchData();
    connectSocket();
  }, []);
  const today = new Date();
  const upcomingEvents = events
    .filter((event) => new Date(event.date) >= today)
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  const pastEvents = events
    .filter((event) => new Date(event.date) < today)
    .sort((a, b) => new Date(b.date) - new Date(a.date));
  return (
    <div className="h-full lg:w-full bg-amber-50 overflow-y-auto">
      <div className="h-[12%] mb-4  bg-amber-900">
        <Navbar />
      </div>

      <h2 className="text-amber-900 uppercase font-mono mx-auto w-11/12 text-3xl font-bold text-center mb-2">
        {" "}
        Upcoming Events
      </h2>
      <div className="text-black sm:w-3 md:w-full w-11/12 mx-auto place-items-center grid space-y-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3  bg-amber-50 ">
        {upcomingEvents.map((event, i) => {
          return <Cards {...event} />;
        })}
      </div>
      <h2 className="text-amber-900 uppercase font-mono mx-auto w-11/12 text-3xl font-bold text-center mb-2 mt-2">
        Past Events
      </h2>
      <div className="text-black sm:w-3 md:w-full w-11/12 mx-auto place-items-center grid space-y-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3  bg-amber-50 ">
        {pastEvents.length > 0 ? (
          pastEvents.map((event, i) => {
            return <Cards {...event} />;
          })
        ) : (
          <div className="text-amber-600 font-mono mx-auto w-11/12 text-lg font-bold text-center mb-2 mt-4">
            Sorry, Not Available!
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
