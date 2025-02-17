import "./App.css";
import { Route, Routes } from "react-router";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import { createContext, useState } from "react";
import io from "socket.io-client";
import Profile from "./pages/Profile";

const socketContext = createContext(null);

function App() {
  const [socket, setSocket] = useState(null);
  const connectSocket = () => {
    if (!socket) {
      const newSocket = io.connect("http://localhost:3000/");
      setSocket(newSocket);
    }
  };
  return (
    <div className="bg-yellow-50 h-[100vh]">
      <socketContext.Provider value={{ socket, connectSocket }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile/>}/>
        </Routes>
      </socketContext.Provider>
    </div>
  );
}

export default App;
export { socketContext };
