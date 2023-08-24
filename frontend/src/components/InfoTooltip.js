import React from 'react';
import fail from '../images/fail.svg';
import success from '../images/success.svg';


const InfoTooltip = ({ isOpen, onClose, isEntry, userMessage, alt }) => {

  return (
    <div className={`popup ${isOpen && "popup_open"}`}>
      <div className="popup__container">
        <img className="popup__icon"
          src={isEntry ? success : fail}
          alt={alt} />
        <p className="popup__text_signup">{userMessage}</p>
        <button
          className="popup__close-button"
          type="button"
          aria-label="Закрыть"
          onClick={onClose}
        />
      </div>
    </div>
  );
};

export default InfoTooltip;