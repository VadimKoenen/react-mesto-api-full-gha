import React, { useState } from 'react';

function EntryForm({ title, buttonName, onSubmit, isLoading }) {
  const [userData, setUserData] = React.useState({ email: "", password: "" });

  
  function handleChange(e) {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  }

 
  const handleLogin = (e) => {
    e.preventDefault();
    onSubmit(userData);
  };

  return (

    <form
      className="entry-form"
      onSubmit={handleLogin}
    >
      <h2 className="entry-form__heading">{title}</h2>
      <div>
        <input
          type="text"
          name="email"
          className="entry-form__input"
          placeholder="Email"
          required
          minLength="2"
          maxLength="40"
          id="form__email-input"
          onChange={(e) => handleChange(e)}
        />
        <span className="entry-form__error"></span>

        <input
          type="password"
          name="password"
          className="entry-form__input"
          placeholder="Пароль"
          required
          minLength="2"
          maxLength="200"
          id="form__password-input"
          onChange={(e) => handleChange(e)}
        />
        <span className="entry-form__error"></span>

      </div>
      <div>
        <button
          className="entry-form__button"
          type="submit"
          aria-label="Register"
        >
          {isLoading ? buttonName + "..." : buttonName}
        </button>
      </div>
    </form>

  );
}

export default EntryForm;