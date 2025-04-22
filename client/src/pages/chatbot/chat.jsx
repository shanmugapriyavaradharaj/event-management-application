import React, { useState } from "react";
import axios from "axios";
import { IconButton, Button, CircularProgress } from "@mui/material";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import "./Chatbot.css";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const toggleChat = () => setIsOpen(!isOpen);

  const handleInputChange = (event) => {
    setUserInput(event.target.value);
  };

  const sendMessage = async () => {
    if (userInput.trim() === "") return;
  
    const newMessage = { text: userInput, sender: "user" };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setUserInput("");
    setIsLoading(true);
  
    try {
      const response = await fetch("http://localhost:4000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: userInput }),
      });
  
      const data = await response.json();
  
      const aiMessage = { text: data.reply, sender: "ai" };
      setMessages((prevMessages) => [...prevMessages, aiMessage]);
    } catch (error) {
      console.error("Error generating response:", error);
    } finally {
      setIsLoading(false);
    }
  };
  

  return (
    <div>
      {/* Chatbot Button with Icon */}
      <IconButton
        className="chatbot-button"
        onClick={toggleChat}
        sx={{
          position: "fixed",
          bottom: 20,
          right: 20,
          backgroundColor: "#0078d4",
          color: "white",
          padding: 2,
          boxShadow: 3,
          "&:hover": { backgroundColor: "#005fa3" },
        }}
      >
        <ChatBubbleOutlineIcon sx={{ fontSize: 40 }} />
      </IconButton>

      {/* Chatbox Popup */}
      {isOpen && (
        <div className="chatbot-popup">
          <div className="chat-header">
            <h2>Chatbot</h2>
            <button className="close-button" onClick={toggleChat}>×</button>
          </div>

          <div className="messages">
            {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.sender}`}>
                <p>{msg.text}</p>
              </div>
            ))}
            {isLoading && <div className="loading"><CircularProgress size={20} /></div>}
          </div>

          <div className="input-area">
            <input
              type="text"
              value={userInput}
              onChange={handleInputChange}
              placeholder="Type a message..."
              className="input-field"
            />
            <Button
              variant="contained"
              onClick={sendMessage}
              sx={{
                backgroundColor: "#0078d4",
                color: "white",
                "&:hover": { backgroundColor: "#005fa3" },
                padding: "8px 20px",
                fontWeight: "bold",
                borderRadius: "20px",
              }}
            >
              Send
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
