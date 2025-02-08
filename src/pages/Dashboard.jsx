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
    <div className="h-full w-full bg-amber-50 overflow-y-auto">
      <div className="h-[12%] mb-6 bg-amber-900"><Navbar token={token} /></div>
      <div className="text-black w-11/12 mx-auto  grid space-y-6  grid-cols-2 bg-amber-50 ">
        {events.map((event, i) => {
          return <Cards {...event} />;
        })}
      </div>
    </div>
  );
};

export default Dashboard;
