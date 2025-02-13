import React, { useContext, useState, useEffect } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useNavigate } from "react-router";
import { login } from "../apis/User";
import { socketContext } from "../App";
const Login = () => {
  const { connectSocket } = useContext(socketContext);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formdata, setFormdata] = useState({ userName: "", password: "" });
  const changeHandler = (e) => {
    const { value, name } = e.target;
    setFormdata((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

   function checkIfUserExists() {
    if(!localStorage.getItem("user")) {
      alert("Do signup first")
      navigate('/signup')
    }
  }
  useEffect(() => {
    checkIfUserExists() 
  },[])

  const submitHandler = async (e) => {
    e.preventDefault();
    const res = await login(formdata);
    const token = res.token;
    localStorage.setItem("token", JSON.stringify(token));
    connectSocket();
    navigate("/dashboard");
    setFormdata({
      userName: "",
      password: "",
    });
  };

  return (
    <div className="flex w-11/12 mx-auto items-center justify-center text-black">
      <form
        onSubmit={submitHandler}
        className="mt-20 mb-10 mx-auto justify-center  gap-4 flex flex-col w-[50%]"
      >
        <label>
          <h1 className="text-zinc-600"> UserName : </h1>
          <input
            type="text"
            placeholder="Type here"
            value={formdata.userName}
            name="userName"
            onChange={changeHandler}
            className="input bg-amber-100 text-black input-bordered input-warning w-full max-w-xs"
            required
          />
        </label>

        <label>
          <h1 className="text-zinc-600"> Password : </h1>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Type here"
            value={formdata.password}
            name="password"
            onChange={changeHandler}
            className="input bg-amber-100 text-black input-bordered input-warning w-full max-w-xs"
            required
          />
          <span
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute  -translate-x-8 translate-y-2 cursor-pointer"
          >
            {showPassword ? (
              <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
            ) : (
              <AiOutlineEye fontSize={24} fill="#AFB2BF" />
            )}
          </span>
        </label>
        <div className="mt-4">
          <button className="btn btn-outline btn-warning" type="submit">
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
