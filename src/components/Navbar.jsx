import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import CreateEvent from "./CreateEvent";

const Navbar = () => {
  const token = JSON.parse(localStorage.getItem("token"))
  const navigate = useNavigate();
  const [login, setlogin] = useState(false);
  useEffect(() => {
    if (token) {
      setlogin(true);
    }
  }, []);
  const [modal, setModal] = useState(false)
  function createEventHandler() {
    if(!login) {
      navigate('/login')
    }
    else {
        setModal(true)
    }
  }

  return (
    <div className="flex justify-between w-11/12 mx-auto">
      <div className="flex gap-3 mt-4 cursor-pointer text-amber-300 text-base font-semibold">
        <h1>Profile</h1>
        <h1 className=""
          onClick={createEventHandler}
        >Create Event</h1>
      </div>
      
        {login == true ? (
          <div className="mt-2">
            <button
              className="btn btn-outline btn-warning"
              onClick={() => navigate("/dashboard")}
              type="submit"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex justify-between gap-2 mt-2.5">
            <button
              className="btn btn-outline btn-warning"
              onClick={() => navigate("/signup")}
              type="submit"
            >
              Signup
            </button>
            <button
              className="btn btn-outline btn-warning"
              onClick={() => navigate("/login")}
              type="submit"
            >
              Login
            </button>
          </div>
        )}
        {
          modal && (<CreateEvent setModal={setModal} />)
        }
    </div>
  );
};

export default Navbar;
