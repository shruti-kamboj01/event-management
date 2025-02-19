import React, { useContext, useEffect, useState } from "react";
import { socketContext } from "../App";

const ChatRoom = ({ roomName }) => {
  const { socket } = useContext(socketContext);
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState([])
  const user = JSON.parse(localStorage.getItem("user"))
  const [username, setUsername] = useState("")
  
  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit("message", {message, roomName, username});
    setMessage("")
  }
  useEffect(() => {
    setUsername(user.name);
  
    const handleMessageReceive = (data) => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: data.message, sender: data.username },
      ]);
    };
  
    socket.on("receive-message", handleMessageReceive);
  
    return () => {
        console.log("Cleanup running: Removing event listener");
      socket.off("receive-message", handleMessageReceive); 
    };
  }, []);
  
  return (
    <div className="text-black w-11/12 mx-auto h-screen flex flex-col">
  {/* Chatroom Title */}
  <h1 className="text-center text-amber-900 text-xl uppercase font-bold mt-2 mb-4">
    Welcome to the chatroom of {roomName}!
  </h1>

  {/* Messages Section */}
  <div className="flex-grow overflow-y-auto">
    <div className="text-black space-y-1">
      {messages.map((msg, i) => (
        <div key={i} className={`${msg.sender == username ? ("bg-amber-200 border border-amber-500 rounded-md pl-2"): ("pl-2 ")} `}>{msg.text}</div>
      ))}
    </div>
  </div>

  {/* Input Field */}
  <form onSubmit={handleSubmit} className="flex gap-2 p-2 bg-white">
    <input
      type="text"
      placeholder="Type here"
      value={message}
      onChange={(e) => setMessage(e.target.value)}
      className="input input-bordered bg-amber-200 input-warning w-full"
    />
    <button type="submit" className="btn btn-warning">Send</button>
  </form>
</div>

  );
};

export default ChatRoom;
