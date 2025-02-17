import React from 'react'

const Profile = () => {
    const user = JSON.parse(localStorage.getItem("user"))
    // console.log(user)
  return (
    <div className='w-11/12 mx-auto '>
        {/* edit/ delete account */}
        <div>
             <div className='text-black '>
                 <h1 className='uppercase'>Welcome {user.name}!</h1>
            </div>
        </div>
        {/* joined events */}
        <div>
            <div>
                
            </div>
        </div>
    </div>
  )
}

export default Profile