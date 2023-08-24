import React from 'react';
import { useState, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, isLoading }) {
    const avatar = React.useRef(null);

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateAvatar(avatar.current.value);
    }

    React.useEffect(() => {
        avatar.current.value = "";
    }, [isOpen]);

    return (
        <PopupWithForm
            name={"avatar"}
            title="Обновить аватар"
            buttonName={isLoading ? "Сохранение..." : "Создать"}
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <input className="popup__text popup__text_avatar-link"
                type="url"
                placeholder="Ссылка на картинку"
                name="link"
                id="AvatarLink"
                required
                autoComplete="off"
                ref={avatar} />
            <span className="AvatarLink-error"></span>
        </PopupWithForm>
    );
}

export default EditAvatarPopup;


