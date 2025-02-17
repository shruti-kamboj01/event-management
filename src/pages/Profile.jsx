import React, { useEffect, useState } from 'react'
import { getUserDetails } from '../apis/User'

const Profile = () => {
    const token = JSON.parse(localStorage.getItem("token"))
    const[user, setUser] = useState("")

    const fetchUserDetails = async() => {
        const response = await getUserDetails(token)
        setUser(response.userDetails)
    }
    useEffect(() => {
      fetchUserDetails()
    }, [])
    // console.log(user.eventCreated)
  return (
    <div className='w-11/12 mx-auto '>
        {/* edit/ delete account */}
        <div>
             <div className='text-black '>
                 <h1 className='uppercase'>Welcome! {user.name}</h1>
            </div>
        </div>
        {/* joined events */}
        <div>
            <div>
                <h1>Events Created</h1>
                 
            </div>
        </div>
    </div>
  )
}

export default Profile