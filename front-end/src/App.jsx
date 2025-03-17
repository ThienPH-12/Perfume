import React, { useState } from 'react';
import AppRoute from "./route/appRoute.jsx";
import "./App.scss";

// Import Chatbox component
import Chatbox from "./components/Chatbox.jsx";
// Removed import of Chatbox.scss

export default function App() {
  const [isChatboxOpen, setIsChatboxOpen] = useState(false);

  const toggleChatbox = () => {
    setIsChatboxOpen(!isChatboxOpen);
  };

  return (
      <div id="App">
        <AppRoute />
        {/* Chatbox Button */}
        <button onClick={toggleChatbox} className="chatbox-button">
          Chat
        </button>
        {/* Chatbox Component */}
        {isChatboxOpen && <Chatbox />}
      </div>
  );
}

