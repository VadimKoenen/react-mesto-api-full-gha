import React from 'react';
import '../App.css';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { ProtectedRoute } from './ProtectedRoute';
import { Route, Routes, Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer.js';
import Main from './Main.js';
import Header from './Header.js';
import ImagePopup from './ImagePopup.js';
import EditProfilePopup from './EditProfilePopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import ConfirmPopup from './ConfirmPopup.js';
import api from '../utils/Api.js'
import Login from './Login';
import Register from './Register';
import InfoTooltip from './InfoTooltip';
import * as auth from '../utils/auth';

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false)
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false)
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false)
  const [isConfirmPopupOpen, setConfirmPopupOpen] = React.useState(false)

  const [selectedCard, setSelectedCard] = React.useState({})
  const [removedCard, setRemovedCard] = React.useState({})
  const [isLoading, setLoading] = React.useState(false);

  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);


  /// стейты логина и.д.

  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [userEmail, setUserEmail] = React.useState("");
  const [openInfoTooltip, setOpenInfoTooltip] = React.useState(false);
  const [isEntry, setIsEntry] = React.useState(false);
  const [userMessage, setUserMessage] = React.useState("");
  const navigate = useNavigate();


// инициализация мэйн
  React.useEffect(() => {
    if (isLoggedIn) {
      api
        .getUserData()
        .then(res => {
          setCurrentUser(res)
        })
      api
        .getInitialCards()
        .then(cardsData => {
          setCards(cardsData);
        })
        .catch(console.error)
    }
  }, [isLoggedIn]);



  React.useEffect(() => {
    if (localStorage.getItem("jwt")) {
      auth
        .checkToken()
        .then((res) => {
          setIsLoggedIn(true);
          navigate("/", { replace: true });
          setUserEmail(res.data.email);
        })
        .catch(console.error);
    }
  }, []);



  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true)
  }

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true)
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true)
  }

  function handleCardClick(card) {
    setSelectedCard(card)
  }

  function closeAllPopups() {
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setConfirmPopupOpen(false);
    setOpenInfoTooltip(false);
    setSelectedCard({});
    setRemovedCard({});
  }

  //Функции лайка из брифа
  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api
      .changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => c._id === card._id ? newCard : c))
      })
      .catch(console.error)
  }

  //Функции удаления карточки из брифа
  function handleCardDelete(card) {
    setLoading(true);
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) =>
          state.filter((c) => c._id !== card._id)
        );
      })
      .catch(console.error)
      .finally(() => {
        setLoading(false);
        closeAllPopups();
      });
  }

  function handleUpdateUser(data) {
    setLoading(true)
    api
      .setUser(data)
      .then((res) => {
        setCurrentUser(res);
      })
      .catch(console.error)
      .finally(() => {
        setLoading(false);
        closeAllPopups()
      });
  }

  function handleUpdateAvatar(link) {
    setLoading(true)
    api
      .changeAvatar(link)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch(console.error)
      .finally(() => {
        setLoading(false);
        closeAllPopups();
      })
  }

  function handleAddPlaceSubmit(data) {
    setLoading(true)
    api
      .addNewCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
      })
      .catch(console.error)
      .finally(() => {
        setLoading(false);
        closeAllPopups();
      })

  }


  /// функции логина, регистрации, выхода и .т.

  function handleSignUp({ email, password }) {
    setLoading(true);
    auth
      .register({ email, password })
      .then((res) => {
        navigate("/sign-in", { replace: true });
        setIsEntry(true);
        setUserMessage("Вы успешно зарегистрировались!");
      })
      .catch((err) => {
        console.error(err);
        setIsEntry(false);
        setUserMessage("Что-то пошло не так! Попробуйте ещё раз.");
      })
      .finally(() => {
        setOpenInfoTooltip(true);
        setLoading(false);
      });
  }

  function handleLogin({ email, password }) {
    setLoading(true);
    auth
      .login({ email, password })
      .then((res) => {
        setUserEmail(email);
        setIsLoggedIn(true);
        navigate("/", { replace: true });
        localStorage.setItem("jwt", res.token);
      })
      .catch((err) => {
        console.error(err);;
        setIsEntry(false);
        setUserMessage("Что-то пошло не так! Попробуйте ещё раз.");
        setOpenInfoTooltip(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function deleteToken() {
    localStorage.removeItem("jwt");
    setUserEmail("");
    setIsLoggedIn(false);
    navigate("/sign-in", { replace: true });
  }

  ///

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="body">
        <div className="page">
          <Header
            isLoggedIn={isLoggedIn}
            deleteToken={deleteToken}
            userEmail={userEmail}
          />
          <Routes>

            <Route
              path="*"
              element={
                isLoggedIn ? (
                  <Navigate to="/" />
                ) : (
                  <Navigate to="/sign-up" />
                )
              }
            />
            <Route
              path="/sign-up"
              element={
                <Register
                  onSubmit={handleSignUp}
                  title={"Регистрация"}
                  buttonName={"Зарегистрироваться"}
                  onclose={closeAllPopups}
                  isLoading={isLoading}
                />
              }
            />
            <Route
              path="/sign-in"
              element={
                <Login
                  onSubmit={handleLogin}
                  title={"Вход"}
                  buttonName={"Войти"}
                  isLoading={isLoading}
                />
              }
            />
            <Route
              path="/"
              element={
                <ProtectedRoute
                element={Main}
                  isLoggedIn={isLoggedIn}
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onEditAvatar={handleEditAvatarClick}
                  onCardClick={handleCardClick}
                  cards={cards}
                  onCardLike={handleCardLike}
                  onCardDelete={setRemovedCard}
                  openConfirmPopup={setConfirmPopupOpen}
                />
              }
            />

          </Routes>
          <EditAvatarPopup //редактирование аватара
            onClose={closeAllPopups}
            isOpen={isEditAvatarPopupOpen}
            onUpdateAvatar={handleUpdateAvatar}
            isLoading={isLoading}
          >
          </EditAvatarPopup>

          <EditProfilePopup //редактирование профиля
            onClose={closeAllPopups}
            isOpen={isEditProfilePopupOpen}
            onUpdateUser={handleUpdateUser}
            isLoading={isLoading}
          >
          </EditProfilePopup>

          <AddPlacePopup //добавление карточки
            onClose={closeAllPopups}
            isOpen={isAddPlacePopupOpen}
            onAddPlace={handleAddPlaceSubmit}
            isLoading={isLoading}
          >
          </AddPlacePopup>

          <ConfirmPopup //попап конфирм           
            onCardDelete={handleCardDelete}
            isOpen={isConfirmPopupOpen}
            onClose={closeAllPopups}
            isLoading={isLoading}
            card={removedCard}
          >
          </ConfirmPopup>

          <ImagePopup //попап картинки
            card={selectedCard}
            onClose={closeAllPopups}
          />

          <InfoTooltip //попап ошибки при регистрации/входе
            isOpen={openInfoTooltip}
            onClose={closeAllPopups}
            isEntry={isEntry}
            userMessage={userMessage}
          />

          <Footer />
        </div>

      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
