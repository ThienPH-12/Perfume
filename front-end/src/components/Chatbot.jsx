import React, { useEffect, useRef, useState } from "react";
import "./Chatbot.scss";
import logo from "../img/botlogo.jpg";
import { CaretDown, CaretUp, XLg, ChatRightDots } from "react-bootstrap-icons";


export default function Chatbox() {
  //create chat history
  const [ChatHistory, setChatHistory] = useState([]);
  const [isChatboxOpen, setIsChatboxOpen] = useState(false);

  const toggleChatbox = () => {
    setIsChatboxOpen(!isChatboxOpen);
  };
  const inputRef = useRef();
  const chatBodyRef = useRef();

  useEffect(() => {
    //auto-scroll whenever chat history updates
    chatBodyRef.current.scrollTo({top: chatBodyRef.current.scrollHeight, behavior: "smooth",});
  },[ChatHistory]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    //get the user message
    const userMessage = inputRef.current.value.trim();
    if (!userMessage) return;
    inputRef.current.value = "";
    //set the message into chat history
    setChatHistory((history) => [...history,{ role: "user", text: userMessage },]);

    setTimeout(() => {
       //add a thinking message
      setChatHistory((history) => [...history,{ role: "model", text: "Thinking...", }]);
    
     //call the function to get the bot response
      generateBotResponse([...ChatHistory,{ role: "user", text: userMessage }]);
   },600);
  };

  const generateBotResponse = async (history) => {
    //update chat history
    const updateHistory = (text,isError=false) => {
      setChatHistory((prev) => [ ...prev.filter(msg => msg.text !== "Thinking..."),{ role: "model", text,isError }]);
    };

    //format chat history for API request
    history = history.map(({role, text}) => ({ role, parts: [{ text }] }));
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents: history }),
    };
    try {
      const response = await fetch(process.env.REACT_APP_GEMINI_API_KEY, requestOptions);
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error.message || "Something went wrong!");
      }
      const apiResponse = data.candidates[0].content.parts[0].text.replace(/\*\*(.*?)\*\*/g, "$1").trim();
      updateHistory(apiResponse);
    } catch (error) {
     updateHistory(error.message,true);
    }
  };

  return (
    <div className={` ${isChatboxOpen ? "show-chatbot" : ""}`}>
      <button
        id="chatbot-toggler"
        onClick={toggleChatbox}
        className="chatbot-toggler">
        <span><ChatRightDots></ChatRightDots>
        </span>
        <span><XLg style={{ marginBottom: 4 }}></XLg>
        </span>
      </button>
      <div className="chatbot-popup">
        <div className="chat-header">
          <div className="header-info">
            <img height="50px" width="50px" src={logo} alt="Bot SVG" />
            <h2 className="logo-text"> Chatbot hỗ trợ</h2>
          </div>
          <button onClick={toggleChatbox}>
            <CaretDown></CaretDown>
          </button>
        </div>

        <div ref={chatBodyRef} className="chat-body">
          <div className="message bot-message">
            <img height="50px" width="50px" src={logo} alt="Bot SVG" />
            <p className="message-text">
              Xin chào <br /> tôi có thể giúp gì cho bạn?
            </p>
          </div>
          {ChatHistory.map((chat, index) => (
            <div key={index}className={`message ${chat.role === "model" ? "bot" : "user"}-message ${chat.isError ?"error":""}`}  >
              {chat.role === "model" && (
                <img height="50px" width="50px" src={logo} alt="Bot SVG" />
              )}
              <p className="message-text">{chat.text}</p>
            </div>
          ))}
        </div>

        <div className="chat-footer">
          <form action="#" className="chat-form" onSubmit={handleFormSubmit}>
            <input ref={inputRef}
              type="text"
              placeholder="Nhập câu hỏi của bạn..."
              className="message-input"
              required
            />
            <button type="submit">
              <CaretUp style={{ marginBottom: 15 }}></CaretUp>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
