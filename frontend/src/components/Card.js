import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';


function Card({ card, onCardClick, onCardLike, onCardDelete, openConfirmPopup }) {
  const { name, link, likes, owner } = card;
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = owner._id === currentUser._id;
  const isLiked = likes.some((i) => i._id === currentUser._id);

  const cardLikeButtonClassName = `element__like-button ${isLiked && "element__like-button_active"
    }`;


  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  };

//кнопка удалить для открытия попап удаления и передачи карточки
  function handleOpenPopup() {
    openConfirmPopup(true);
    onCardDelete(card)
  };


  return (
    <li className="element">
      {isOwn && (
        <button
          type="button"
          className="element__delete-button"
          aria-label="Удалить"
          onClick={handleOpenPopup}>
        </button>)}
      <img
        className="element__image"
        src={link}
        alt={name}
        onClick={handleClick}
      />
      <div className="element__about">
        <h2 className="element__text">{name}</h2>
        <div className="elements__like-section">
          <button
            className={cardLikeButtonClassName}
            type="button"
            aria-label="Лайк"
            onClick={handleLikeClick}>

          </button>
          <span className="element__like-meter">{likes.length}</span>
        </div>

      </div>
    </li>
  )
}

export default Card;