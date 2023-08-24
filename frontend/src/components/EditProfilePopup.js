import React from 'react';
import { useState, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup({ isOpen, onClose, onUpdateUser, isLoading }) {
    const [name, setName] = React.useState("");
    const [description, setDescription] = React.useState("");

    const currentUser = React.useContext(CurrentUserContext);

    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, isOpen]);

    function handleChangeName(e) {
        setName(e.target.value);
    }

    function handleChangeDescription(e) {
        setDescription(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateUser({
            name: name,
            about: description,
        });
    }

    return (
        <PopupWithForm
            name={"profile"}
            title={"Редактировать профиль"}
            isOpen={isOpen}
            onClose={onClose}
            buttonName={isLoading ? "Сохранение..." : "Сохранить"}
            onSubmit={handleSubmit}
        >
            <input className="popup__text popup__text_profile-name"
                type="text"
                id="addName"
                placeholder="Введите имя"
                name="name"
                required
                autoComplete="off"
                minLength="2"
                maxLength="40"
                onChange={handleChangeName}
                value={name || ''}
            />
            <span className="addName-error"></span>
            <input className="popup__text popup__text_profile-about"
                type="text"
                id="addDescription"
                placeholder="Введите описание"
                required name="about"
                autoComplete="off"
                minLength="2"
                maxLength="200"
                onChange={handleChangeDescription}
                value={description || ''}
            />
            <span className="addDescription-error"></span>
        </PopupWithForm>
    );
}

export default EditProfilePopup;



