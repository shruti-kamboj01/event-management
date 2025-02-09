const BASE_URL = "http://localhost:3000/v1/auth"

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