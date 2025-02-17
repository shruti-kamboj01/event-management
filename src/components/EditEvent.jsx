import React, { useState,useEffect } from 'react'
import CreateEvent from './CreateEvent'
import { getUserDetails } from '../apis/User'

const EditEvent = ({eventId}) => {
    
  const [user, setUser] = useState("")
  const token = JSON.parse(localStorage.getItem("token"))
    const [modal, setModal] = useState(false)
    const [editEvent, setEditEvent] = useState(false)
      const fetchUserDetails = async () => {
        const response = await getUserDetails(token);
        setUser(response.userDetails);
      };
      useEffect(() => {
        fetchUserDetails();
      }, []);
      // console.log(user)
      const userEvents = user.eventCreated
      // console.log(userId)
      
    const editEventDetails = (e) => {
        e.preventDefault();
        if(userEvents.some(event => event._id === eventId)){
            setModal(true)
            setEditEvent(true)
        }
    }
  return (

    <div>
          <button
            type="submit"
            className= {user && `${userEvents.some(event => event._id === eventId) ? ("btn ml-2 hover:bg-gray-800 hover:text-white btn-outline text-black w-20 mb-2"): (" ml-2 border border-gray-500 text-gray-500 py-1.5 rounded-md w-20 mb-2 cursor-not-allowed ") }`}
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