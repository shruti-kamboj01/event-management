import React, { useContext, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useNavigate } from "react-router";
import { signup } from "../apis/User";

const Signup = () => {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false);
  const [formdata, setFormdata] = useState({name:"", userName:"", password:""})
  const changeHandler = (e) => {
      const {value, name} = e.target;
      setFormdata((prev) => ({
        ...prev,
        [name]:value
      }))
  }

  const submitHandler = async(e) => {
    e.preventDefault()
    await signup(formdata)
    setFormdata({
      name:"",
      userName:"",
      password:""
    })
  }

  return (
    <div className="flex w-11/12 mx-auto items-center justify-center text-black">
      <form 
      onSubmit={submitHandler}
      className="mt-10 mb-10 mx-auto justify-center  gap-4 flex flex-col w-[50%]">
        <label className="">
          <h1 className="text-zinc-600 "> Name : </h1>
          <input
            type="text"
            value={formdata.name}
            name="name"
            placeholder="Type here"
            onChange={changeHandler}
            className="input  bg-amber-100 text-black input-bordered input-warning w-full max-w-xs"
            required
          />
        </label>

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
              <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF"  />
            ) : (
              <AiOutlineEye fontSize={24} fill="#AFB2BF" />
            )}
          </span>
        </label>
        <div className="mt-4">
        <button className="btn btn-outline btn-warning"
         onClick={() => navigate('/')}
         type="submit"
        >Signup</button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
