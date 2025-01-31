import React from "react";

const Card = ({ image, text, buttonText, onClick }) => {
  return (
    <div className="card">
      <img src={image} alt={text} className="card-image" />
      <div className="card-content">
        <p>{text}</p>
        <button onClick={onClick}>{buttonText}</button>
      </div>
    </div>
  );
};

export default Card;
