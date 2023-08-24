import React from 'react';
import { useState, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({ isOpen, onClose, onAddPlace, isLoading }) {

  const [name, setName] = React.useState("");
  const [link, setLink] = React.useState("");

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeLink(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({ name, link })
  }

  React.useEffect(() => {
    setName('');
    setLink('');
  }, [isOpen]);


  return (
    <PopupWithForm
      name={"cardadd"}
      title={"Новое место"}
      isOpen={isOpen}
      onClose={onClose}
      buttonName={isLoading ? "Сохранение..." : "Создать"}
      onSubmit={handleSubmit}
    >


      <input className="popup__text popup__text_card-name"
        type="text"
        placeholder="Название"
        name="name"
        id="addNamePlace"
        required
        autoComplete="off"
        minLength="2"
        maxLength="30"
        onChange={handleChangeName}
        value={name || ''}
      />

      <span className=" addNamePlace-error"></span>
      <input className="popup__text popup__text_card-link"
        type="url"
        placeholder="Ссылка на картинку"
        name="link"
        id="Link"
        required
        autoComplete="off"
        onChange={handleChangeLink}
        value={link || ''}
      />
      <span className="Link-error"></span>

    </PopupWithForm>
  );
}

export default AddPlacePopup;