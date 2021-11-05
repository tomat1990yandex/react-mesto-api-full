import React, { useContext } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {

  const currentUser = useContext(CurrentUserContext);

  const isOwn = card.owner === currentUser._id;

  const cardDeleteButtonClassName = (
    `element__delete ${isOwn ? 'element__delete_visible' : ''}`
  );

  const isLiked = card.likes.some(i => i === currentUser._id);

  const cardLikeButtonClassName = (
    `element__like ${isLiked ? 'element__like_active' : ''}`
  );

  function handleCardClick() {
    onCardClick(card)
  }

  function handleCardLike() {
    onCardLike(card)
  }

  function handleDeleteCard() {
    onCardDelete(card)
  }

  return (
    <div className="element">
      <button type="button" className={cardDeleteButtonClassName} onClick={handleDeleteCard} aria-label="Кнопка удаления карточки"></button>
      <img className="element__image" src={card.link} alt={card.name} onClick={handleCardClick}/>
      <div className="element__group">
        <h2 className="element__title">{card.name}</h2>
        <div className="element__group_like">
          <button type="button" className={cardLikeButtonClassName} onClick={handleCardLike} aria-label="Кнопка мне нравится"></button>
          <span className="element__like-num">{card.likes.length}</span>
        </div>
      </div>
    </div>
  )
}


export default Card;
