import React from 'react';
import "./Chatbox.scss";

const questions = [
  "What is your return policy?",
  "How do I track my order?",
  "Can I purchase items again?",
  // Add more questions as needed
];

export default function Chatbox() {
  return (
    <div className="chatbox">
      <h2>Chatbox</h2>
      <ul>
        {questions.map((question, index) => (
          <li key={index}>{question}</li>
        ))}
      </ul>
    </div>
  );
}
