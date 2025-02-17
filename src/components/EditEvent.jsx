import React, { useState } from 'react'
import CreateEvent from './CreateEvent'

const EditEvent = ({eventId}) => {
    
    const user = JSON.parse(localStorage.getItem("user"))
    const [modal, setModal] = useState(false)
    const [editEvent, setEditEvent] = useState(false)
    const userId = user.eventCreated
    const editEventDetails = (e) => {
        e.preventDefault();
        if(userId.includes(eventId)){
            setModal(true)
            setEditEvent(true)
        }
    }
  return (

    <div>
          <button
            type="submit"
            className= {`${userId.includes(eventId) ? ("btn ml-2 hover:bg-gray-800 hover:text-white btn-outline text-black w-20 mb-2"): (" ml-2 border border-gray-500 text-gray-500 py-1.5 rounded-md w-20 mb-2 cursor-not-allowed ") }`}
            // className=""
            onClick={editEventDetails}
           >
            {" "}
            Edit
          </button>
          {modal && editEvent && (<CreateEvent setModal={setModal} eventId= {eventId} modal= {modal} editEvent= {editEvent}
            setEditEvent= {setEditEvent}/>)}
    </div>
  )
}

export default EditEvent