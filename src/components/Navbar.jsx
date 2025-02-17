import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import CreateEvent from "./CreateEvent";

const Navbar = () => {
  const token = JSON.parse(localStorage.getItem("token"));
  const navigate = useNavigate();
  const [login, setlogin] = useState(false);
  useEffect(() => {
    if (token) {
      setlogin(true);
    }
  }, []);
  const [modal, setModal] = useState(false);
  function createEventHandler() {
    if (!login) {
      navigate("/login");
    } else {
      setModal(true);
    }
  }

  function logoutHandler() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  }

  return (
    <div className="flex justify-between w-11/12 mx-auto">
      <div className="flex gap-1.5 mt-4 cursor-pointer text-amber-300 lg:text-base md:text-base sm: text-sm font-semibold">
        <h1 onClick={() => navigate('/profile')} >Profile</h1>
        <h1 className="" onClick={createEventHandler}>
          Create Event
        </h1>
      </div>

      {login == true ? (
        <div className="md:mt-2 lg:mt-2 sm:mt-1 ">
          <button
            className="btn btn-outline btn-xs sm:btn-sm md:btn-md  sm: btn-warning"
            onClick={logoutHandler}
            type="submit"
          >
            Logout
          </button>
        </div>
      ) : (
        <div className="flex justify-between gap-2 md:mt-2 lg:mt-2 sm: mt-2.5">
          <button
            className="btn btn-xs sm:btn-sm md:btn-md btn-outline  btn-warning"
            onClick={() => navigate("/signup")}
            type="submit"
          >
            Signup
          </button>
          <button
            className="btn btn-xs sm:btn-sm md:btn-md btn-outline btn-warning"
            onClick={() => navigate("/login")}
            type="submit"
          >
            Login
          </button>
        </div>
      )}
      {modal && <CreateEvent setModal={setModal} />}
    </div>
  );
};

export default Navbar;
