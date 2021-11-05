import React, {useEffect, useState, useCallback} from "react";
import { Route, Switch, useHistory, withRouter } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import CurrentUserContext from "../contexts/CurrentUserContext";
import { register, login, getData } from '../utils/auth';
import api from "../utils/Api";

import "../index.css";
import Login from './Login';
import Register from './Register';
import InfoTooltip from './InfoTooltip';
import Footer from "./Footer";
import Main from "./Main";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import Error from "./Error";

function App() {

  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [isTooltipOpened, setIsTooltipOpened] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const [cards, setCards] = useState([]);
  const [isEditAvatarPopupOpen, setIsAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [userLoginData, setUserLoginData] = useState('');
  const history = useHistory();

  useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (!token) {
      return;
    }
    api.setToken(token)
    api.getInitialData()
      .then(([user, cards]) => {
        setCurrentUser(user);
        setCards(cards.cards.reverse());
      })
      .catch((err) => console.log(err));
  }, [loggedIn])

  function handleCardClick(props) {
    setSelectedCard(props);
    window.addEventListener('keydown', handleClosePopupWithEsc);
  }

  const handleClosePopupWithEsc = useCallback((event) => {
    if (event.keyCode === 27) {
      closeAllPopups();
    }
  }, [])

  function setEscapeListener() {
    window.addEventListener('keydown', handleClosePopupWithEsc);
  }

  function openRegModal() {
    setIsTooltipOpened(!isTooltipOpened);
  }

  function closeRegModal() {
    setIsTooltipOpened(false);
    if (isAuth) {
      history.push('/sign-in')
    }
  }

  function handleUpdateUser(user) {
    api.editProfile(user.name, user.about)
      .then(res => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch(err => console.log(err))
  }

  function handleUpdateAvatar(user) {
    api.uploadAvatar(user.avatar)
      .then(res => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch(err => console.log(err))
  }

  function handleEditAvatarClick() {
    setIsAvatarPopupOpen(true);
    setEscapeListener();
  }

  function handleEditProfileClick() {
    setIsProfilePopupOpen(true);
    setEscapeListener();
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
    setEscapeListener();
  }

  function closeAllPopups() {
    setIsAddPlacePopupOpen(false);
    setIsAvatarPopupOpen(false);
    setIsProfilePopupOpen(false);
    setSelectedCard(null);
  }

  const handleRegister = (data) => {
    const { email, password } = data;
    return register(email, password)
      .then((res) => {
        if (res.data) {
          setIsAuth(true);
          openRegModal();
          history.push('/sign-in');
        }
      })
      .catch((err) => {
        setIsAuth(false);
        openRegModal();
        console.log(`Произошла ошибка: ${err}`);
        history.push('/sign-up');
      });
  };

  const handleLogin = (data) => {
    const { email, password } = data;
    setUserLoginData(email);
    login(email, password)
      .then((res) => {
        if (res.token) {
          localStorage.setItem('jwt', res.token);
          setLoggedIn(true);
          setIsAuth(true);
          history.push('/');
        }
      })
      .catch((err) => {
        setIsAuth(false);
        setIsTooltipOpened(true);
        console.log(`Произошла ошибка: ${err}`);
      });
  };

  useEffect(() => {
    if (localStorage.getItem('jwt')) {
      const jwt = localStorage.getItem('jwt');

      getData(jwt)
        .then((res) => {
          if(res) {
            setLoggedIn(true);
            setUserLoginData(res.data.email);
          }
        })
        .catch((err) => {
          setIsTooltipOpened(true);
          console.log(`Произошла ошибка: ${err}`);
        });
    }
  }, [history, loggedIn]);

  useEffect(() => {
    if(loggedIn) {
      history.push('/');
    }
  }, [history, loggedIn]);

  const handleLogout = () => {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
    setIsAuth(false);
    history.push('/sign-in');
  };

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
      const newCards = cards.map((c) => c._id === card._id ? newCard : c);
      setCards(newCards);
    })
      .catch(err => console.log(err));
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        setCards(cards.filter(item => item._id !== card._id));
      })
      .catch(err => console.log(err));
  }

  function handleAddPlace(card) {
    api.addNewCard(card.name, card.link)
      .then(res => {
        setCards([res, ...cards]);
        closeAllPopups();
      })
      .catch(err => console.log(err))
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">

        <Switch>
          <ProtectedRoute
            exact path="/"
            loggedIn={loggedIn}
            component={Main}
            isEditAvatarPopupOpen={handleEditAvatarClick}
            isEditProfilePopupOpen={handleEditProfileClick}
            isAddPlacePopupOpen={handleAddPlaceClick}
            onCardClick={handleCardClick}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
            logout={handleLogout}
            userLoginData={userLoginData}
        />
          <Route path="/sign-in">
            <Login handleLogin={handleLogin} />
          </Route>
          <Route path="/sign-up">
            <Register handleRegister={handleRegister} />
          </Route>
          <Route path="*">
            <Error />
          </Route>
        </Switch>

        <Footer/>

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          onClick={(e) => e.stopPropagation()}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlace}
        />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <PopupWithForm
          onClose={closeAllPopups}
          name="confirm"
          title="Вы уверены?"
          buttonName="Да"
        >
        </PopupWithForm>

        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
        />
        <InfoTooltip
          isOpen={isTooltipOpened}
          onClose={closeRegModal}
          isRegSuccess={isAuth}
          regSuccess="Вы успешно зарегистрировались!"
          regFailed="Что-то пошло не так! Попробуйте ещё раз."
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default withRouter(App);
