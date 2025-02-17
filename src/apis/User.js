const BASE_URL = "https://event-management-1liu.onrender.com/v1/user/"

export const signup = async(data) => {
    try{
        const res = await fetch(`${BASE_URL}signup`, {
            method: "POST",
            headers:{"Content-Type": "application/json"},
            withCredentials: true,
            body: JSON.stringify(data)
        });
        const responseData = await res.json()
        if(!res.ok) {
            alert(responseData.message || "Signup failed!");
            return null;
        }
        return responseData

    }catch(error) {
        console.log("Error during signup:",error)
      
    }
}

export const login = async(data) => {
    try{
        const response = await fetch(`${BASE_URL}login`, {
            method: "POST",
            headers:{"Content-Type": "application/json"},
            body: JSON.stringify(data)
        });
        const responseData = await response.json()
        if(!response.ok) {
            alert(responseData.message || "Signup failed!");
            return null;
        }
        return responseData

    }catch(error) {
        console.log("Error during login:",error)
    }
}

export const getUserDetails = async(token) => {
    try{
        const response = await fetch(`${BASE_URL}userDetails`,{
            method:"POST",
            headers:{
                "content-type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        })
        const responseData = await response.json()
        return responseData
    }catch(error) {
        console.log("Error in creating event", error)
        return error;
    }
}