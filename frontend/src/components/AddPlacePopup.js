import React, { useState, useEffect } from 'react';
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const [cardTitle, setCardTitle] = useState('');
  const [cardLink, setCardLink] = useState('');

  function handleCardTitle(event) {
    setCardTitle(event.target.value)
  }

  function handleCardLink(event) {
    setCardLink(event.target.value)
  }

  function handleSubmit(event) {
    event.preventDefault();

    onAddPlace({
      name: cardTitle,
      link: cardLink
    })
  }

  useEffect(() => {
    setCardLink('')
    setCardTitle('')
  }, [isOpen])

  return(
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      title="Новое место"
      name="add-place"
      buttonName="Создать"
      onSubmit={handleSubmit}
    >
      <input
        required
        name="name"
        type="text"
        className="popup__input"
        placeholder="Название"
        minLength="2"
        maxLength="30"
        onChange={handleCardTitle}
        value={cardTitle ? cardTitle : ''}
      />
      <span
        id="card-name-input-error"
        className="popup__field-error popup__name-add-error">
          </span>
      <input
        required
        name="link"
        type="url"
        className="popup__input"
        placeholder="Ссылка на картинку"
        onChange={handleCardLink}
        value={cardLink ? cardLink : ''}
      />
      <span
        id="card-link-input-error"
        className="popup__field-error popup__link-add-error">
          </span>
    </PopupWithForm>
  )
}

export default AddPlacePopup;
