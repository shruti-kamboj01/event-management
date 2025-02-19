const BASE_URL = "https://event-management-1liu.onrender.com/v1/auth"

export const allEvents = async() => {
    try{
       const response = await fetch(`${BASE_URL}/allEvents`, {
           method: "GET",
           headers:{"Content-Type": "application/json"},
           withCredentials: true,
        });
        const responseData = await response.json()
     
        return responseData
    }catch(error) {
        console.log("Error in fetching data", error)
        return error;
    }
}

export const createEvent = async(data,token) => {
    const formdata = new FormData()
    const keys = Object.keys(data)
    keys.forEach((key, i) => {
        formdata.append(`${key}`, data[key])
    })
    // for (const pair of formdata.entries()) {
    //     console.log(pair[0], pair[1]);
    //   }
    try{
       const response = await fetch(`${BASE_URL}/event`, {
           method: "POST",
           headers:{
            "Authorization": `Bearer ${token}`
           },
           withCredentials: true,
           body: formdata
        });
        const responseData = await response.json()
        return responseData
    }catch(error) {
        console.log("Error in creating event", error)
        return error;
    }
}

export const updateEvent = async(data,token, eventId) => {
    console.log(data, token, eventId)
    try{
        const formdata = new FormData()
        const keys = Object.keys(data)
        keys.forEach((key) => {
            formdata.append(`${key}`, data[key])
        })
        formdata.append("eventId", eventId)
        // for (const pair of formdata.entries()) {
        //     console.log(pair[0], pair[1]);
        //   }
        const response = await fetch(`${BASE_URL}/updateEvent`, {
           method: "PUT",
           headers:{
            "Authorization": `Bearer ${token}`
           },
           withCredentials: true,
           body: formdata
        });
        const responseData = await response.json()
        return responseData
    }catch(error) {
        console.log(error)
        throw error
    }
}

export const deleteEvent = async(token, eventId) => {
    console.log(token, eventId)
    const formdata = new FormData()
    formdata.append("eventId", eventId)
    try{
        const responseData = await fetch(`${BASE_URL}/deleteEvent`, {
            method:'POST',
            headers:{
                "Authorization": `Bearer ${token}`
            },
            body:formdata
        })
        const res = await responseData.json()
        return res
    }catch(error) {
        console.log("Error in deleting event", error)
        alert("Something went wrong!")
        return error;
    }
}