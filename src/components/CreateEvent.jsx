import React, { useState } from "react";

const CreateEvent = ({ setModal }) => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [formdata, setformdata] = useState({
    eventName: "",
    desc: "",
    date: "",
    creater: "",
  });

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <div>
      <dialog
        id="my_modal_5"
        className="modal modal-open  modal-bottom sm:modal-middle"
      >
        <div className="modal-box">
          <form className="flex flex-col gap-y-2">
            <input type="file" className="w-fit" accept="image/*" onChange={handleImageChange} />
            {preview && (
              <img
                src={preview}
                alt="Preview"
                style={{ width: "200px", marginTop: "10px" }}
              />
            )}
            <label>
              <h2 className="text-amber-300">Event Name: </h2>
              <input
                type="text"
                placeholder="Type here"

                className="input input-bordered input-warning w-full max-w-xs"
              />
            </label>
            <label>
              <h2 className="text-amber-300">Event Name: </h2>
              <input
                type="text"
                placeholder="Type here"
                
                className="input input-bordered input-warning w-full max-w-xs"
              />
            </label>
            <label>
              <h2 className="text-amber-300">Event Name: </h2>
              <input
                type="text"
                placeholder="Type here"
                
                className="input input-bordered input-warning w-full max-w-xs"
              />
            </label>
            <label>
              <h2 className="text-amber-300">Event Name: </h2>
              <input
                type="text"
                placeholder="Type here"
                
                className="input input-bordered input-warning w-full max-w-xs"
              />
            </label>
          </form>

          <div className="modal-action">
            <form method="dialog">
              <button className="btn" onClick={() => setModal(false)}>
                Close
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default CreateEvent;
