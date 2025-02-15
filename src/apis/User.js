const BASE_URL = "http://localhost:3000/"

export const signup = async(data) => {
    try{
        const res = await fetch(`${BASE_URL}v1/user/signup`, {
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
        const response = await fetch(`${BASE_URL}v1/user/login`, {
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