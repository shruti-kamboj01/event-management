import React, { useState } from "react";
import { createEvent } from "../apis/Event";
import { useSelector } from "react-redux";

const CreateEvent = ({ setModal }) => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [formdata, setformdata] = useState({
    eventName: "",
    desc: "",
    date: "",
    createrName: "",
    file: "",
  });
  const { token } = useSelector((state) => state.auth);
//  console.log("token", token)
  const changeHandler = (e) => {
    const { value, name, files } = e.target;
    //  console.log("files", files)
    if (files && files[0]) {
        // console.log(files[0])
      setformdata((prev) => ({
        ...prev,
        [name]: files[0],
      }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(files[0]);
    } else {
      setformdata((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };
//    console.log("formdata", formdata)
  const submitHandler = async (e) => {
    e.preventDefault();
    const res = await createEvent(formdata, token)
    // console.log("Form submitted:", formdata);
  };

  return (
    <div className="bg-amber-100">
      <dialog
        id="my_modal_5"
        className="modal modal-open modal-bottom sm:modal-middle"
      >
        <div className="modal-box">
          <form className="flex flex-col gap-y-2 " onSubmit={submitHandler}>
            <input
              type="file"
              className=""
              name="file"
              accept="image/*"
              onChange={changeHandler}
            />
            {preview && (
              <img
                src={preview}
                alt="Preview"
                style={{ width: "200px", marginTop: "10px" }}
              />
              
            )}
            <button className="btn btn-warning btn-outline text-white h-8 w-fit" type="button"
            onClick={() => setPreview(null)}> X </button>
            <label>
              <h2 className="text-amber-300">Event Name: </h2>
              <input
                type="text"
                placeholder="Type here"
                name="eventName"
                value={formdata.eventName}
                onChange={changeHandler}
                className="input input-bordered input-warning w-full max-w-xs"
              />
            </label>
            <label>
              <h2 className="text-amber-300">Description </h2>
              <input
                type="text"
                placeholder="Type here"
                name="desc"
                value={formdata.desc}
                onChange={changeHandler}
                className="input input-bordered input-warning w-full max-w-xs"
              />
            </label>
            <label>
              <h2 className="text-amber-300">Date: </h2>
              <input
                type="date"
                placeholder="Type here"
                name="date"
                value={formdata.date}
                onChange={changeHandler}
                className="input input-bordered input-warning w-full max-w-xs"
              />
            </label>
            <label>
              <h2 className="text-amber-300"> Creater Name: </h2>
              <input
                type="text"
                placeholder="Type here"
                name="createrName"
                value={formdata.createrName}
                onChange={changeHandler}
                className="input input-bordered input-warning w-full max-w-xs"
              />
            </label>
            <div className="mt-2 flex gap-2">
              <button className="btn btn-outline btn-warning" type="submit">
                Submit
              </button>
              <button
              type="button"
                className="btn btn-outline btn-warning"
                onClick={() => setModal(false)}
              >
                Close
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default CreateEvent;
