import React, { useRef, useEffect } from 'react';
import PopupWithForm from "./PopupWithForm";


function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {

  const avatarRef = useRef('');

  useEffect(() => {
    avatarRef.current.value = '';
  }, [isOpen])

  function handleSubmit(event) {
    event.preventDefault();

    onUpdateAvatar({
      avatar: avatarRef.current.value
    });
  }

  return(
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      title="Обновить аватар"
      name="avatar-edit"
      buttonName="Сохранить"
      onSubmit={handleSubmit}
    >
      <input
        className="popup__input"
        type="url"
        name="link"
        required
        placeholder="Ссылка на фотографию"
        ref={avatarRef}
      />
      <span
        id="name-input-error"
        className="popup__field-error popup__name-error"
      >
          </span>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;
