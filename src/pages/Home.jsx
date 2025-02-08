import React from "react";
import { useNavigate } from "react-router";

const Home = () => {
  const navigate = useNavigate()
  return (
    <div className="w-11/12 mx-auto h-[100vh] flex  flex-col justify-center items-center">
      <span className="font-semibold sm:text-base font-mono md:text-5xl lg:text-5xl mb-26 text-amber-400">
        {" "}
        Creating Unforgettable <h1>Memories...</h1>{" "}
      </span>
      <div className="flex gap-3 mb-3">
        <button className="btn btn-outline btn-warning hover:bg-amber-300"
         onClick={() => navigate('/signup')}
        >Signup</button>
        <button className="btn btn-outline btn-warning"
         onClick={() => navigate('/login')}
        >Login</button>
      </div>
      <div className="text-amber-400 cursor-pointer">
        <h1 onClick={() => navigate('/dashboard')}
        >Guest Login?</h1>
      </div>
    </div>
  );
};

export default Home;
