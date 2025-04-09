// React (ChatApp.jsx)
import React, { useState } from "react";
import axios from "axios";

const ChatApp = () => {
  const [input, setInput] = useState("");
  const [chat, setChat] = useState([]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMessage = { sender: "user", text: input };
    setChat([...chat, userMessage]);
    setInput("");

    try {
      const response = await axios.post("http://localhost:3000/chat", {
        message: input,
      });

      const botMessage = { sender: "bot", text: response.data.reply };
      setChat((prev) => [...prev, botMessage]);
    } catch (err) {
      setChat((prev) => [
        ...prev,
        { sender: "bot", text: "Something went wrong." },
      ]);
    }
  };

  return (
    <div className="chatbox">
      <h2>Groq Chatbot 🤖</h2>
      <div className="messages">
        {chat.map((msg, i) => (
          <div key={i} className={`msg ${msg.sender}`}>
            {msg.text}
          </div>
        ))}
      </div>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        placeholder="Type a message..."
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default ChatApp;
