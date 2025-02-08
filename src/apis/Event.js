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