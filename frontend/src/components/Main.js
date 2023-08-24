import React from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main({
    onEditProfile,
    onAddPlace,
    onEditAvatar,
    onCardClick,
    cards,
    onCardLike,
    onCardDelete,
    openConfirmPopup
}) {

    const currentUser = React.useContext(CurrentUserContext);

    return (
        <main className="content">
            <section className="profile">
                <div className="profile__content">
                    <button className="profile__overlay" onClick={onEditAvatar}>
                        <img className="profile__avatar" src={currentUser.avatar} alt="аватар профиля" />
                    </button>
                    <div className="profile__info">
                        <div className="profile__name-edit">
                            <h1 className="profile__name">{currentUser.name}</h1>
                            <button
                                className="profile__edit-button"
                                onClick={onEditProfile}
                                type="button"
                                aria-label="Редактировать профиль">
                            </button>
                        </div>
                        <p className="profile__description">{currentUser.about}</p>
                    </div>
                </div>
                <button
                    className="profile__add-button"
                    onClick={onAddPlace}
                    type="button"
                    aria-label="Добавить карточку">
                </button>
            </section>

            <div className="elements">
                <ul className="elements__list">
                    {cards.map((card) => (
                        <Card
                            key={card._id}
                            card={card}
                            onCardClick={onCardClick}
                            onCardLike={onCardLike}
                            onCardDelete={onCardDelete}
                            openConfirmPopup={openConfirmPopup}
                        />
                    ))}
                </ul>
            </div>
        </main>
    )
}

export default Main;