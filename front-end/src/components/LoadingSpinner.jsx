import React from "react";
import { useLoading } from "../utils/LoadingContext";
import "./LoadingSpinner.scss"; // Add styles for the spinner

const LoadingSpinner = () => {
  const { loading } = useLoading();

  if (!loading) return null;

  return (
    <div className="loading-spinner">
      <div className="spinner"></div>
    </div>
  );
};

export default LoadingSpinner;
