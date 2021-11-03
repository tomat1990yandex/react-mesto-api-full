import React, { useState, useContext, useEffect } from 'react';
import PopupWithForm from "./PopupWithForm";
import CurrentUserContext from "../contexts/CurrentUserContext";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {

  const currentUser = useContext(CurrentUserContext);


  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen])

  function handleUserName(event) {
    setName(event.target.value)
  }

  function handleUserDescription(event) {
    setDescription(event.target.value)
  }

  function handleSubmit(event) {
    event.preventDefault();

    onUpdateUser({
      name: name,
      about: description
    });
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      name="edit"
      title="Редактировать профиль"
      buttonName="Сохранить"
      onSubmit={handleSubmit}
    >
      <input
        required
        name="name"
        type="text"
        className="popup__input"
        placeholder="Имя"
        onChange={handleUserName}
        minLength="2"
        maxLength="40"
        value={name ? name : ''}
      />
      <span
        id="name-input-error"
        className="popup__field-error popup__name-error">
          </span>
      <input
        required
        name="about"
        type="text"
        className="popup__input"
        placeholder="О себе"
        onChange={handleUserDescription}
        minLength="2"
        maxLength="200"
        value={description ? description : ''}
      />
      <span
        id="profession-input-error"
        className="popup__field-error popup__profession-error">
          </span>

    </PopupWithForm>
  )
}

export default EditProfilePopup;
