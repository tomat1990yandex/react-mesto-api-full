import React from "react";

function ImagePopup({card, onClose}) {
  return (
    <div className={`popup ${card && "popup_opened"}`}>
      <div className="popup__image-container">
        <button className="popup__close" onClick={onClose}></button>
        <img src={card ? card.link : ""} alt={card ? card.name : ""} className="popup__image"/>
        <h3 className="popup__image-title">{card ? card.name : ""}</h3>
      </div>
    </div>
  );
}

export default ImagePopup;
