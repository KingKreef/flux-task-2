import React from "react";
import "./SuccessMessage.css";

export const SuccessMessage = ({ reset }: any) => {
  return (
    <div className="success-message">
      <div className="success-content">
        <h2>Booking Successful!</h2>
        <p>Your travel booking has been confirmed.</p>
        <div style={{ padding: "10px" }}>
          <button onClick={reset}>Back to form</button>
        </div>
      </div>
    </div>
  );
};
