import React from 'react';
import { AuthProvider } from './context/AuthContext';
import AppRoute from "./route/appRoute.jsx";
import "./App.scss";

export default function App() {
  return (
    <AuthProvider>
      <div id="App">
        <AppRoute />
      </div>
    </AuthProvider>
  );
}

