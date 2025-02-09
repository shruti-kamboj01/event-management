import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import { allEvents } from "../apis/Event";
import Cards from "../components/Cards";

const Dashboard = () => {
  const { token } = useSelector((state) => state.auth);
  
  const [events, setEvents] = useState([]);

  const fetchData = async () => {
    const response = await allEvents();
    // console.log(response.allEvents)
    setEvents(response.allEvents);
  };

//   console.log(events);
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="h-full lg:w-full  bg-amber-50 overflow-y-auto">
      <div className="h-[12%] mb-6 bg-amber-900"><Navbar token={token} /></div>
      <div className="text-black sm:w-3 md:w-full w-11/12 mx-auto place-items-center grid space-y-6 md:grid-cols-2 sm:grid-cols-1 lg:grid-cols-3 bg-amber-50 ">
        {events.map((event, i) => {
          return <Cards {...event} />;
        })}
      </div>
    </div>
  );
};

export default Dashboard;
