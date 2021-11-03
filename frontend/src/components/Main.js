import React, {useContext} from 'react';
import Card from './Card';
import CurrentUserContext from "../contexts/CurrentUserContext";
import Header from "./Header";

function Main({
                loggedIn,
                isEditAvatarPopupOpen,
                isEditProfilePopupOpen,
                isAddPlacePopupOpen,
                onCardClick,
                cards,
                onCardLike,
                onCardDelete,
                logout,
                userLoginData
              }) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <>
      <Header loggedIn={loggedIn}
              login={userLoginData}
              link="/sign-in"
              onClick={logout}
              headerText={'Выйти'}
      />
      <main className="content">
        <section className="profile">
          <div className="profile__box">
            <div className="profile__box-pic" onClick={isEditAvatarPopupOpen}>
              <img className="profile__avatar" src={`${currentUser.avatar}`} alt="Аватар профиля"></img>
              <button className="profile__change-btn" type="button"
                      aria-label="Изменить аватар пользователя"></button>
            </div>
            <div className="profile__info">
              <div className="profile__box-title">
                <h1 className="profile__name">{currentUser.name}</h1>
                <button type="button" className="profile__edit" id="ButtonEdit"
                        aria-label="Кнопка редактировать" onClick={isEditProfilePopupOpen}></button>
              </div>
              <p className="profile__profession">{currentUser.about}</p>
            </div>
          </div>
          <button type="button" className="profile__add" id="ButtonAdd" aria-label="Кнопка добавить"
                  onClick={isAddPlacePopupOpen}></button>
        </section>

        <section className="elements">
          {
            cards.map(card => (
              <Card
                card={card}
                key={card._id}
                onCardClick={onCardClick}
                onCardLike={onCardLike}
                onCardDelete={onCardDelete}
              />
            ))
          }
        </section>
      </main>
    </>
  );
}

export default Main;
