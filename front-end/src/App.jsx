import React, { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom"; // Import Router
import AppRoute from "./route/appRoute.jsx";
import "./App.scss";
import Chatbot from "./components/Chatbot.jsx";
import { LoadingProvider, useLoading } from "./utils/LoadingContext";
import LoadingSpinner from "./components/LoadingSpinner";
import { setupInterceptors } from "./api/apiClient";
import { AuthProvider } from "./utils/AuthContext"; // Import AuthProvider

function AppContent() {
  const { setLoading } = useLoading();

  useEffect(() => {
    // Setup interceptors with setLoading
    setupInterceptors(setLoading);
  }, [setLoading]);

  return (
    <div id="App">
      <AppRoute />
      <Chatbot />
      <LoadingSpinner />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider> {/* Wrap the application with AuthProvider */}
      <LoadingProvider>
        <Router>
          <AppContent />
        </Router>
      </LoadingProvider>
    </AuthProvider>
  );
}

