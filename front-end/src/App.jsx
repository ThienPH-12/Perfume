import React from 'react';
import AppRoute from "./route/appRoute.jsx";
import "./App.scss";

// Import Chatbox component
import Chatbot from "./components/Chatbot.jsx";
// Removed import of Chatbox.scss

export default function App() {
 
  return (
      <div id="App">
        <AppRoute />
       <Chatbot />
      </div>
  );
}

